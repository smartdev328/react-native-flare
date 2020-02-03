import { Platform } from 'react-native';
import Beacons from '@x-guard/react-native-beacons-manager';
import moment from 'moment';

import { BLUETOOTH_BEACON_LOGGING } from '../constants/Config';
import { Regions } from './BleConstants';
import BeaconCache from './BeaconCache';
import BleUtils from './BleUtils';
import getLatestPosition from '../helpers/location';

export default class BleManager {
    constructor(options) {
        this.listening = false;
        this.beaconCache = null;
        this.onBeacon = options.onBeacon;
        this.onCounts = options.onCounts;
    }

    shutdown() {
        Regions.forEach(region => Beacons.stopMonitoringForRegion(region));
        Beacons.stopUpdatingLocation();

        Beacons.BeaconsEventEmitter.removeListener(
            'beaconsDidRange',
            this.processBeaconInRange
        );

        Beacons.BeaconsEventEmitter.removeListener(
            'regionDidEnter',
            this.regionDidEnter
        );

        Beacons.BeaconsEventEmitter.removeListener(
            'regionDidExit',
            this.regionDidExit
        );

        this.beaconCache.shutdown();
        delete this.beaconCache;
        this.beaconCache = null;
        this.listening = false;
    }

    isListening() {
        return this.listening;
    }

    regionDidEnter = region => {
        console.debug('regionDidEnter', region);
        Beacons.startRangingBeaconsInRegion(region);
    };

    regionDidExit = region => {
        Beacons.stopRangingBeaconsInRegion(region);
    };

    processBeaconInRange = data => {
        if (!this.beaconCache) {
            this.beaconCache = new BeaconCache();
        }

        data.beacons.forEach(beacon => {
            const parsedBeacon = BleUtils.parseBeacon(beacon);

            if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
                console.debug(`Beacon ${JSON.stringify(parsedBeacon)}`);
            }

            if (!this.beaconCache.hasAlreadyHandled(parsedBeacon)) {
                this.beaconCache.markAsHandled(parsedBeacon);
                if (typeof this.onCounts === 'function') {
                    this.onCounts();
                }
                getLatestPosition()
                    .then(position => {
                        this.onBeacon(parsedBeacon, position);
                    })
                    .catch(() => {
                        this.onBeacon(parsedBeacon);
                    });
            }
        });
    };

    startListening() {
        if (this.listening) {
            console.log('BLE manager already running; not starting again.');
            return;
        }

        console.debug(
            `Starting BLE listening. ${moment().format('HH:mm:ss.SSS')}`
        );
        this.beaconCache = new BeaconCache();
        this.listening = true;

        if (Platform.OS === 'ios') {
            // IOS BLE SETUP
            Beacons.shouldDropEmptyRanges(true);
            Promise.all(
                Regions.map(region => Beacons.startMonitoringForRegion(region))
            )
                .then(() => Beacons.startUpdatingLocation())
                .then(
                    () =>
                        console.debug(
                            `BLE listening start done ${moment().format(
                                'HH:mm:ss.SSS'
                            )}`
                        ),
                    console.error
                );
        } else {
            // ANDROID BLE SETUP
            Beacons.detectIBeacons();
            Regions.forEach(region => {
                Beacons.startMonitoringForRegion(region);
            });
        }

        Beacons.BeaconsEventEmitter.addListener(
            'beaconsDidRange',
            this.processBeaconInRange
        );

        Beacons.BeaconsEventEmitter.addListener(
            'regionDidEnter',
            this.regionDidEnter
        );

        Beacons.BeaconsEventEmitter.addListener(
            'regionDidExit',
            this.regionDidExit
        );
    }
}
