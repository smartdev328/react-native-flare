/* global navigator */
import { Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import RNBluetoothInfo from 'react-native-bluetooth-info';

import BeaconCache from './BeaconCache';
import BleUtils from './BleUtils';
import { BeaconTypes, Regions } from './BleConstants';
import { call, flare, checkin } from '../actions/beaconActions';
import * as actionTypes from '../actions/actionTypes';
import { setBluetoothState } from '../actions/hardwareActions';
import { BLUETOOTH_BEACON_LOGGING, SHOW_ALL_BEACONS_IN_HOME_SCREEN } from '../constants';

export default class BleManager {
    constructor(options) {
        this.beaconsDidRange = null;
        this.regionDidEnterEvent = null;
        this.regionDidExitEvent = null;
        this.listening = false;
        this.beaconCache = null;
        RNBluetoothInfo.addEventListener('change', (change) => {
            this.onBluetoothStateChange(change);
        });
        RNBluetoothInfo.getCurrentState().then((change) => {
            this.onBluetoothStateChange(change);
        });
        this.store = options && options.store;
        this.dispatch = this.store && this.store.dispatch;
    }

    shutdown() {
        Regions.forEach(region => Beacons.stopMonitoringForRegion(region));
        Beacons.stopUpdatingLocation();

        RNBluetoothInfo.removeEventListener(
            'change',
            (change) => {
                this.onBluetoothStateChange(change);
            },
        );

        Beacons.BeaconsEventEmitter.removeListener(
            'beaconsDidRange',
            (data) => {
                this.processBeaconInRange(data);
            },
        );

        this.regionDidEnterEvent = Beacons.BeaconsEventEmitter.removeListener(
            'regionDidEnter',
            (region) => {
                Beacons.startRangingBeaconsInRegion(region);
            },
        );

        this.regionDidExitEvent = Beacons.BeaconsEventEmitter.removeListener(
            'regionDidExit',
            (region) => {
                Beacons.stopRangingBeaconsInRegion(region);
            },
        );

        this.beaconCache.shutdown();
        delete this.beaconCache;
        this.beaconCache = null;
        this.listening = false;
    }

    onBluetoothStateChange(change) {
        const { connectionState } = change.type;
        if (this.dispatch) {
            this.dispatch(setBluetoothState(connectionState));
        }
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
        const userDevices = this.store.getState().user.devices || [];
        const deviceIDs = userDevices.map(d => d.id);
        const forCurrentUser = userDevices.length > 0 && deviceIDs.indexOf(beacon.deviceID) !== -1;

        switch (beacon.type) {
        case BeaconTypes.Short.name:
            dispatch(call(token, beacon, position, forCurrentUser));
            break;

        case BeaconTypes.Long.name:
            dispatch(flare(token, beacon, position, forCurrentUser));
            break;

        case BeaconTypes.Checkin.name:
        default:
            dispatch(checkin(token, beacon, position, forCurrentUser));
            break;
        }

        if (forCurrentUser || SHOW_ALL_BEACONS_IN_HOME_SCREEN) {
            dispatch({
                type: actionTypes.BEACON_RECEIVED,
                beacon,
            });
        }

        if (BLUETOOTH_BEACON_LOGGING === 'enabled' || BLUETOOTH_BEACON_LOGGING === 'verbose') {
            const short = beacon.uuid.substr(0, 8);
            console.debug(`Beacon type ${beacon.type}: device ${beacon.deviceID}, uuid ${short}, rssi ${beacon.rssi}`);
            if (position) {
                console.debug(`@ ${position.coords.latitude}, ${position.coords.longitude}`);
            } else {
                console.debug('@ unknown location');
            }
        }
    }

    processBeaconInRange(data, options) {
        data.beacons.forEach((beacon) => {
            const parsedBeacon = BleUtils.parseBeacon(beacon);


            if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
                console.debug(`Beacon ${JSON.stringify(parsedBeacon)}`);
            }

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
    }

    startListening(options) {
        console.debug('Starting BLE listening.');
        this.beaconCache = new BeaconCache();
        this.listening = true;

        if (Platform.OS === 'ios') {
            // IOS BLE SETUP
            Beacons.requestAlwaysAuthorization();
            Beacons.shouldDropEmptyRanges(true);
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

        this.beaconsDidRange = Beacons.BeaconsEventEmitter.addListener(
            'beaconsDidRange',
            (data) => {
                this.processBeaconInRange(data, options);
            },
        );

        this.regionDidEnterEvent = Beacons.BeaconsEventEmitter.addListener(
            'regionDidEnter',
            (region) => {
                Beacons.startRangingBeaconsInRegion(region);
            },
        );

        this.regionDidExitEvent = Beacons.BeaconsEventEmitter.addListener(
            'regionDidExit',
            (region) => {
                Beacons.stopRangingBeaconsInRegion(region);
            },
        );
    }
}
