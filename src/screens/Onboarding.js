import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Onboarding from 'react-native-onboarding-swiper';

import { BeaconTypes } from '../bits/BleConstants';
import { changeAppRoot } from '../actions';
import { claimDevice } from '../actions/deviceActions';
import { getPermission, setCancelPIN, setOnboardingComplete } from '../actions/userActions';
import getBluetoothPage from './onboarding/Bluetooth';
import getLocationPage from './onboarding/Location';
import getLongPressPage from './onboarding/LongPress';
import getLongPressCancelPage from './onboarding/LongPressCancel';
import getContactsPage from './onboarding/Contacts';
import getWelcomePage from './onboarding/Welcome';
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
            lastPinSet: null,
        };
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

    chooseCrew() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Contacts',
            },
        });
    }

    endOnboarding() {
        this.props.dispatch(setOnboardingComplete(this.props.authToken));
        this.props.dispatch(changeAppRoot('secure'));
    }

    skipOnboarding() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Confirm',
                passProps: {
                    cancelLabel: Strings.generic.cancel,
                    confirmLabel: Strings.generic.confirm,
                    onConfirm: () => this.endOnboarding(),
                    prompt: Strings.onboarding.skipConfirmPrompt,
                },
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
        const locationPage = getLocationPage({
            permissions: this.props.permissions,
            requestLocationPermission: () => this.requestLocationPermission(),
        });

        /**
         * The bluetooth page has many internal states. Unfortunately, the onboarding
         * library operates on an array of objects instead of JSX elements. That means
         * we pass this higher order component's props and state into the complex page
         * so that it can change dynamically without making this component messy. To
         * improve rendering performance, consider deriving state and passing that
         * (conditionally) to the generator function instead.
         */
        const bluetoothPage = getBluetoothPage({
            bluetoothEnabled: this.props.bluetoothEnabled,
            claimingDevice: this.props.claimingDevice,
            chosenDeviceID: this.state.chosenDeviceID,
            secondFactor: this.state.secondFactor,
            multipleDevicesBroadcasting: this.state.multipleDevicesBroadcasting,
            highestPressCount: this.state.highestPressCount,
            deviceHasBeenClaimed: this.props.claimedDevice && this.props.claimedDevice === this.state.chosenDeviceID,
            changeTwoFactorText: e => this.changeTwoFactorText(e),
            claimDevice: () => this.claimDevice(),
            chooseThisDevice: id => this.chooseThisDevice(id),
        });

        /**
         * The long press page has a few internal states too.
         */
        const longPressPage = getLongPressPage({
            bluetoothEnabled: this.props.bluetoothEnabled,
            receivedLongPress: this.state.receivedLongPress,
        });

        const longPressCancelPage = getLongPressCancelPage({
            hasSetPin: this.state.hasSetPin,
            pin: this.state.cancelPIN,
            changeCancelPIN: e => this.changeCancelPIN(e),
            setCancelPIN: () => this.setCancelPIN(),
        });

        const contactsPage = getContactsPage({
            crews: this.props.crews,
            hasContactsPermission: this.props.permissions.contacts,
            requestContactsPermission: () => this.requestContactsPermission(),
            chooseCrew: () => this.chooseCrew(),
            endOnboarding: () => this.endOnboarding(),
        });

        /**
         * The following pages don't have dynamic states.
         */
        const welcomePage = getWelcomePage();

        return (
            <KeyboardAvoidingView style={styles.container}>
                <Onboarding
                    containerStyles={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    givePage
                    showSkip={false}
                    showBack
                    showDone={false}
                    onSkip={() => this.skipOnboarding()}
                    pages={[welcomePage, locationPage, bluetoothPage, longPressPage, longPressCancelPage, contactsPage]}
                />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        authToken: state.user.authToken,
        permissions: state.user.permissions,
        bluetoothEnabled: state.hardware.bluetooth === 'on',
        shortPressCounts: state.beacons.recentShortPressCounts,
        claimingDevice: state.user.claimingDevice,
        claimedDevice: state.user.claimedDevice,
        latestBeacon: state.beacons.latest,
        lastPinSet: state.user.pinUpdateTime,
        updatedPIN: state.user.updatedPIN,
        updatingPIN: state.user.updatingPIN,
        crews: state.user.crews,
    };
}

export default connect(mapStateToProps)(OnboardingMain);
