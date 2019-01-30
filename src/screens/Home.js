/* global __DEV__ */
/* eslint global-require: "off" */
import React from 'react';
import { AppState, Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import { Navigation } from 'react-native-navigation';


import {
    ACCOUNT_SYNC_INTERVAL,
    ACCOUNT_SYNC_INTERVAL_FLARE,
    ACCOUNT_SYNC_INTERVAL_DEV,
    FLARE_TIMELINE_REFRESH_INTERVAL,
    SHOW_ALL_BEACONS_IN_HOME_SCREEN,
} from '../constants';

import { claimDevice, syncAccountDetails, fetchContacts } from '../actions/index';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import DeviceSelector from '../bits/DeviceSelector';
import Strings from '../locales/en';
import Spacing from '../bits/Spacing';

import { checkPermissions, getCrewEventTimeline } from '../actions/userActions';
import { flare, processQueuedBeacons } from '../actions/beaconActions';
import Location from '../helpers/location';
import CrewEventTimeline from '../bits/CrewEventTimeline';
import { BeaconTypes } from '../bits/BleConstants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.blueDark,
        paddingBottom: Spacing.small,
    },
    containerWithActiveFlare: {
        backgroundColor: Colors.backgrounds.pink,
    },
    idleBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
    navbar: {
        opacity: 1,
        backgroundColor: Colors.theme.blueDark,
    },
    bluetoothDisabledWarning: {
        padding: Spacing.medium,
    },
    bluetoothDisabledWarningTitle: {
        color: Colors.theme.cream,
        fontSize: 22,
        fontWeight: '700',
    },
    bluetoothDisabledWarningBody: {
        color: Colors.theme.cream,
        fontSize: 16,
    },
    timelineHeader: {
        paddingTop: Spacing.small,
        paddingBottom: Spacing.medium,
        fontSize: 22,
        fontWeight: '700',
        color: Colors.theme.purple,
    },
    crewTimelineContainer: {
        padding: Spacing.medium,
    },
    backgroundSplatTop: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '40%',
    },
    backgroundSplatBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '40%',
    },
    backgroundStar: {
        position: 'absolute',
        top: '9%',
        left: Spacing.huge,
        width: 48,
        height: 48,
    },
    backgroundFlower: {
        position: 'absolute',
        top: '11%',
        right: '5%',
        width: 96,
        height: 96,
    },
    backgroundDiamond: {
        position: 'absolute',
        bottom: '20%',
        right: '38%',
        width: 16,
        height: 16,
    },
    networkIcon: {
        alignSelf: 'center',
        width: 48,
        height: 48,
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.eventTimelineRefreshTimer = null;
        this.shuttingDown = false;
        this.setSyncTiming();
        Navigation.events().bindComponent(this);

        this.state = {
            showSideMenu: false,
        };
    }

    componentDidMount() {
        // Check permissions just in case they've changed
        this.props.dispatch(checkPermissions());

        // Contacts are not stored on the server. It takes a while to fetch them locally, so we
        // start that process now before users need to view them.
        if (this.props.permissions.contacts) {
            this.props.dispatch(fetchContacts());
        }

        // Users may have modified their accounts on other devices or on the web. Keep this device
        // in sync by fetching server-stored data.
        this.props.dispatch(syncAccountDetails({
            token: this.props.token,
        }));

        // Periodically fetch account status to ensure auth and to observe account changes from other devices.
        if (this.eventTimelineRefreshTimer) {
            clearInterval(this.eventTimelineRefreshTimer);
            this.eventTimelineRefreshTimer = null;
        }
        BackgroundTimer.stopBackgroundTimer();
        BackgroundTimer.runBackgroundTimer(() => this.syncAccount(), this.accountSyncTimeInMs);
        AppState.addEventListener('change', newState => this.handleAppStateChange(newState));

        // If the current user has an active flare, fetch the crew timeline
        // and show it
        if (this.props.hasActiveFlare) {
            this.startTimelineRefreshInterval();
        }

        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.AddJewelry',
                passProps: {
                    bleManager: this.props.bleManager,
                },
            },
        });
    }

    componentDidUpdate(prevProps) {
        /**
         * If device bluetooth state has changed and it's no longer on, show a local notification.
         */
        if (this.props.hardware && this.props.hardware.bluetooth !== 'on' &&
            this.props.hardware.bluetooth !== prevProps.hardware.bluetooth &&
            !this.props.hasActiveFlare) {
            this.props.notificationManager.localNotify({
                message: Strings.notifications.bluetoothDisabled,
            });
        }

        /**
         * Show a local notification when we're first requesting a flare
         */
        if (prevProps.activatingFlareState !== this.props.activatingFlareState &&
            this.props.activatingFlareState === 'request') {
            this.props.notificationManager.localNotify({
                message: this.props.crewEventNotificationMessage,
            });
        }

        /**
         * Handle transitions in flare state: reset intervals for fetching data
         */
        if (this.props.hasActiveFlare !== prevProps.hasActiveFlare) {
            this.setSyncTiming();
            BackgroundTimer.stop();
            BackgroundTimer.stopBackgroundTimer();
            BackgroundTimer.runBackgroundTimer(() => this.syncAccount(), this.accountSyncTimeInMs);
            if (this.props.hasActiveFlare) {
                this.startTimelineRefreshInterval();
            } else if (this.eventTimelineRefreshTimer) {
                clearInterval(this.eventTimelineRefreshTimer);
                this.eventTimelineRefreshTimer = null;
                this.props.notificationManager.clear();
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
        console.log('Unmounting home');
        this.shuttingDown = true;
        BackgroundTimer.stopBackgroundTimer();
        clearInterval(this.eventTimelineRefreshTimer);
        this.eventTimelineRefreshTimer = null;
        AppState.removeEventListener('change', newState => this.handleAppStateChange(newState));
    }

    onRefreshTimeline() {
        this.props.dispatch(getCrewEventTimeline(this.props.token, this.props.crewEvents[0].id));
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
    }

    /**
     * Submit user location and fetch any account updates.
     */
    syncAccount() {
        // Don't kick off a new async request if we're shutting down. This prevents an infinite loop of syncing
        // status -> auth fail -> sign out.
        if (this.shuttingDown) {
            return;
        }

        // Transmit the current state and retrieve any updates from the server.
        Location.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: ACCOUNT_SYNC_INTERVAL,
        }).then((position) => {
            this.props.dispatch(syncAccountDetails({
                token: this.props.token,
                status: {
                    timestamp: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
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
            this.props.dispatch(processQueuedBeacons(
                this.props.handleBeacon,
                this.props.token,
                this.props.problemBeacons,
            ));
        }
    }

    refreshTimeline() {
        if (this.props.crewEvents && this.props.crewEvents.length > 0) {
            const event = this.props.crewEvents[0];
            if (event) {
                this.props.dispatch(getCrewEventTimeline(this.props.token, event.id));
            }
        }
    }

    startTimelineRefreshInterval() {
        if (this.eventTimelineRefreshTimer !== null) {
            return;
        }
        this.refreshTimeline();
        this.eventTimelineRefreshTimer = setInterval(() => this.refreshTimeline(), FLARE_TIMELINE_REFRESH_INTERVAL);
    }

    handleAppStateChange(nextAppState) {
        // eslint-disable-next-line
        console.debug(`App went to state ${nextAppState}.`);
        switch (nextAppState) {
        case 'active':
            this.props.dispatch(checkPermissions());
            break;
        case 'inactive':
        case 'background':
        default:
            break;
        }
    }

    showPinCheckScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.PinCheck',
            },
        });
    }

    handleContactsClick() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Contacts',
            },
        });
    }

    sendTestFlare() {
        if (!__DEV__) {
            return;
        }
        const testBeacon = {
            uuid: 'flare-dev-test',
            nonce: null,
            type: BeaconTypes.Long,
            deviceID: this.props.devices[0].id,
            rssi: 0,
            proximity: 'far',
            accuracy: 0,
            timestamp: Date.now(),
        };
        this.props.dispatch(flare(
            this.props.token,
            testBeacon,
            null,
            /* forCurrentUser= */ true,
        ));
    }

    render() {
        return (
            <View style={[styles.container, this.props.hasActiveFlare && styles.containerWithActiveFlare]}>
                <Image
                    source={require('../assets/bg-splat-pink.png')}
                    style={styles.backgroundSplatBottom}
                    resizeMode="stretch"
                />
                {!this.props.hasActiveFlare &&
                    <View style={styles.idleBackground}>
                        <Image
                            source={require('../assets/bg-splat-green.png')}
                            style={styles.backgroundSplatTop}
                            resizeMode="stretch"
                        />
                        <Image
                            source={require('../assets/home-star.png')}
                            style={styles.backgroundStar}
                        />
                        <Image
                            source={require('../assets/home-flower-purple.png')}
                            style={styles.backgroundFlower}
                        />
                        <Image
                            source={require('../assets/home-diamond.png')}
                            style={styles.backgroundDiamond}
                        />
                    </View>
                }
                {this.props.hardware && this.props.hardware.bluetooth !== 'on' && !this.props.hasActiveFlare &&
                    <View style={styles.bluetoothDisabledWarning}>
                        <Text style={styles.bluetoothDisabledWarningTitle}>
                            {Strings.home.bluetoothDisabledWarning.title}
                        </Text>
                        <Text style={styles.bluetoothDisabledWarningBody}>
                            {Strings.home.bluetoothDisabledWarning.body}
                        </Text>
                    </View>
                }
                {!this.props.hasActiveFlare &&
                    <View style={styles.deviceSelector}>
                        <DeviceSelector
                            addDevice={deviceID => this.props.dispatch(claimDevice(this.props.token, deviceID))}
                            devices={this.props.devices}
                            claimingDevice={this.props.claimingDevice}
                            claimingDeviceFailure={this.props.claimingDeviceFailure}
                        >
                            <View style={styles.centered}>
                                {!this.props.latestBeacon &&
                                    <Text>
                                        {Strings.home.lastBeacon.absent}
                                    </Text>
                                }
                                {this.props.latestBeacon &&
                                    <View style={styles.centered}>
                                        <Image
                                            source={require('../assets/home-network-icon.png')}
                                            style={[styles.networkIcon]}
                                            resizeMode="contain"
                                        />
                                        <Text>
                                            {Strings.home.lastBeacon.present}
                                        </Text>
                                        <Text style={[styles.centered, styles.dimmed]}>
                                            {moment(this.props.latestBeacon.timestamp).format('MMM D @ h:mma')}
                                            {SHOW_ALL_BEACONS_IN_HOME_SCREEN &&
                                                ` – ${this.props.latestBeacon.deviceID}`
                                            }
                                        </Text>
                                    </View>
                                }
                            </View>
                        </DeviceSelector>
                    </View>
                }
                {this.props.hasActiveFlare &&
                    <View style={styles.crewTimelineContainer}>
                        <Text style={styles.timelineHeader}>
                            {Strings.crewEventTimeline.title}
                        </Text>
                        <CrewEventTimeline
                            timeline={this.props.crewEventTimeline}
                            onRefresh={() => this.onRefreshTimeline()}
                        />
                        <Button
                            rounded
                            primary
                            onPress={() => this.showPinCheckScreen()}
                            title={Strings.home.cancelActiveFlare}
                        />
                    </View>
                }
                <View style={styles.footer}>
                    {!this.props.hasActiveFlare &&
                        <Button
                            rounded
                            primary
                            onPress={() => this.handleContactsClick()}
                            title={this.props.contactsLabel}
                        />
                    }
                    {__DEV__ && !this.props.hasActiveFlare &&
                        <Button
                            rounded
                            primary
                            onPress={() => this.sendTestFlare()}
                            title={Strings.dev.sendTestFlare}
                        />
                    }
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const contactsLabel =
        state.user.crews && state.user.crews.length ?
            Strings.home.contactsButtonLabelEdit :
            Strings.home.contactsButtonLabelAdd;

    return {
        activatingFlareState: state.user.activatingFlareState,
        claimingDevice: state.user.claimingDevice,
        claimingDeviceFailure: state.user.claimingDeviceFailure,
        contactsLabel,
        crewEventNotificationMessage: state.user.settings.promptMessage,
        crewEvents: state.user.crewEvents,
        crewEventTimeline: state.user.crewEventTimeline,
        crewEventTimelineState: state.user.crewEventTimelineState,
        crews: state.user.crews,
        devices: state.user.devices,
        hardware: state.hardware,
        hasActiveFlare: state.user.hasActiveFlare,
        latestBeacon: state.beacons.latest,
        permissions: state.user.permissions,
        problemBeacons: state.beacons.problems,
        token: state.user.token,
    };
}

export default connect(mapStateToProps)(Home);
