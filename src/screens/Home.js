import React from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import moment from 'moment';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';

import { claimDevice, fetchAccountDetails, fetchContacts } from '../actions/index';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import DeviceSelector from '../bits/DeviceSelector';
import FlavorStripe from '../bits/FlavorStripe';
import Strings from '../locales/en';
import Spacing from '../bits/Spacing';
import { checkPermissions } from '../actions/userActions';

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
    // eslint-disable-next-line
    componentWillMount() {
        // Users may have modified their accounts on other devices or on the web. Keep this device
        // in sync by fetching server-stored data.
        this.props.dispatch(fetchAccountDetails(this.props.token));

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
            console.log('gonna fetch contacts 1');
            this.props.dispatch(fetchContacts());
        }

        // Periodically fetch account status to ensure auth and to observe account changes from
        // other devices.
        BackgroundTimer.runBackgroundTimer(() => {
            if (this.props.user && this.props.user.permissions && this.props.user.permissions.contacts) {
                this.props.dispatch(fetchAccountDetails(this.props.token));
            }
        }, 300000);
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
            console.log('gonna fetch contacts 2');
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
                            <Text style={styles.centered}>
                                {this.props.lastBeaconTimeHeading}
                            </Text>
                            {this.props.hasTimestamp &&
                                <Text style={[styles.centered, styles.dimmed]}>
                                    {moment(this.props.hasTimestamp).toLocaleString()}
                                </Text>
                            }
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
    const hasTimestamp = false;
    const lastBeaconTimeHeading = Strings.beacons.notYetReceived;
    const contactsLabel =
        state.user.crews && state.user.crews.length ?
            Strings.home.contactsButtonLabelEdit :
            Strings.home.contactsButtonLabelAdd;

    //     // const hasTimestamp = screenProps && screenProps.lastBeacon && screenProps.lastBeacon.timestamp;
    //     // const lastBeaconTimeHeading = hasTimestamp ?
    //     //     Strings.beacons.lastReceived : Strings.beacons.notYetReceived;
    return {
        token: state.user.token,
        devices: state.user.devices,
        crews: state.user.crews,
        claimingDevice: state.user.claimingDevice,
        claimingDeviceFailure: state.user.claimingDeviceFailure,
        lastBeaconTimeHeading,
        hasTimestamp,
        contactsLabel,
        hasActiveFlare: state.user.hasActiveFlare,
        activatingFlareState: state.user.activatingFlareState,
        permissions: state.user.permissions,
        hardware: state.hardware,
    };
}

export default connect(mapStateToProps)(Home);
