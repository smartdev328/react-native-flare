import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import RadialGradient from 'react-native-radial-gradient';
import moment from 'moment';
import { connect } from 'react-redux';

import Button from '../bits/Button';
import Colors from '../bits/Colors';
import DeviceSelector from '../bits/DeviceSelector';
import FlavorStripe from '../bits/FlavorStripe';
import PermissionsManager from '../bits/PermissionsManager';
import Strings from '../locales/en';
import Spacing from '../bits/Spacing';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.purple,
    },
    containerWithActiveFlare: {
        backgroundColor: Colors.theme.pink,
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
        backgroundColor: Colors.theme.purple,
    },
});

class Home extends React.Component {
    // componentDidMount() {
    //     // this.checkPermissions();
    //     // this.checkAuth();
    //     // BackgroundTimer.runBackgroundTimer(() => { 
    //     //     this.checkAuth();
    //     // }, 300000);
    //     // this.props.screenProps.checkForActiveFlare();
    // }

    // componentWillUnmount() {
    //     // BackgroundTimer.stopBackgroundTimer();
    // }

    // async checkPermissions() {
    //     PermissionsManager.checkLocationPermissions();
    // }

    // async checkAuth() {
    //     // this.props.screenProps.flareAPI.ping()
    //     //     .then(response => console.debug(response))
    //     //     .catch((status) => {
    //     //         if (status === 401 || status === 403) {
    //     //             this.props.navigation.navigate('SignIn');
    //     //         }
    //     //     });
    // }

    handleCancelClick() {
        // this.props.navigation.navigate('PinCheck');
        console.debug('click cancel');
    }

    handleContactsClick() {
        // const nextScreen = this.props.screenProps.crews.length ? 'EditContacts' : 'AddContacts';
        // console.log(`Navigate to screen ${nextScreen}`);
        // this.props.navigation.navigate(nextScreen);
        console.debug('click contacts');
    }

    render() {
        const containerStyles = [styles.container];
        if (this.props.hasActiveFlare) {
            containerStyles.push(styles.containerWithActiveFlare);
        }

        return (
            <View style={containerStyles}>
                <FlavorStripe />
                <RadialGradient
                    style={styles.backgroundGradient}
                    colors={[Colors.theme.orangeDark, Colors.theme.purple]}
                    radius={300}
                />
                {/* {!this.state.hasActiveFlare && */}
                {true &&
                    <View style={styles.deviceSelector}>
                        <DeviceSelector
                            addDevice={(deviceID) => {
                                console.log('Should add device here');
                                // this.props.screenProps.flareAPI.addDevice(deviceID);
                            }}
                            devices={this.props.devices}
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
                            onPress={() => this.handleCancelClick()}
                            title={Strings.home.cancelActiveFlare}
                        />
                    </View>
                }
                <View style={styles.footer}>
                    <Button
                        whiteOutline
                        fullWidth
                        onPress={() => this.handleContactsClick()}
                        title={this.props.contactsLabel}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const hasActiveFlare = false;
    const hasTimestamp = false;
    const lastBeaconTimeHeading = Strings.beacons.notYetReceived;
    const contactsLabel = Strings.home.contactsButtonLabelAdd;

    //     // const hasTimestamp = screenProps && screenProps.lastBeacon && screenProps.lastBeacon.timestamp;
    //     // const lastBeaconTimeHeading = hasTimestamp ? 
    //     //     Strings.beacons.lastReceived : Strings.beacons.notYetReceived;

    //     // const contactsLabel = 
    //     //     screenProps.crews.length ? 
    //     //         Strings.home.contactsButtonLabelEdit :
    //     //         Strings.home.contactsButtonLabelAdd;

    return {
        devices: state.user.devices,
        lastBeaconTimeHeading,
        hasTimestamp,
        contactsLabel,
        hasActiveFlare,
    };
}

export default connect(mapStateToProps)(Home);
