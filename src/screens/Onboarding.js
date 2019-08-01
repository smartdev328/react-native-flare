import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Onboarding from 'react-native-onboarding-swiper';

import { BeaconTypes } from '../bits/BleConstants';
import { getPermission, setCancelPIN, setOnboardingComplete } from '../actions/userActions';
import { startBleListening } from '../actions/hardwareActions';
import getBluetoothPage from './onboarding/Bluetooth';
import getLocationPage from './onboarding/Location';
import getLongPressPage from './onboarding/LongPress';
import getLongPressCancelPage from './onboarding/LongPressCancel';
import getContactsPage from './onboarding/Contacts';
import getNotificationsPage from './onboarding/Notifications';
import getWelcomePage from './onboarding/Welcome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
            cancelPIN: '',
            hasSetPin: props.hasSetPin,
        };
    }

    componentDidUpdate(prevProps) {
        const LOCATION_PAGE_INDEX = 1;
        const BLUETOOTH_PAGE_INDEX = 2;
        const NOTIFICATION_PAGE_INDEX = 4;

        // Go to next screen after user gives location permission
        if (
            this.flatList &&
            this.flatList.state.currentPage === LOCATION_PAGE_INDEX &&
            this.props.permissions &&
            this.props.permissions.location &&
            this.props.permissions.location !== prevProps.permissions.location
        ) {
            this.props.dispatch(startBleListening());
            this.flatList.goNext();
        }

        // Go to next screen after user activates flare
        if (
            this.flatList &&
            this.flatList.state.currentPage === BLUETOOTH_PAGE_INDEX &&
            this.props.latestBeacon &&
            JSON.stringify(this.props.latestBeacon) !== JSON.stringify(prevProps.latestBeacon) &&
            this.props.latestBeacon.type === BeaconTypes.Long.name
        ) {
            const found = this.props.devices.filter(d => d.id === this.props.latestBeacon.deviceID);
            if (found.length === 1) {
                this.flatList.goNext();
            }
        }

        // Go to next screen after user gives notification permission
        if (
            this.flatList &&
            this.flatList.state.currentPage === NOTIFICATION_PAGE_INDEX &&
            this.props.permissions &&
            this.props.permissions.notification &&
            this.props.permissions.notification !== prevProps.permissions.notification
        ) {
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

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.onboarding.main',
            },
        });
    };

    render() {
        /**
         * Onboarding screens change dynamically with user and app state. The onboarding
         * library we're using has a fixed page object format. These page "get" functions
         * that we call below are a lot like JSX rendered pages; many are pure functions
         * that simply render content based on state. For example, the welcome page is
         * very simple and static.
         */
        const welcomePage = getWelcomePage();

        /**
         * The following pages have internal state and interact with the main onboarding
         * flow through their "props."
         */
        const locationPage = getLocationPage({
            permissions: this.props.permissions,
            requestLocationPermission: () => this.props.dispatch(getPermission('location', { type: 'always' })),
        });

        const bluetoothPage = getBluetoothPage({
            bluetoothEnabled: this.props.bluetoothEnabled,
            highestPressCount: this.state.highestPressCount,
            ownedDevices: this.props.devices.map(d => d.id),
        });

        const longPressPage = getLongPressPage({
            bluetoothEnabled: this.props.bluetoothEnabled,
            receivedLongPress: this.state.receivedLongPress,
        });

        const notificationsPage = getNotificationsPage({
            requestNotificationsPermission: () => this.props.dispatch(getPermission('notification')),
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
            requestContactsPermission: () => this.props.dispatch(getPermission('contacts')),
            chooseCrew: () => this.chooseCrew(),
            endOnboarding: () => this.endOnboarding(),
        });

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
                    /* Page order matters. @see lifecycle methods related to dynamic page switching */
                    pages={[
                        welcomePage,
                        locationPage,
                        bluetoothPage,
                        longPressPage,
                        notificationsPage,
                        longPressCancelPage,
                        contactsPage,
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
