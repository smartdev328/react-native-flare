/* eslint-disable no-undef-init */
import { shallowEqualObjects } from 'shallow-equal';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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
import UserRoleTypes from '../constants/Roles';
import { checkLocationsPermission } from '../actions/userActions';
import {
    gotLongPress,
    gotShortPress,
    gotShortWhileAwaitingLong,
} from '../actions/regActions';
import { changeAppRoot } from '../actions/navActions';

export default class BleProvider {
    constructor(options) {
        this.bleManager = new BleManager({
            onBeacon: this.handleBeacon,
            onCounts: this.handleCounts,
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
        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            const newState = {
                bleListeningChange: state.hardware.bleListeningChange,
                bleListeningChangeDir: state.hardware.bleListeningChangeDir,
                radioToken: state.user.radioToken,
                locationPermission: state.user.permissions.location,
            };
            this.componentDidUpdate(newState);
        });
    }

    componentDidUpdate(newState) {
        if (shallowEqualObjects(this.props.hardware, newState)) {
            return;
        }

        const {
            bleListeningChange,
            bleListeningChangeDir,
            radioToken,
            locationPermission,
        } = newState;
        // console.log(newState);
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

    handleCounts = () => {
        const { dispatch } = this.props;
        dispatch({
            type: actionTypes.BEACON_COUNTS_UPDATED,
            shortPressCounts: this.bleManager.beaconCache.getRecentShortPressCounts(),
        });
    };

    handleBeacon = (beacon, position) => {
        const userDevices = this.store?.getState()?.user?.devices ?? [];
        const hasCompletedOnboarding = this.store?.getState()?.user
            ?.hasViewedTutorial;
        const awaitingShortPress =
            this.store?.getState()?.user?.scenarios?.shortPress === 'wait';
        const awaitingLongPress = ['wait', 'gotShort'].includes(
            this.store?.getState()?.user?.scenarios?.longPress
        );
        const userHasNoCrew =
            this.store
                ?.getState()
                ?.user?.crews.reduce((count, row) => count + row.length, 0) ===
            0;
        const deviceIDs = userDevices.map(d => d.id);
        const forCurrentUser =
            userDevices.length > 0 && deviceIDs.indexOf(beacon.deviceID) !== -1;
        const { dispatch, radioToken } = this.props;

        switch (beacon.type) {
            case BeaconTypes.Short.name: {
                let noop = undefined;
                if (awaitingShortPress) {
                    dispatch(gotShortPress());
                } else if (awaitingLongPress) {
                    noop = 'short-while-awaiting-long';
                    dispatch(gotShortWhileAwaitingLong());
                }
                dispatch(
                    call({
                        token: radioToken,
                        beacon,
                        position,
                        forCurrentUser,
                        noop,
                    })
                );
                break;
            }

            case BeaconTypes.Long.name: {
                let noop;
                if (userHasNoCrew) {
                    PushNotificationIOS.presentLocalNotification({
                        alertBody:
                            "No message was sent because you don't have a Crew.",
                        alertTitle: 'No Crews Set',
                    });
                    dispatch(changeAppRoot('secure'));
                    noop = 'no-crew';
                } else if (hasCompletedOnboarding) {
                    noop = undefined;
                } else if (awaitingLongPress) {
                    dispatch(gotLongPress());
                    noop = 'awaiting-long-press';
                } else {
                    console.log(
                        'Suppressing long press beacon during onboarding.'
                    );
                    noop = 'suppress-onboarding';
                }
                dispatch(
                    flare({
                        token: radioToken,
                        beacon,
                        position,
                        forCurrentUser,
                        noop,
                    })
                );
                break;
            }

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
    };
}
