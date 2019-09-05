/* global navigator */
import { Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';

import { BLUETOOTH_BEACON_LOGGING } from '../constants';
import { Regions } from './BleConstants';
import BeaconCache from './BeaconCache';
import BleUtils from './BleUtils';
import getLatestPosition from '../helpers/location';

export default class BleManager {
    constructor(options) {
        this.beaconsDidRange = null;
        this.regionDidEnterEvent = null;
        this.regionDidExitEvent = null;
        this.listening = false;
        this.beaconCache = null;
        this.onBeacon = options.onBeacon;
    }

    shutdown() {
        Regions.forEach(region => Beacons.stopMonitoringForRegion(region));
        Beacons.stopUpdatingLocation();

        Beacons.BeaconsEventEmitter.removeListener('beaconsDidRange', (data) => {
            this.processBeaconInRange(data);
        });

        this.regionDidEnterEvent = Beacons.BeaconsEventEmitter.removeListener('regionDidEnter', (region) => {
            Beacons.startRangingBeaconsInRegion(region);
        });

        this.regionDidExitEvent = Beacons.BeaconsEventEmitter.removeListener('regionDidExit', (region) => {
            Beacons.stopRangingBeaconsInRegion(region);
        });

        this.beaconCache.shutdown();
        delete this.beaconCache;
        this.beaconCache = null;
        this.listening = false;
    }

    isListening() {
        return this.listening;
    }

    processBeaconInRange(data) {
        if (!this.beaconCache) {
            this.beaconCache = new BeaconCache();
        }

        data.beacons.forEach((beacon) => {
            const parsedBeacon = BleUtils.parseBeacon(beacon);

            if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
                console.debug(`Beacon ${JSON.stringify(parsedBeacon)}`);
            }

            if (!this.beaconCache.hasAlreadyHandled(parsedBeacon)) {
                this.beaconCache.markAsHandled(parsedBeacon);
                getLatestPosition()
                    .then((position) => {
                        this.onBeacon(parsedBeacon, position);
                    })
                    .catch(() => {
                        this.onBeacon(parsedBeacon);
                    });
            }
        });
    }

    startListening() {
        if (this.listening) {
            console.log('BLE manager already running; not starting again.');
            return;
        }

        console.debug('Starting BLE listening.');
        this.beaconCache = new BeaconCache();
        this.listening = true;

        if (Platform.OS === 'ios') {
            // IOS BLE SETUP
            Beacons.requestAlwaysAuthorization();
            Beacons.shouldDropEmptyRanges(true);
            Regions.forEach(region => Beacons.startMonitoringForRegion(region));
            Beacons.startUpdatingLocation();
        } else {
            // ANDROID BLE SETUP
            Beacons.detectIBeacons();
            Regions.forEach((region) => {
                Beacons.startMonitoringForRegion(region);
            });
        }

        this.beaconsDidRange = Beacons.BeaconsEventEmitter.addListener('beaconsDidRange', (data) => {
            this.processBeaconInRange(data);
        });

        this.regionDidEnterEvent = Beacons.BeaconsEventEmitter.addListener('regionDidEnter', (region) => {
            Beacons.startRangingBeaconsInRegion(region);
        });

        this.regionDidExitEvent = Beacons.BeaconsEventEmitter.addListener('regionDidExit', (region) => {
            Beacons.stopRangingBeaconsInRegion(region);
        });
    }
}
