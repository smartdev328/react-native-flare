import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';

export default class BeaconCache {
    constructor() {
        this.beaconCache = {
            Short: {},
            Long: {},
            Checkin: {},
        };

        this.durationInMinutes = 30;
        this.pruneFrequencyInMilliseconds = 300000; // 5000ms/min * 60 s/min;
        this.backgroundTimer = BackgroundTimer.setInterval(() => {
            this.prune();
        }, this.pruneFrequencyInMilliseconds);
    }

    hasAlreadyHandled(beacon) {
        const {
            type,
            deviceID,
            timestamp,
            nonce,
        } = beacon;

        let handled = false;
        const lastTimestampForNonce = this.beaconCache[type] &&
            this.beaconCache[type][deviceID] &&
            this.beaconCache[type][deviceID][nonce];

        // Putting nonce under the deviceID lets us compare timestamps across hour/day boundaries.
        // We consider beacons to be the same if they have the same nonce and were received within
        // 30 seconds of each other.
        if (lastTimestampForNonce) {
            handled = moment(lastTimestampForNonce).diff(timestamp) < 20000;
        }

        console.debug(`Beacon was handled ${beacon}? ${handled}`);
        return handled;
    }

    markAsHandled(beacon) {
        const {
            type,
            deviceID,
            timestamp,
            nonce,
        } = beacon;
        console.debug(`Marking as handled ${beacon}`);

        if (!this.beaconCache[type]) {
            this.beaconCache[type] = {};
        }

        if (!this.beaconCache[type][deviceID]) {
            this.beaconCache[type][deviceID] = {};
        }

        if (!this.beaconCache[type][deviceID][nonce]) {
            this.beaconCache[type][deviceID][nonce] = null;
        }

        this.beaconCache[type][deviceID][nonce] = timestamp;
    }

    prune() {
        const maxAge = moment().subtract(this.durationInMinutes + 5, 'minutes').unix();
        Object.keys(this.beaconCache).forEach((beaconType) => {
            Object.keys(this.beaconCache[beaconType]).forEach((deviceID) => {
                const pruned =
                    Object.keys(this.beaconCache[beaconType][deviceID])
                        .filter(key => key > maxAge);
                this.beaconCache[beaconType][deviceID] = pruned;
            });
        });

    }

}
