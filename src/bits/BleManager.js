import { DeviceEventEmitter, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { Regions } from './BleConstants';
import BleUtils from './BleUtils';

export default class BleManager {
    constructor() {
        this.beaconsDidRange = null;
        this.regionDidEnterEvent = null;
        this.regionDidExitEvent = null;
    }

    static startListening(options) {

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
                // console.debug(`Beacon type ${parsedBeacon.type} from device ${parsedBeacon.deviceID} with nonce ${parsedBeacon.nonce}`);

                if (options && options.onBeaconDetected) {
                    options.onBeaconDetected(parsedBeacon);
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
