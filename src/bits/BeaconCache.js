import moment from 'moment';
import {
    BEACON_CACHE_MAX_AGE_IN_MINS,
    BEACON_CACHE_PRUNE_INTERVAL_IN_MS,
    BLUETOOTH_BEACON_LOGGING,
    DEVICE_ADDITION_THREE_PRESS_MAX_TIME,
    UNIQUE_BEACON_TIMING_IN_MS,
} from '../constants/Config';
import { BeaconTypes } from './BleConstants';

export default class BeaconCache {
    constructor() {
        this.beaconCache = {
            Short: {},
            Long: {},
            Checkin: {},
        };

        this.maxAgeInMinutes = BEACON_CACHE_MAX_AGE_IN_MINS;
        this.pruneFrequencyInMilliseconds = BEACON_CACHE_PRUNE_INTERVAL_IN_MS;
        this.backgroundTimer = setInterval(() => {
            this.prune();
        }, this.pruneFrequencyInMilliseconds);
    }

    shutdown() {
        clearInterval(this.backgroundTimer);
    }

    static getRoundedTimestamp(timestamp) {
        const accuracy = 30000;
        const rounded = accuracy * Math.round(timestamp / accuracy);
        const roundedTimestamp = new Date(rounded);
        return roundedTimestamp;
    }

    hasAlreadyHandled(beacon) {
        const { type, deviceID, timestamp, uuid } = beacon;

        let handled = false;
        const lastTimestampForUUID =
            this.beaconCache[type] &&
            this.beaconCache[type][deviceID] &&
            this.beaconCache[type][deviceID][uuid];

        const roundedTimestamp = BeaconCache.getRoundedTimestamp(timestamp);

        // Putting nonce under the deviceID lets us compare timestamps across hour/day boundaries.
        // We consider beacons to be the same if they have the same nonce and were received within
        // UNIQUE_BEACON_TIMING_IN_MS milliseconds of each other.
        if (lastTimestampForUUID) {
            const diff = Math.abs(moment(lastTimestampForUUID).diff(roundedTimestamp));
            handled = diff < UNIQUE_BEACON_TIMING_IN_MS;
        }

        if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
            const short = uuid.substr(0, 8);
            console.debug(`Handled ${type}/${deviceID}/${short}/${handled}`);
        }

        return handled;
    }

    markAsHandled(beacon) {
        const { type, deviceID, timestamp, uuid } = beacon;

        if (!this.beaconCache[type]) {
            this.beaconCache[type] = {};
        }

        if (!this.beaconCache[type][deviceID]) {
            this.beaconCache[type][deviceID] = {};
        }

        if (!this.beaconCache[type][deviceID][uuid]) {
            this.beaconCache[type][deviceID][uuid] = null;
        }

        const roundedTimestamp = BeaconCache.getRoundedTimestamp(timestamp);
        this.beaconCache[type][deviceID][uuid] = roundedTimestamp;
    }

    prune() {
        const maxAge = moment()
            .subtract(this.maxAgeInMinutes, 'minutes')
            .toDate();
        const maxAgeTime = maxAge.getTime();
        console.debug('<< Pruning cache >>');
        const totals = {
            types: 0,
            devices: 0,
            uuids: 0,
            kept: 0,
        };
        Object.keys(this.beaconCache).forEach(beaconType => {
            if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
                totals.types += 1;
            }
            Object.keys(this.beaconCache[beaconType]).forEach(deviceID => {
                if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
                    totals.types += 1;
                }
                const toKeep = {};
                Object.keys(this.beaconCache[beaconType][deviceID]).forEach(uuid => {
                    if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
                        totals.uuids += 1;
                    }
                    const beaconDate = this.beaconCache[beaconType][deviceID][uuid];
                    const timestamp = beaconDate.getTime();
                    if (maxAgeTime < timestamp) {
                        toKeep[uuid] = beaconDate;
                        if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
                            totals.kept += 1;
                        }
                    }
                });
                this.beaconCache[beaconType][deviceID] = toKeep;
            });
        });
        if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
            console.debug(`Pruning stats: ${JSON.stringify(totals)}`);
        }
    }

    /**
     * Determine the number of recent short presses per device. Return an array of those press counts per device, sorted
     * by descending number of presses.
     */
    getRecentShortPressCounts() {
        const oldestTimeToConsider = new Date().getTime() - DEVICE_ADDITION_THREE_PRESS_MAX_TIME;
        const relevantCounts = Object.keys(this.beaconCache[BeaconTypes.Short.name])
            .map(deviceID => {
                const beacons = Object.keys(this.beaconCache[BeaconTypes.Short.name][deviceID]).filter(
                    uuid =>
                        this.beaconCache[BeaconTypes.Short.name][deviceID][uuid].getTime() >=
                        oldestTimeToConsider,
                );
                return {
                    deviceID: parseInt(deviceID, 10),
                    count: beacons.length,
                };
            })
            .sort((a, b) => {
                if (a.count < b.count) {
                    return -1;
                } if (a.count > b.count) {
                    return 1;
                }
                return 0;
            });
        return relevantCounts;
    }
}
