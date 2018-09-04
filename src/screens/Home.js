import React from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import moment from 'moment';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';

import { claimDevice, syncAccountDetails, fetchContacts } from '../actions/index';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import DeviceSelector from '../bits/DeviceSelector';
import FlavorStripe from '../bits/FlavorStripe';
import Strings from '../locales/en';
import Spacing from '../bits/Spacing';

import { checkPermissions } from '../actions/userActions';
import Location from '../helpers/location';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.blueDark,
    },
    containerWithActiveFlare: {
        backgroundColor: Colors.theme.red,
    },
    backgroundGradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7,
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
        height: Spacing.huge,
        marginTop: 90,
        padding: Spacing.medium,
        flex: 1,
        flexDirection: 'row',
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
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        // Fetch account details and submit app status periodically
        this.accountSyncTimeInMs = 600000; // 60 s/min * 10 min * 1000 ms/s = 600000
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
            navBarCustomViewInitialProps: {navigator: this.props.navigator},
            navBarBackgroundColor: Colors.theme.blueDark,
            navBarComponentAlignment: 'fill',
        });
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

        if (prevProps.permissions.contacts === false && this.props.permissions.contacts) {
            this.props.dispatch(fetchContacts());
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
            navigatorStyle: {
                navBarBackgroundColor: Colors.theme.blueDark,
                navBarTextColor: Colors.white,
                navBarButtonColor: Colors.white,
            },
        });
    }

    handleContactsClick() {
        this.props.navigator.push({
            screen: 'AddContacts',
            title: Strings.contacts.add.title,
            navigatorStyle: {
                navBarBackgroundColor: Colors.theme.blueDark,
                navBarTextColor: Colors.white,
                navBarButtonColor: Colors.white,
            },
        });
    }

    render() {
        const containerStyles = [styles.container];
        if (this.props.hasActiveFlare) {
            containerStyles.push(styles.containerWithActiveFlare);
        }

        return (
            <View style={containerStyles}>
                <RadialGradient
                    style={styles.backgroundGradient}
                    colors={[Colors.theme.blue, Colors.theme.blueDark]}
                    radius={300}
                />
                {this.props.hardware && this.props.hardware.bluetooth !== 'on' &&
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
                    <View style={styles.cancelButtonArea}>
                        <Button
                            fullWidth
                            onPress={() => this.showPinCheckScreen()}
                            title={Strings.home.cancelActiveFlare}
                        />
                    </View>
                }
                <View style={styles.footer}>
                    {!this.props.hasActiveFlare &&
                        <Button
                            whiteOutline
                            fullWidth
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
        token: state.user.token,
        devices: state.user.devices,
        crews: state.user.crews,
        claimingDevice: state.user.claimingDevice,
        claimingDeviceFailure: state.user.claimingDeviceFailure,
        latestBeacon: state.beacons.latest,
        lastBeaconTimeHeading: state.beacons.latest ? Strings.home.lastBeacon.present : Strings.home.lastBeacon.absent,
        contactsLabel,
        hasActiveFlare: state.user.hasActiveFlare,
        activatingFlareState: state.user.activatingFlareState,
        permissions: state.user.permissions,
        hardware: state.hardware,
    };
}

export default connect(mapStateToProps)(Home);
