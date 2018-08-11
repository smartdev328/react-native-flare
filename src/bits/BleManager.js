/* global navigator */
import { DeviceEventEmitter, Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import BeaconCache from './BeaconCache';
import BleUtils from './BleUtils';
import { BeaconTypes, Regions } from './BleConstants';
import { call, flare, checkin } from '../actions/beaconActions';

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

    // eslint-disable-next-line
    getCurrentPosition(options) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                ({ code, message }) => reject(Object.assign(new Error(message), { name: 'PositionError', code })),
                options,
            );
        });
    }

    // eslint-disable-next-line class-methods-use-this
    handleBeacon(dispatch, token, beacon, position) {
        switch (beacon.type) {
        case BeaconTypes.Short.name:
            dispatch(call(token, beacon, position));
            break;

        case BeaconTypes.Long.name:
            dispatch(flare(token, beacon, position));
            break;

        case BeaconTypes.Checkin.name:
        default:
            dispatch(checkin(token, beacon, position));
            break;
        }
        console.debug(`Beacon type ${beacon.type} from device ${beacon.deviceID} with nonce ${beacon.nonce}`);
        if (position) {
            console.debug(`@ ${position.coords.latitude}, ${position.coords.longitude}`);
        } else {
            console.debug('@ unknown location');
        }
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

                console.debug(`Beacon ${JSON.stringify(parsedBeacon)}`);

                if (options && options.onBeaconDetected) {
                    options.onBeaconDetected(parsedBeacon);
                }

                if (options && options.store) {
                    if (!this.beaconCache.hasAlreadyHandled(parsedBeacon)) {
                        this.beaconCache.markAsHandled(parsedBeacon);

                        const { token } = options.store.getState().user;
                        this.getCurrentPosition({
                            enableHighAccuracy: true,
                            timeout: 60000,
                        }).then((position) => {
                            this.handleBeacon(options.store.dispatch, token, parsedBeacon, position);
                        }).catch((err) => {
                            console.debug(`Failed to get location: ${err}. Reporting beacon without it.`);
                            this.handleBeacon(options.store.dispatch, token, parsedBeacon);
                        });
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
