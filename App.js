import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator, createSwitchNavigator, NavigationActions } from 'react-navigation';

// import './bits/ReactotronConfig';

import API from './bits/API';
import AuthLoading from './screens/AuthLoading';
import BleManager from './bits/BleManager';
import Home from './screens/Home';
import PinCheck from './screens/PinCheck';
import SignIn from './screens/SignIn';
import { BeaconTypes } from './bits/BleConstants';

const AppStack = createStackNavigator({ Home: { screen: Home } });
const AuthStack = createStackNavigator({ SignInScreen: SignIn });
const AuthenticatedAppStack = createSwitchNavigator(
    {
        AuthLoading,
        App: AppStack,
        Auth: AuthStack,
        PinCheck,
    },
    {
        initialRouteName: 'AuthLoading',
    },
);

const flareAPI = new API();

let navigatorRef = null;

export default class App extends React.Component {
    static signOut() {
        flareAPI.resetAuthentication();
        navigatorRef.dispatch(NavigationActions.navigate({
            routeName: 'Auth',
        }));
    }

    constructor(props) {
        super(props);

        this.state = {
            lastBeacon: null,
            hasActiveFlare: false,
        };

        const boundDetectedMethod = this.onBeaconDetected.bind(this);
        BleManager.startListening({
            onBeaconDetected: beacon => boundDetectedMethod(beacon),
        });

        navigatorRef = null;
    }

    componentDidMount() {
        navigatorRef = this.navigatorObj;
    }

    async onCancelFlare() {
        await AsyncStorage.setItem('hasActiveFlare', 'no');
        this.setState({
            hasActiveFlare: false,
        });
    }

    onBeaconDetected(beacon) {
        const myDeviceID = 176;

        // For now, only act on beacons from my device. We want to propagate calls and flares
        // for all devices in the future.
        if (beacon.deviceID !== myDeviceID) {
            console.log(`Ignoring beacon from device ID ${beacon.deviceID}.`);
            return;
        }

        switch (beacon.type) {
        case BeaconTypes.Short.name:
            flareAPI.call(beacon)
                .catch((status) => {
                    if (status === 401 || status === 403) {
                        App.signOut();
                    }
                });
            break;
        case BeaconTypes.Long.name:
            flareAPI.flare(beacon)
                .then((response) => {
                    console.log(`Started flare: ${response}`);
                    AsyncStorage.setItem('hasActiveFlare', 'yes');
                })
                .catch((status) => {
                    if (status === 401 || status === 403) {
                        App.signOut();
                    }
                });
            break;
        case BeaconTypes.Checkin.name:
            console.debug(`RSSI: ${beacon.rssi}`);
            // flareAPI.checkin(beacon);
            break;
        default:
            console.warn(`Unrecognized beacon type ${beacon.type}`);
            break;
        }

        this.setState({
            lastBeacon: beacon,
            hasActiveFlare: beacon.type === BeaconTypes.Long.name,
        });
    }

    async checkForActiveFlare() {
        const hasActiveFlare = await AsyncStorage.getItem('hasActiveFlare');
        this.setState({
            hasActiveFlare: hasActiveFlare === 'yes',
        });
    }

    render() {
        return (
            <AuthenticatedAppStack
                ref={(nav) => { this.navigatorObj = nav; }}
                screenProps={{
                    lastBeacon: this.state.lastBeacon,
                    flareAPI,
                    hasActiveFlare: this.state.hasActiveFlare,
                    onCancelFlare: () => this.onCancelFlare(),
                    checkForActiveFlare: () => this.checkForActiveFlare(),
                }}
            />
        );
    }
}
