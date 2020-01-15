/* global __DEV__ */
/* eslint global-require: "off" */
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import { Navigation } from 'react-native-navigation';
import { PERMISSIONS } from 'react-native-permissions';
import {
    ACCOUNT_SYNC_INTERVAL,
    ACCOUNT_SYNC_INTERVAL_FLARE,
    ACCOUNT_SYNC_INTERVAL_DEV,
    FLARE_TIMELINE_REFRESH_INTERVAL,
} from '../constants/Config';

import { syncAccountDetails, changeAppRoot } from '../actions/index';
import {
    processQueuedBeacons,
    cancelActiveFlare,
} from '../actions/beaconActions';
import { getCrewEventTimeline, getPermission } from '../actions/userActions';
import { startBleListening } from '../actions/hardwareActions';
import Aura from '../bits/Aura';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import CrewEventTimeline from '../bits/CrewEventTimeline';
import getCurrentPosition from '../helpers/location';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.peach,
    },
    header: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        paddingTop: Spacing.small,
        paddingBottom: Spacing.medium,
    },
    headerText: {
        marginTop: Spacing.small,
        marginBottom: Spacing.medium,
        fontSize: Type.size.medium,
        fontWeight: 'bold',
        color: Colors.white,
    },
    logo: {
        resizeMode: 'contain',
        height: 48,
        width: 120,
    },
    crewTimelineContainer: {
        flex: 18,
        flexGrow: 5,
        flexBasis: 1,
        backgroundColor: Colors.theme.cream,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: Spacing.small,
    },
    devOnlyButtons: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: Spacing.medium,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

class HomeActive extends React.Component {
    constructor(props) {
        super(props);

        this.shuttingDown = false;
        this.setSyncTiming();
        Navigation.events().bindComponent(this);

        this.eventTimelineRefreshTimer = null;
        if (props.hasActiveFlare) {
            this.eventTimelineRefreshTimer = setInterval(
                () => this.refreshTimeline(),
                FLARE_TIMELINE_REFRESH_INTERVAL
            );
        }
        this.state = {
            showSideMenu: false,
        };
    }

    componentDidMount() {
        // We will boot into this screen if the user closed the app with an active flare.
        // It's possible for users to cancel their flares using other devices. If we
        // show up on this screen and the user no longer has an active flare, go back to
        // inactive home screen.
        if (!this.props.hasActiveFlare) {
            this.props.dispatch(changeAppRoot('secure'));
        }

        if (!this.props.permissions.location) {
            this.props.dispatch(getPermission(PERMISSIONS.IOS.LOCATION_ALWAYS));
        }

        if (!this.props.hardware || !this.props.hardware.bleListening) {
            this.props.dispatch(startBleListening());
        }

        // Users may have modified their accounts on other devices or on the web. Keep this device
        // in sync by fetching server-stored data.
        this.props.dispatch(
            syncAccountDetails({
                analyticsToken: this.props.analyticsToken,
            })
        );

        // Periodically fetch account status to ensure auth and to observe account changes from other devices.
        if (this.eventTimelineRefreshTimer) {
            clearInterval(this.eventTimelineRefreshTimer);
            this.eventTimelineRefreshTimer = null;
        }
        BackgroundTimer.stopBackgroundTimer();
        BackgroundTimer.runBackgroundTimer(
            () => this.syncAccount(),
            this.accountSyncTimeInMs
        );

        // If the current user has an active flare, fetch the crew timeline
        // and show it
        this.startTimelineRefreshInterval();
    }

    componentDidUpdate(prevProps) {
        /**
         * Handle transitions from active to inactive flare
         */
        if (
            this.props.hasActiveFlare !== prevProps.hasActiveFlare &&
            !this.props.hasActiveFlare
        ) {
            BackgroundTimer.stop();
            BackgroundTimer.stopBackgroundTimer();
            this.props.dispatch(changeAppRoot('secure'));
        }
    }

    componentWillUnmount() {
        this.shuttingDown = true;
        BackgroundTimer.stopBackgroundTimer();
        clearInterval(this.eventTimelineRefreshTimer);
        this.eventTimelineRefreshTimer = null;
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
                name: 'com.flarejewelry.app.HomeActive',
            },
        });
    };

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
        getCurrentPosition({
            enableHighAccuracy: true,
            timeout: ACCOUNT_SYNC_INTERVAL,
        }).then(position => {
            this.props.dispatch(
                syncAccountDetails({
                    analyticsToken: this.props.analyticsToken,
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
                })
            );
        });

        // Process any beacon events that we tried (and failed) to submit earlier.
        if (this.props.problemBeacons && this.props.problemBeacons.length > 0) {
            this.props.dispatch(
                processQueuedBeacons(
                    this.props.handleBeacon,
                    this.props.authToken,
                    this.props.problemBeacons
                )
            );
        }
    }

    refreshTimeline = () => {
        this.props.dispatch(getCrewEventTimeline(this.props.authToken));
    };

    cancelFlare = () => {
        this.props.dispatch(cancelActiveFlare(this.props.authToken));
    };

    startTimelineRefreshInterval() {
        if (this.eventTimelineRefreshTimer !== null) {
            console.log(
                'Already started timeline refresh; not starting it again.'
            );
            return;
        }
        this.refreshTimeline();
        this.eventTimelineRefreshTimer = setInterval(
            () => this.refreshTimeline(),
            FLARE_TIMELINE_REFRESH_INTERVAL
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Aura source="aura-5" />
                <View style={styles.header}>
                    <Image source={{ uri: 'logo-aura' }} style={styles.logo} />
                    <Text style={styles.headerText}>
                        {Strings.crewEventTimeline.title}
                    </Text>
                </View>
                <CrewEventTimeline
                    timeline={this.props.crewEventTimeline}
                    onRefresh={this.refreshTimeline}
                    containerStyle={styles.crewTimelineContainer}
                />
                <View style={styles.footer}>
                    <Button
                        dark
                        primary
                        onPress={this.cancelFlare}
                        title={Strings.home.cancelActiveFlare}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        activatingFlareState: state.user.activatingFlareState,
        claimingDevice: state.user.claimingDevice,
        claimingDeviceFailure: state.user.claimingDeviceFailure,
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
        analyticsToken: state.user.analyticsToken,
        authToken: state.user.authToken,
        radioToken: state.user.radioToken,
    };
}

export default connect(mapStateToProps)(HomeActive);
