/* global __DEV__ */
/* eslint global-require: "off" */
import React from 'react';
import { AppState, PushNotificationIOS, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import moment from 'moment';
import BackgroundTimer from 'react-native-background-timer';
import RNBluetoothInfo from 'react-native-bluetooth-info';

import {
    ACCOUNT_SYNC_INTERVAL,
    ACCOUNT_SYNC_INTERVAL_FLARE,
    ACCOUNT_SYNC_INTERVAL_DEV,
    SHOW_ALL_BEACONS_IN_HOME_SCREEN,
} from '../constants';
import { BeaconTypes } from '../bits/BleConstants';
import { claimDevice, syncAccountDetails, fetchContacts, changeAppRoot } from '../actions/index';
import { flare, processQueuedBeacons, call, checkin } from '../actions/beaconActions';
import { getPermission } from '../actions/userActions';
import { iconsMap } from '../bits/AppIcons';
import { startBleListening } from '../actions/hardwareActions';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import DeviceSelector from '../bits/DeviceSelector';
import FlareAlert from '../bits/FlareAlert';
import FlareDeviceID from '../bits/FlareDeviceID';
import Location from '../helpers/location';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.cream,
        paddingBottom: Spacing.small,
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16,
    },
    centered: {
        alignSelf: 'center',
        textAlign: 'center',
    },
    deviceSelector: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 9,
    },
    bluetoothDisabledWarning: {
        margin: Spacing.medium,
    },
    bluetoothDisabledWarningTitle: {
        paddingHorizontal: Spacing.large,
        textAlign: 'center',
        fontSize: Type.size.medium,
        fontWeight: '700',
    },
    devOnlyButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.shuttingDown = false;
        this.setSyncTiming();
        Navigation.events().bindComponent(this);

        this.state = {
            showSideMenu: false,
            bluetoothEnabled: true,
        };
    }

    componentWillMount() {
        RNBluetoothInfo.addEventListener('change', bleState => this.handleBluetoothStateChange(bleState));
    }

    componentDidMount() {
        if (this.props.hasActiveFlare) {
            this.props.dispatch(changeAppRoot('secure-active-event'));
        }

        // Update bluetooth state after first boot
        RNBluetoothInfo.getCurrentState().then(bleState => this.handleBluetoothStateChange(bleState));

        // Contacts are not stored on the server. It takes a while to fetch them locally, so we
        // start that process now before users need to view them.
        if (this.props.permissions.contacts) {
            this.props.dispatch(fetchContacts());
        } else {
            this.props.dispatch(getPermission('contacts'));
        }

        if (!this.props.permissions.location) {
            this.props.dispatch(getPermission('location', { type: 'always' }));
        }

        if (!this.props.hardware || !this.props.hardware.bleListening) {
            this.props.dispatch(startBleListening());
        }

        // Users may have modified their accounts on other devices or on the web. Keep this device
        // in sync by fetching server-stored data.
        this.props.dispatch(syncAccountDetails({
            authToken: this.props.authToken,
        }));

        BackgroundTimer.stopBackgroundTimer();
        BackgroundTimer.runBackgroundTimer(() => this.syncAccount(), this.accountSyncTimeInMs);
        AppState.addEventListener('change', newState => this.handleAppStateChange(newState));
    }

    componentDidUpdate(prevProps) {
        /**
         * Handle transitions in flare state: reset intervals for fetching data
         */
        if (this.props.hasActiveFlare !== prevProps.hasActiveFlare) {
            this.setSyncTiming();
            BackgroundTimer.stop();
            BackgroundTimer.stopBackgroundTimer();

            if (this.props.hasActiveFlare) {
                this.props.dispatch(changeAppRoot('secure-active-event'));
            } else {
                BackgroundTimer.runBackgroundTimer(() => this.syncAccount(), this.accountSyncTimeInMs);
                PushNotificationIOS.removeAllDeliveredNotifications();
            }
        }

        /**
         * Fetch contacts if the permission changes from denied to anything else
         */
        if (prevProps.permissions.contacts === false && this.props.permissions.contacts) {
            this.props.dispatch(fetchContacts());
        }
    }

    componentWillUnmount() {
        this.shuttingDown = true;
        BackgroundTimer.stopBackgroundTimer();
        RNBluetoothInfo.removeEventListener('change', bleState => this.handleBluetoothStateChange(bleState));
        AppState.removeEventListener('change', newState => this.handleAppStateChange(newState));
    }

    /**
     * Fetch account details and submit app status periodically. The frequency at which we sync varies with app state.
     * If a flare is active, sync frequently. If we're in dev, sync a little more than normal. Otherwise use the default
     * timing. All times are set in the environment configuration.
     */
    setSyncTiming() {
        if (this.props.hasActiveFlare) {
            this.accountSyncTimeInMs = ACCOUNT_SYNC_INTERVAL_FLARE;
        } else if (__DEV__) {
            this.accountSyncTimeInMs = ACCOUNT_SYNC_INTERVAL_DEV;
        } else {
            this.accountSyncTimeInMs = ACCOUNT_SYNC_INTERVAL;
        }
    }

    toggleSideMenu() {
        const { showSideMenu } = this.state;
        const newSideMenuState = !showSideMenu;

        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: newSideMenuState,
                },
            },
        });

        this.setState({
            showSideMenu: newSideMenuState,
        });
    }

    navigationButtonPressed({ buttonId }) {
        switch (buttonId) {
        case 'menuButton':
            this.toggleSideMenu();
            break;
        default:
            console.warn('Unhandled button press in home screen.');
            break;
        }
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Home',
            },
        });
    };

    /**
     * Submit user location and fetch any account updates.
     */
    syncAccount() {
        // Don't kick off a new async request if we're shutting down. This prevents an infinite loop of syncing
        // status -> auth fail -> sign out.
        if (this.shuttingDown || !this.props.analyticsEnabled) {
            return;
        }

        // Transmit the current state and retrieve any updates from the server.
        Location.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: ACCOUNT_SYNC_INTERVAL,
        }).then((position) => {
            this.props.dispatch(syncAccountDetails({
                authToken: this.props.authToken,
                status: {
                    timestamp: moment()
                        .utc()
                        .format('YYYY-MM-DD HH:mm:ss'),
                    latitude: position.latitude,
                    longitude: position.longitude,
                    details: {
                        permissions: this.props.permissions,
                        hardware: this.props.hardware,
                        position,
                    },
                },
            }));
        });

        // Process any beacon events that we tried (and failed) to submit earlier.
        if (this.props.problemBeacons && this.props.problemBeacons.length > 0) {
            this.props.dispatch(processQueuedBeacons(this.props.handleBeacon, this.props.authToken, this.props.problemBeacons));
        }
    }

    handleAppStateChange(nextAppState) {
        // eslint-disable-next-line
        console.debug(`App went to state ${nextAppState}.`);
        switch (nextAppState) {
        case 'active':
        case 'inactive':
        case 'background':
        default:
            break;
        }
    }

    handleBluetoothStateChange(bleState) {
        const { connectionState } = bleState.type;
        this.setState({
            bluetoothEnabled: connectionState === 'on',
        });
    }

    handleContactsClick() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Contacts',
                options: {
                    topBar: {
                        visible: true,
                        animate: false,
                        leftButtons: [
                            {
                                id: 'backButton',
                                icon: iconsMap.back,
                                color: Colors.theme.purple,
                            },
                        ],
                        title: {
                            component: {
                                name: 'com.flarejewelry.app.FlareNavBar',
                                alignment: 'center',
                            },
                        },
                    },
                },
            },
        });
    }

    sendTestFlare() {
        if (!__DEV__) {
            return;
        }
        const position = {
            coords: {
                latitude: 42.354338,
                longitude: -71.065497,
            },
        };

        const testBeacon = {
            uuid: 'flare-dev-test',
            nonce: null,
            type: BeaconTypes.Long.value,
            deviceID: this.props.devices[0] ? this.props.devices[0].id : 1,
            rssi: 0,
            proximity: 'far',
            accuracy: 0,
            timestamp: Date.now(),
        };
        this.props.dispatch(flare(this.props.radioToken, testBeacon, position, /* forCurrentUser= */ true));
    }

    sendTestCall() {
        if (!__DEV__) {
            return;
        }
        const testBeacon = {
            uuid: 'flare-dev-test',
            nonce: null,
            type: BeaconTypes.Short.value,
            deviceID: this.props.devices[0] ? this.props.devices[0].id : 1,
            rssi: 0,
            proximity: 'far',
            accuracy: 0,
            timestamp: Date.now(),
        };
        this.props.dispatch(call(this.props.radioToken, testBeacon, /* position= */ null, /* forCurrentUser= */ true));
    }

    sendTestCheckin() {
        if (!__DEV__) {
            return;
        }
        const testBeacon = {
            uuid: 'flare-dev-test',
            nonce: null,
            type: BeaconTypes.Checkin.value,
            deviceID: this.props.devices[0] ? this.props.devices[0].id : 1,
            rssi: 0,
            proximity: 'far',
            accuracy: 0,
            timestamp: Date.now(),
        };
        this.props.dispatch(checkin(this.props.radioToken, testBeacon, /* position= */ null, /* forCurrentUser= */ true));
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.bluetoothEnabled && (
                    <FlareAlert message={Strings.home.bluetoothDisabledWarning} variant="warning" large centered />
                )}
                <View style={styles.deviceSelector}>
                    <DeviceSelector
                        addDevice={deviceID => this.props.dispatch(claimDevice(this.props.authToken, deviceID))}
                        devices={this.props.devices}
                        claimingDevice={this.props.claimingDevice}
                        claimingDeviceFailure={this.props.claimingDeviceFailure}
                    >
                        <View style={styles.centered}>
                            {!this.props.latestBeacon && <Text>{Strings.home.lastBeacon.absent}</Text>}
                            {this.props.latestBeacon && (
                                <View style={styles.centered}>
                                    <Text>{Strings.home.lastBeacon.present}</Text>
                                    <Text style={[styles.centered, styles.dimmed]}>
                                        {moment(this.props.latestBeacon.timestamp).format('MMM D @ h:mma')}
                                    </Text>
                                    {SHOW_ALL_BEACONS_IN_HOME_SCREEN && (
                                        <FlareDeviceID
                                            value={this.props.latestBeacon.deviceID}
                                            style={[styles.centered]}
                                        />
                                    )}
                                </View>
                            )}
                        </View>
                    </DeviceSelector>
                </View>

                <View style={styles.footer}>
                    {!this.props.hasActiveFlare && this.props.permissions.contacts && (
                        <Button
                            primary
                            dark
                            onPress={() => this.handleContactsClick()}
                            title={this.props.contactsLabel}
                        />
                    )}
                    {!this.props.permissions.contacts && <Text>{Strings.home.contactsNeedPermission}</Text>}
                    {__DEV__ && !this.props.hasActiveFlare && (
                        <View style={styles.devOnlyButtons}>
                            <Button
                                dev
                                secondary
                                onPress={() => this.sendTestFlare()}
                                title={Strings.dev.sendTestFlare}
                            />
                            <Button
                                dev
                                secondary
                                onPress={() => this.sendTestCall()}
                                title={Strings.dev.sendTestCall}
                            />
                            <Button
                                dev
                                secondary
                                onPress={() => this.sendTestCheckin()}
                                title={Strings.dev.sendTestCheckin}
                            />
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const contactsLabel =
        state.user.crews && state.user.crews.length
            ? Strings.home.contactsButtonLabelEdit
            : Strings.home.contactsButtonLabelAdd;

    return {
        activatingFlareState: state.user.activatingFlareState,
        analyticsEnabled: state.user.settings.analyticsEnabled,
        claimingDevice: state.user.claimingDevice,
        claimingDeviceFailure: state.user.claimingDeviceFailure,
        crewEventNotificationMessage: state.user.settings.promptMessage,
        contactsLabel,
        crews: state.user.crews,
        devices: state.user.devices,
        hardware: state.hardware,
        hasActiveFlare: state.user.hasActiveFlare,
        latestBeacon: state.beacons.latest,
        permissions: state.user.permissions,
        problemBeacons: state.beacons.problems,
        authToken: state.user.authToken,
        radioToken: state.user.radioToken,
    };
}

export default connect(mapStateToProps)(Home);
