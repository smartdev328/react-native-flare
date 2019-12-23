import { BeaconTypes } from './BleConstants';
import {
    BLUETOOTH_BEACON_LOGGING,
    SHOW_ALL_BEACONS_IN_HOME_SCREEN,
    MANUFACTURING_MODE_ENABLED,
} from '../constants/Config';
import {
    call,
    flare,
    checkin,
    manufacturingCheckin,
} from '../actions/beaconActions';
import * as actionTypes from '../actions/actionTypes';
import BleManager from './BleManager';
import ManufacturingStages from '../constants/ManufacturingStages';
import StoreObserver from './StoreObserver';
import UserRoleTypes from '../constants/Roles';
import { checkLocationsPermission } from '../actions/userActions';
import { gotLongPress } from '../actions/regActions';

export default class BleProvider {
    constructor(options) {
        this.bleManager = new BleManager({
            onBeacon: (beacon, position) => this.handleBeacon(beacon, position),
        });
        this.setStore(options.store);
        this.props.dispatch(checkLocationsPermission());
    }

    setStore(store) {
        this.store = store;
        this.props = {
            dispatch: store.dispatch,
            hardware: store.getState().hardware,
            radioToken:
                store.getState().user && store.getState().user.radioToken,
        };
        this.observer = StoreObserver(store);
        this.unsubscribe = this.observer(
            state => ({
                bleListeningChange: state.hardware.bleListeningChange,
                bleListeningChangeDir: state.hardware.bleListeningChangeDir,
                radioToken: state.user.radioToken,
                locationPermission: state.user.permissions.location,
            }),
            newState => this.componentDidUpdate(newState)
        );
    }

    componentDidUpdate(newState) {
        if (JSON.stringify(this.props.hardware) === JSON.stringify(newState)) {
            return;
        }

        const {
            bleListeningChange,
            bleListeningChangeDir,
            radioToken,
            locationPermission,
        } = newState;
        console.log(newState);
        if (radioToken) {
            this.props.radioToken = radioToken;
        }

        if (bleListeningChange === 'requested' && locationPermission) {
            if (bleListeningChangeDir === 'up') {
                this.bleManager.startListening();
            } else {
                this.bleManager.shutdown();
            }
        }

        this.props.hardware = newState;
    }

    handleBeacon(beacon, position) {
        const userDevices =
            (this.store && this.store.getState().user.devices) || [];
        const hasCompletedOnboarding =
            this.store && this.store.getState().user.hasViewedTutorial;
        const awaitingLongPress =
            this.store &&
            this.store.getState().user.scenarios.longPress === 'wait';
        const deviceIDs = userDevices.map(d => d.id);
        const forCurrentUser =
            userDevices.length > 0 && deviceIDs.indexOf(beacon.deviceID) !== -1;
        const { dispatch, radioToken } = this.props;

        switch (beacon.type) {
            case BeaconTypes.Short.name:
                dispatch(
                    call(radioToken, beacon, position, forCurrentUser)
                ).then(() => {
                    // Track short presses for all nearby devices so we can know when users are adding jewelry
                    if (!forCurrentUser) {
                        dispatch({
                            type: actionTypes.BEACON_COUNTS_UPDATED,
                            shortPressCounts: this.bleManager.beaconCache.getRecentShortPressCounts(),
                        });
                    }
                });
                break;

            case BeaconTypes.Long.name:
                if (hasCompletedOnboarding) {
                    dispatch(
                        flare(radioToken, beacon, position, forCurrentUser)
                    );
                } else if (awaitingLongPress) {
                    dispatch(gotLongPress());
                } else {
                    console.log(
                        'Suppressing long press beacon during onboarding.'
                    );
                }
                break;

            case BeaconTypes.Sleep.name:
                console.log('TODO: handle device going to sleep');
                break;

            case BeaconTypes.BurnIn.name:
                if (MANUFACTURING_MODE_ENABLED) {
                    const hasManufacturingRole =
                        this.store.getState().user.role ===
                        UserRoleTypes.Manufacturing;
                    if (hasManufacturingRole) {
                        dispatch(
                            manufacturingCheckin(
                                radioToken,
                                beacon,
                                position,
                                ManufacturingStages.indexOf('BurnIn')
                            )
                        );
                    }
                }
                break;

            case BeaconTypes.Checkin.name:
            default:
                dispatch(checkin(radioToken, beacon, position, forCurrentUser));
                break;
        }

        // Inform the UI if the beacon is for the current user
        if (forCurrentUser || SHOW_ALL_BEACONS_IN_HOME_SCREEN) {
            dispatch({
                type: actionTypes.BEACON_RECEIVED,
                beacon,
            });
        } else if (BLUETOOTH_BEACON_LOGGING === 'enabled') {
            console.log(
                `Not updating homescreen with irrelevant beacon ${JSON.stringify(
                    beacon
                )}`
            );
        }

        if (
            BLUETOOTH_BEACON_LOGGING === 'enabled' ||
            BLUETOOTH_BEACON_LOGGING === 'verbose'
        ) {
            const short = beacon.uuid.substr(0, 8);
            console.debug(
                `Beacon type ${beacon.type}: device ${beacon.deviceID}, uuid ${short}, rssi ${beacon.rssi}`
            );
            if (position) {
                console.debug(
                    `@ ${position.coords.latitude}, ${position.coords.longitude}`
                );
            } else {
                console.debug('@ unknown location');
            }
        }
    }
}
