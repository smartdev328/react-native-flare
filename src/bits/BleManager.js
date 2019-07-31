/* global navigator */
import { Platform } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import RNBluetoothInfo from 'react-native-bluetooth-info';

import { BeaconTypes, Regions } from './BleConstants';
import { BLUETOOTH_BEACON_LOGGING, SHOW_ALL_BEACONS_IN_HOME_SCREEN, MANUFACTURING_MODE_ENABLED } from '../constants';
import { call, flare, checkin, manufacturingCheckin } from '../actions/beaconActions';
import { setBluetoothState } from '../actions/hardwareActions';
import * as actionTypes from '../actions/actionTypes';
import BeaconCache from './BeaconCache';
import BleUtils from './BleUtils';
import UserRoleTypes from '../constants/Roles';
import ManufacturingStages from '../constants/ManufacturingStages';

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
        this.radioToken = this.store && this.store.getState().user.radioToken;
    }

    setStore(store) {
        this.store = store;
    }

    shutdown() {
        Regions.forEach(region => Beacons.stopMonitoringForRegion(region));
        Beacons.stopUpdatingLocation();

        RNBluetoothInfo.removeEventListener('change', (change) => {
            this.onBluetoothStateChange(change);
        });

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
        const userDevices = (this.store && this.store.getState().user.devices) || [];
        const deviceIDs = userDevices.map(d => d.id);
        const forCurrentUser = userDevices.length > 0 && deviceIDs.indexOf(beacon.deviceID) !== -1;

        switch (beacon.type) {
        case BeaconTypes.Short.name:
            dispatch(call(token, beacon, position, forCurrentUser)).then(() => {
                // Track short presses for all nearby devices so we can know when users are adding jewelry
                if (!forCurrentUser) {
                    dispatch({
                        type: actionTypes.BEACON_COUNTS_UPDATED,
                        shortPressCounts: this.beaconCache.getRecentShortPressCounts(),
                    });
                }
            });
            break;

        case BeaconTypes.Long.name:
            dispatch(flare(token, beacon, position, forCurrentUser));
            break;

        case BeaconTypes.Sleep.name:
            console.log('TODO: handle device going to sleep');
            break;

        case BeaconTypes.BurnIn.name:
            if (MANUFACTURING_MODE_ENABLED) {
                const hasManufacturingRole = this.store.getState().user.role === UserRoleTypes.Manufacturing;
                if (hasManufacturingRole) {
                    dispatch(manufacturingCheckin(token, beacon, position, ManufacturingStages.indexOf('BurnIn')));
                }
            }
            break;

        case BeaconTypes.Checkin.name:
        default:
            dispatch(checkin(token, beacon, position, forCurrentUser));
            break;
        }

        // Inform the UI if the beacon is for the current user
        if (forCurrentUser || SHOW_ALL_BEACONS_IN_HOME_SCREEN) {
            dispatch({
                type: actionTypes.BEACON_RECEIVED,
                beacon,
            });
        } else if (BLUETOOTH_BEACON_LOGGING === 'enabled') {
            console.log(`Not updating homescreen with irrelevant beacon ${JSON.stringify(beacon)}`);
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

    processBeaconInRange(data) {
        if (!this.beaconCache) {
            this.beaconCache = new BeaconCache();
        }

        const { radioToken } = this.store.getState().user;

        data.beacons.forEach((beacon) => {
            const parsedBeacon = BleUtils.parseBeacon(beacon);

            if (BLUETOOTH_BEACON_LOGGING === 'verbose') {
                console.debug(`Beacon ${JSON.stringify(parsedBeacon)}`);
            }

            if (this.onBeaconDetected) {
                this.onBeaconDetected(parsedBeacon);
            }

            if (radioToken) {
                if (!this.beaconCache.hasAlreadyHandled(parsedBeacon)) {
                    this.beaconCache.markAsHandled(parsedBeacon);
                    this.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 60000,
                    })
                        .then((position) => {
                            this.handleBeacon(this.dispatch, radioToken, parsedBeacon, position);
                        })
                        .catch((err) => {
                            console.debug(`Failed to get location: ${err}. Reporting beacon without it.`);
                            this.handleBeacon(this.dispatch, radioToken, parsedBeacon);
                        });
                }
            }
        });
    }

    startListening(options) {
        console.debug('Starting BLE listening.');
        this.beaconCache = new BeaconCache();
        this.listening = true;
        if (options.radioToken) {
            this.radioToken = options.radioToken;
        }
        if (options.dispatch) {
            this.dispatch = options.dispatch;
        }

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
