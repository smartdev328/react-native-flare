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

    roundTimestamp(date) {
        return moment(Math.ceil((+date) / (+this.durationInMinutes)) * (+this.durationInMinutes)).unix();
    }

    hasAlreadyHandled(beacon) {
        const {
            type,
            deviceID,
            timestamp,
            nonce,
        } = beacon;
        const roundedTimestamp = this.roundTimestamp(timestamp);
        const handled = this.beaconCache[type] &&
            this.beaconCache[type][deviceID] &&
            this.beaconCache[type][deviceID][roundedTimestamp] &&
            this.beaconCache[type][deviceID][roundedTimestamp][nonce];

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
        const roundedTimestamp = this.roundTimestamp(timestamp);

        if (!this.beaconCache[type]) {
            this.beaconCache[type] = {};
        }

        if (!this.beaconCache[type][deviceID]) {
            this.beaconCache[type][deviceID] = {};
        }

        if (!this.beaconCache[type][deviceID][roundedTimestamp]) {
            this.beaconCache[type][deviceID][roundedTimestamp] = {};
        }

        this.beaconCache[type][deviceID][roundedTimestamp][nonce] = 1;
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
