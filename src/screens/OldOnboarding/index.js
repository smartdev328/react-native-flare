import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Onboarding from 'react-native-onboarding-swiper';
import RNBluetoothInfo from '@bitfly/react-native-bluetooth-info';

import { BeaconTypes } from '../../bits/BleConstants';
import {
    getPermission,
    setCancelPIN,
    setOnboardingComplete,
    checkLocationsPermission,
    getNotificationsPermission,
} from '../../actions/userActions';
import { changeAppRoot } from '../../actions/navActions';
import { startBleListening } from '../../actions/hardwareActions';
import { LONG_PRESS_CANCEL_PIN_LENGTH } from '../../constants/Config';
import getShortPressPage from './ShortPress';
import getLocationPage from './Location';
import getLongPressPage from './LongPress';
import getFlareExamplePage from './FlareExample';
import getLongPressCancelPage from './LongPressCancel';
import getContactsPage from './Contacts';
import getNotificationsPage from './Notifications';
import getWelcomePage from './Welcome';
import Strings from '../../locales/en';

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
        // Only change state flag once after receiving a short press
        const receivedShortPress =
            state.receivedShortPress ||
            (props.latestBeacon &&
                props.latestBeacon.type === BeaconTypes.Short.name &&
                props.devices &&
                props.devices.filter(d => d.id === props.latestBeacon.deviceID)
                    .length > 0);

        // Only change state flag once after receiving a long press
        const receivedLongPress =
            state.receivedLongPress ||
            (props.latestBeacon &&
                props.latestBeacon.type === BeaconTypes.Long.name &&
                props.devices &&
                props.devices.filter(d => d.id === props.latestBeacon.deviceID)
                    .length > 0);

        if (
            state.receivedLongPress !== receivedLongPress ||
            state.receivedShortPress !== receivedShortPress ||
            props.updatedPIN !== state.hasSetPin
        ) {
            return {
                receivedLongPress,
                receivedShortPress,
                hasSetPin: props.updatedPIN,
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.permissionCheckInterval = setInterval(
            () => this.checkPermissions(),
            15000
        );

        this.state = {
            receivedLongPress: false,
            receivedShortPress: false,
            cancelPIN: '',
            confirmCancelPIN: '',
            hasSetPin: props.hasSetPin,
            bluetoothEnabled: true,
            setPinErrorMessage: null,
        };
    }

    componentDidMount() {
        RNBluetoothInfo.addEventListener('change', bleState =>
            this.handleBluetoothStateChange(bleState)
        );

        // Update bluetooth state after first boot
        RNBluetoothInfo.getCurrentState().then(bleState =>
            this.handleBluetoothStateChange(bleState)
        );
    }

    componentDidUpdate(prevProps) {
        const LOCATION_PAGE_INDEX = 1;
        const BLUETOOTH_PAGE_INDEX = 2;
        const NOTIFICATION_PAGE_INDEX = 6;

        // Go to next screen after user gives location permission
        if (
            this.flatList &&
            this.props.permissions &&
            this.props.permissions.location &&
            this.props.permissions.location !== prevProps.permissions.location
        ) {
            if (this.flatList.state.currentPage === LOCATION_PAGE_INDEX) {
                // automatically progress from location page if user gives always on access
                this.flatList.goNext();
            }

            if (
                this.props.permissions.location &&
                !prevProps.permissions.location
            ) {
                console.log('Onboarding is starting ble listening');
                this.props.dispatch(startBleListening());
            }
        }

        // Go to next screen after user activates flare
        if (
            this.flatList &&
            this.flatList.state.currentPage === BLUETOOTH_PAGE_INDEX &&
            this.props.latestBeacon &&
            JSON.stringify(this.props.latestBeacon) !==
                JSON.stringify(prevProps.latestBeacon) &&
            this.props.latestBeacon.type === BeaconTypes.Long.name
        ) {
            const found = this.props.devices.filter(
                d => d.id === this.props.latestBeacon.deviceID
            );
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
            this.props.permissions.notification !==
                prevProps.permissions.notification
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

    componentWillUnmount() {
        RNBluetoothInfo.removeEventListener('change', bleState =>
            this.handleBluetoothStateChange(bleState)
        );
        if (this.permissionCheckInterval !== null) {
            clearInterval(this.permissionCheckInterval);
        }
    }

    setCancelPIN() {
        if (this.state.cancelPIN.length < LONG_PRESS_CANCEL_PIN_LENGTH) {
            this.setState({
                setPinErrorMessage:
                    Strings.onboarding.longPressCancel.errors.tooShort,
            });
        } else if (this.state.cancelPIN !== this.state.confirmCancelPIN) {
            this.setState({
                setPinErrorMessage:
                    Strings.onboarding.longPressCancel.errors.mismatch,
            });
        } else {
            this.setState({
                setPinErrorMessage: null,
            });
            this.props.dispatch(
                setCancelPIN(this.props.authToken, this.state.cancelPIN)
            );
        }
    }

    checkPermissions() {
        this.props.dispatch(checkLocationsPermission());
    }

    handleBluetoothStateChange(bleState) {
        const { connectionState } = bleState.type;
        this.setState({
            bluetoothEnabled: connectionState === 'on',
        });
    }

    changeCancelPIN(val) {
        this.setState({
            cancelPIN: val,
        });
    }

    changeConfirmCancelPIN(val) {
        this.setState({
            confirmCancelPIN: val,
        });
    }

    handleNextButtonPress() {
        this.flatList.goNext();
    }

    endOnboarding() {
        this.props.dispatch(setOnboardingComplete(this.props.authToken));
        if (
            this.props.permissions.contactsPrompted &&
            this.props.permissions.contacts
        ) {
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
        } else {
            this.props.dispatch(changeAppRoot('secure'));
        }
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
        const welcomePage = getWelcomePage({
            onPressNext: () => this.handleNextButtonPress(),
        });

        /**
         * The following pages have internal state and interact with the main onboarding
         * flow through their "props."
         */
        const locationPage = getLocationPage({
            locationPermission: this.props.permissions.location,
            locationPrompted:
                this.props.permissions &&
                this.props.permissions.locationPrompted,
            requestLocationPermission: () =>
                this.props.dispatch(
                    getPermission('ios.permission.LOCATION_ALWAYS', {
                        type: 'always',
                    })
                ),
            onPressNext: () => this.handleNextButtonPress(),
        });

        const shortPressPage = getShortPressPage({
            receivedShortPress: this.state.receivedShortPress,
            bluetoothEnabled: this.state.bluetoothEnabled,
            locationEnabled:
                this.props.permissions && this.props.permissions.location,
            locationPrompted:
                this.props.permissions &&
                this.props.permissions.locationPrompted,
            onPressNext: () => this.handleNextButtonPress(),
        });

        const longPressPage = getLongPressPage({
            receivedLongPress: this.state.receivedLongPress,
            bluetoothEnabled: this.state.bluetoothEnabled,
            locationEnabled:
                this.props.permissions && this.props.permissions.location,
            locationPrompted:
                this.props.permissions &&
                this.props.permissions.locationPrompted,
            onPressNext: () => this.handleNextButtonPress(),
        });

        const notificationsPage = getNotificationsPage({
            requestNotificationsPermission: () =>
                this.props.dispatch(getNotificationsPermission),
            notificationEnabled:
                this.props.permissions && this.props.permissions.notification,
            notificationPrompted:
                this.props.permissions &&
                this.props.permissions.notificationPrompted,
            onPressNext: () => this.handleNextButtonPress(),
        });

        const flareExamplePage = getFlareExamplePage({
            onCancelFlare: () => this.flatList.goNext(),
            locationEnabled:
                this.props.permissions && this.props.permissions.location,
            locationPrompted:
                this.props.permissions &&
                this.props.permissions.locationPrompted,
        });

        const longPressCancelPage = getLongPressCancelPage({
            hasSetPin: this.state.hasSetPin,
            pin: this.state.cancelPIN,
            confirmPin: this.state.confirmCancelPIN,
            changeCancelPIN: e => this.changeCancelPIN(e),
            changeConfirmCancelPIN: e => this.changeConfirmCancelPIN(e),
            setCancelPIN: () => this.setCancelPIN(),
            setPinErrorMessage: this.state.setPinErrorMessage,
            onPressNext: () => this.handleNextButtonPress(),
        });

        const contactsPage = getContactsPage({
            requestContactsPermission: () =>
                this.props.dispatch(getPermission('ios.permission.CONTACTS')),
            endOnboarding: () => this.endOnboarding(),
            contactsEnabled:
                this.props.permissions && this.props.permissions.contacts,
            contactsPrompted:
                this.props.permissions &&
                this.props.permissions.contactsPrompted,
        });

        return (
            <KeyboardAvoidingView style={styles.container}>
                <Onboarding
                    ref={ref => {
                        this.flatList = ref;
                    }}
                    containerStyles={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    scrollingLocked
                    /* Page order matters. @see lifecycle methods related to dynamic page switching */
                    pages={[
                        welcomePage,
                        locationPage,
                        shortPressPage,
                        longPressPage,
                        flareExamplePage,
                        longPressCancelPage,
                        notificationsPage,
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
