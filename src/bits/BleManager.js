import { DeviceEventEmitter, Platform } from 'react-native';
import { connect } from 'react-redux';
import Beacons from 'react-native-beacons-manager';
import BeaconCache from './BeaconCache';
import BleUtils from './BleUtils';
import { Regions } from './BleConstants';

import { BEACON_RECEIVED } from '../actions/actionTypes';

export default class BleManager {
    constructor() {
        this.beaconsDidRange = null;
        this.regionDidEnterEvent = null;
        this.regionDidExitEvent = null;
        this.listening = false;
        this.beaconCache = new BeaconCache();
    }

    isListening() {
        return this.listening;
    }

    startListening(options) {
        console.debug('Starting BLE listening.');
        this.listening = true;

        if (Platform.OS === 'ios') {
            // IOS BLE SETUP
            Beacons.requestAlwaysAuthorization();
            Regions.forEach((region) => {
                Beacons.startMonitoringForRegion(region);
            });
            Beacons.startUpdatingLocation();
        } else {
            // ANDROID BLE SETUP
            Beacons.detectIBeacons();
            Regions.forEach((region) => {
                Beacons.startMonitoringForRegion(region);
            });
        }

        this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
            data.beacons.forEach((beacon) => {
                const parsedBeacon = BleUtils.parseBeacon(beacon);

                if (options && options.onBeaconDetected) {
                    options.onBeaconDetected(parsedBeacon);
                }

                if (options && options.store) {
                    if (!this.beaconCache.hasAlreadyHandled(beacon)) {
                        this.beaconCache.markAsHandled(beacon);
                        options.store.dispatch({
                            type: BEACON_RECEIVED,
                            parsedBeacon,
                        });
                        console.debug(`Beacon type ${parsedBeacon.type} from device ${parsedBeacon.deviceID} with nonce ${parsedBeacon.nonce}`);                        
                    }
                }
            });
        });

        this.regionDidEnterEvent = DeviceEventEmitter.addListener(
            'regionDidEnter',
            (region) => {
                Beacons.startRangingBeaconsInRegion(region);
            },
        );

        this.regionDidExitEvent = DeviceEventEmitter.addListener(
            'regionDidExit',
            (region) => {
                Beacons.stopRangingBeaconsInRegion(region);
            },
        );
    }
}
