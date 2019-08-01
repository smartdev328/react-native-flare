import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Onboarding from 'react-native-onboarding-swiper';

import { BeaconTypes } from '../bits/BleConstants';
import { claimDevice } from '../actions/deviceActions';
import { getPermission, setCancelPIN, setOnboardingComplete } from '../actions/userActions';
import { startBleListening } from '../actions/hardwareActions';
import BlueToothPage from './onboarding/Bluetooth';
import LocationPage from './onboarding/Location';
import LongPressPage from './onboarding/LongPress';
import LongPressCancelPage from './onboarding/LongPressCancel';
import ContactsPage from './onboarding/Contacts';
import WelcomePage from './onboarding/Welcome';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subtitleArea: {
        paddingHorizontal: 10,
    },
    subtitleText: {
        marginBottom: Spacing.large,
    },
    foundJewelryIntro: {
        textAlign: 'center',
    },
    foundJewelryID: {
        margin: Spacing.large,
        fontSize: Type.size.medium,
        textAlign: 'center',
    },
});

class OnboardingMain extends React.Component {
    static options() {
        return {
            topBar: {
                visible: false,
                animate: false,
                leftButtons: [],
            },
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { shortPressCounts } = props;
        const { highestPressCount, multipleDevicesBroadcasting } = state;
        const newHighestPressCount = (shortPressCounts && shortPressCounts.length > 0 && shortPressCounts[0]) || {};

        const newMultipleBroadcasting = shortPressCounts && shortPressCounts.length > 1;
        const multipleBroadcastChanged = multipleDevicesBroadcasting !== newMultipleBroadcasting;
        const highestPressCountChanged =
            newHighestPressCount.deviceID !== highestPressCount.deviceID ||
            newHighestPressCount.count !== highestPressCount.count;

        // Only change state flag once after receiving a long press
        const receivedLongPress =
            state.receivedLongPress || (props.latestBeacon && props.latestBeacon.type === BeaconTypes.Long.name);

        if (multipleBroadcastChanged || highestPressCountChanged || props.updatedPIN !== state.hasSetPin) {
            return {
                highestPressCount: newHighestPressCount,
                multipleDevicesBroadcasting,
                receivedLongPress,
                hasSetPin: props.updatedPIN,
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            highestPressCount: {},
            multipleDevicesBroadcasting: false,
            chosenDeviceID: null,
            secondFactor: '',
            cancelPIN: '',
            hasSetPin: props.hasSetPin,
        };
    }

    componentDidUpdate(prevProps) {
        // Go to next screen after user gives location permission
        if (
            this.props.permissions &&
            this.props.permissions.location &&
            this.props.permissions.location !== prevProps.permissions.location &&
            this.flatList
        ) {
            this.props.dispatch(startBleListening());
            this.flatList.goNext();
        }

        // End onboarding if user gave contacts permission
        if (
            this.props.permissions &&
            this.props.permissions.contacts &&
            this.props.permissions.contacts !== prevProps.permissions.contacts
        ) {
            this.endOnboarding();
        }
    }

    setCancelPIN() {
        this.props.dispatch(setCancelPIN(this.props.authToken, this.state.cancelPIN));
    }

    changeCancelPIN(val) {
        this.setState({
            cancelPIN: val,
        });
    }

    claimDevice() {
        this.props.dispatch(claimDevice(this.props.authToken, this.state.chosenDeviceID, this.state.secondFactor));
    }

    changeTwoFactorText(val) {
        this.setState({
            secondFactor: val,
        });
    }

    chooseThisDevice(deviceID) {
        this.setState({
            chosenDeviceID: deviceID,
        });
    }

    endOnboarding() {
        this.props.dispatch(setOnboardingComplete(this.props.authToken));
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Contacts',
                options: {
                    topBar: {
                        visible: false,
                    },
                },
                passProps: {
                    fromOnboarding: true,
                },
            },
        });
    }

    skipOnboarding() {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'com.flarejewelry.app.Confirm',
                            passProps: {
                                cancelLabel: Strings.generic.cancel,
                                confirmLabel: Strings.generic.confirm,
                                onConfirm: () => this.endOnboarding(),
                                prompt: Strings.onboarding.skipConfirmPrompt,
                            },
                        },
                    },
                ],
            },
        });
    }

    requestLocationPermission() {
        this.props.dispatch(getPermission('location', { type: 'always' }));
    }

    requestContactsPermission() {
        this.props.dispatch(getPermission('contacts'));
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.onboarding.main',
            },
        });
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Onboarding
                    ref={(ref) => {
                        this.flatList = ref;
                    }}
                    containerStyles={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    givePage
                    showSkip={false}
                    showBack
                    showDone={false}
                    onSkip={() => this.skipOnboarding()}
                    pages={[
                        <WelcomePage />,
                        <LocationPage
                            permissions={this.props.permissions}
                            requestLocationPermission={() => this.requestLocationPermission()}
                        />,
                        <BlueToothPage
                            bluetoothEnabled={this.props.bluetoothEnabled}
                            highestPressCount={this.state.highestPressCount}
                            ownedDevices={this.props.devices.map(d => d.id)}
                        />,
                        <LongPressPage
                            bluetoothEnabled={this.props.bluetoothEnabled}
                            receivedLongPress={this.state.receivedLongPress}
                        />,
                        <LongPressCancelPage
                            hasSetPin={this.state.hasSetPin}
                            pin={this.state.cancelPIN}
                            changeCancelPIN={e => this.changeCancelPIN(e)}
                            setCancelPIN={() => this.setCancelPIN()}
                        />,
                        <ContactsPage
                            crews={this.props.crews}
                            hasContactsPermission={this.props.permissions.contacts}
                            requestContactsPermission={() => this.requestContactsPermission()}
                            chooseCrew={() => this.chooseCrew()}
                            endOnboarding={() => this.endOnboarding()}
                        />,
                    ]}
                />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        authToken: state.user.authToken,
        bluetoothEnabled: state.hardware.bluetooth === 'on',
        claimedDevice: state.user.claimedDevice,
        claimingDevice: state.user.claimingDevice,
        crews: state.user.crews,
        devices: state.user.devices || [],
        latestBeacon: state.beacons.latest,
        permissions: state.user.permissions,
        radioToken: state.user.radioToken,
        shortPressCounts: state.beacons.recentShortPressCounts,
        updatedPIN: state.user.updatedPIN,
        updatingPIN: state.user.updatingPIN,
    };
}

export default connect(mapStateToProps)(OnboardingMain);
