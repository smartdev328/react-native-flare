import React from 'react';
import { AppState, Image, StyleSheet, Text, View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import moment from 'moment';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';

import { ACCOUNT_SYNC_INTERVAL } from '../constants';
import { claimDevice, syncAccountDetails, fetchContacts } from '../actions/index';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import DeviceSelector from '../bits/DeviceSelector';
import Strings from '../locales/en';
import Spacing from '../bits/Spacing';

import { checkPermissions, getCrewEventTimeline } from '../actions/userActions';
import Location from '../helpers/location';
import CrewEventTimeline from '../bits/CrewEventTimeline';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.blueDark,
        paddingBottom: Spacing.small,
    },
    containerWithActiveFlare: {
        backgroundColor: Colors.theme.cream,
    },
    footer: {
        width: '100%',
        maxHeight: 2 * Spacing.huge,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 16,
    },
    centered: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.white,
    },
    deviceSelector: {
        marginTop: 90,
        flex: 3,
    },
    cancelButtonArea: {
        width: '100%',
        marginBottom: Spacing.small,
        justifyContent: 'center',
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
    backgroundSplatTop: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 300,
    },
    backgroundSplatBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 256,
    },
    backgroundStar: {
        position: 'absolute',
        top: 90,
        left: Spacing.huge,
        width: 48,
        height: 48,
    },
    backgroundFlower: {
        position: 'absolute',
        top: 80,
        right: Spacing.small,
        width: 96,
        height: 96,
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        // Fetch account details and submit app status periodically
        this.accountSyncTimeInMs = ACCOUNT_SYNC_INTERVAL; // 60 s/min * 10 min * 1000 ms/s = 600000
        this.eventTimelineRefreshTimer = null;
    }

    // eslint-disable-next-line
    componentWillMount() {
        // Users may have modified their accounts on other devices or on the web. Keep this device
        // in sync by fetching server-stored data.
        this.props.dispatch(syncAccountDetails({
            token: this.props.token,
        }));

        this.props.navigator.setStyle({
            navBarCustomView: 'com.flarejewelry.FlareNavBar',
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator,
                hasActiveFlare: this.props.hasActiveFlare,
            },
            navBarComponentAlignment: 'fill',
        });

        if (this.eventTimelineRefreshTimer) {
            clearInterval(this.eventTimelineRefreshTimer);
            this.eventTimelineRefreshTimer = null;
        }
    }

    componentDidMount() {
        // Check permissions just in case they've changed
        this.props.dispatch(checkPermissions());

        // Contacts are not stored on the server. It takes a while to fetch them locally, so we
        // start that process now before users need to view them.
        if (this.props.permissions.contacts) {
            this.props.dispatch(fetchContacts());
        }

        // Periodically fetch account status to ensure auth and to observe account changes from
        // other devices.
        BackgroundTimer.runBackgroundTimer(() => {
            Location.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
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
        }, this.accountSyncTimeInMs);
        AppState.addEventListener('change', this.handleAppStateChange);

        // If the current user has an active flare, fetch the crew timeline
        // and show it
        if (this.props.hasActiveFlare) {
            this.startTimelineRefreshInterval();
        }

        this.props.navigator.setStyle({
            navBarCustomViewInitialProps: {
                hasActiveFlare: this.props.hasActiveFlare,
            },
        });
    }

    componentWillUnmount() {
        BackgroundTimer.stopBackgroundTimer();
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activatingFlareState !== this.props.activatingFlareState &&
            this.props.activatingFlareState === 'request') {
            this.props.notificationManager.localNotify({
                message: Strings.notifications.events.flare.defaultMessage,
            });
        }

        if (this.props.hasActiveFlare) {
            this.startTimelineRefreshInterval();
        }

        this.props.navigator.setStyle({
            hasActiveFlare: this.props.hasActiveFlare,
        });

        if (prevProps.permissions.contacts === false && this.props.permissions.contacts) {
            this.props.dispatch(fetchContacts());
        }
    }

    startTimelineRefreshInterval() {
        if (this.eventTimelineRefreshTimer !== null) {
            return;
        }
        // kick off the first request
        this.props.dispatch(getCrewEventTimeline(this.props.token, this.props.crewEvents[0].id));

        // schedule subsequent requests
        if (this.props.crewEvents && this.props.crewEvents.length > 0) {
            this.eventTimelineRefreshTimer = setInterval(() => {
                this.props.dispatch(getCrewEventTimeline(this.props.token, this.props.crewEvents[0].id));
            }, 10000);
        }
    }

    handleAppStateChange = (nextAppState) => {
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
        this.props.navigator.push({
            screen: 'PinCheck',
            title: Strings.pin.title,
        });
    }

    handleContactsClick() {
        this.props.navigator.push({
            screen: 'AddContacts',
            title: Strings.contacts.add.title,
            navigatorStyle: {
                navBarBackgroundColor: Colors.white,
                navBarTextColor: Colors.theme.purple,
                navBarButtonColor: Colors.theme.purple,
            },
        });
    }

    onRefreshTimeline() {
        this.props.dispatch(getCrewEventTimeline(this.props.token, this.props.crewEvents[0].id));
    }

    render() {
        const containerStyles = [styles.container];
        if (this.props.hasActiveFlare) {
            containerStyles.push(styles.containerWithActiveFlare);
        }

        return (
            <View style={containerStyles}>
                <Image
                    source={require('../assets/bg-splat-green.png')}
                    style={styles.backgroundSplatTop}
                />
                <Image
                    source={require('../assets/bg-splat-pink.png')}
                    style={styles.backgroundSplatBottom}
                />
                <Image
                    source={require('../assets/home-star.png')}
                    style={styles.backgroundStar}
                />
                <Image
                    source={require('../assets/home-flower-purple.png')}
                    style={styles.backgroundFlower}
                />
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
                            <View>
                                <Text style={styles.centered}>
                                    {this.props.lastBeaconTimeHeading}
                                </Text>
                                {this.props.latestBeacon &&
                                    <Text style={[styles.centered, styles.dimmed]}>
                                        {moment(this.props.latestBeacon.timestamp).toLocaleString()}
                                    </Text>
                                }
                            </View>
                        </DeviceSelector>
                    </View>
                }
                {this.props.hasActiveFlare &&
                    <View>
                        <Text style={styles.timelineHeader}>
                            {Strings.crewEventTimeline.title}
                        </Text>
                        <CrewEventTimeline
                            timeline={this.props.crewEventTimeline}
                            onRefresh={() => this.onRefreshTimeline()}
                        />
                        <View style={styles.cancelButtonArea}>
                            <Button
                                fullWidth
                                onPress={() => this.showPinCheckScreen()}
                                title={Strings.home.cancelActiveFlare}
                            />
                        </View>
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
        crewEvents: state.user.crewEvents,
        crewEventTimeline: state.user.crewEventTimeline,
        crewEventTimelineState: state.user.crewEventTimelineState,
        crews: state.user.crews,
        devices: state.user.devices,
        hardware: state.hardware,
        hasActiveFlare: state.user.hasActiveFlare,
        lastBeaconTimeHeading: state.beacons.latest ? Strings.home.lastBeacon.present : Strings.home.lastBeacon.absent,
        latestBeacon: state.beacons.latest,
        permissions: state.user.permissions,
        token: state.user.token,
    };
}

export default connect(mapStateToProps)(Home);
