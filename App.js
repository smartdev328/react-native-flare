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
            devices: [],
            deviceIDs: [],
        };

        const boundDetectedMethod = this.onBeaconDetected.bind(this);
        BleManager.startListening({
            onBeaconDetected: beacon => boundDetectedMethod(beacon),
        });

        navigatorRef = null;
    }

    componentDidMount() {
        navigatorRef = this.navigatorObj;
        this.checkDevicesFromLocalStorage();
    }

    async onCancelFlare() {
        await AsyncStorage.setItem('hasActiveFlare', 'no');
        this.setState({
            hasActiveFlare: false,
        });
    }

    onBeaconDetected(beacon) {
        // For now, only act on beacons from the user's devices.
        // In the future, we want to propagate calls and flares for all devices.
        if (this.state.deviceIDs.indexOf(beacon.deviceID) === -1) {
            return;
        }

        console.log(`Processing beacon from device ID ${beacon.deviceID} with my devices ${JSON.stringify(this.state.devices)}.`);

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
            flareAPI.checkin(beacon)
                .catch((status) => {
                    if (status === 401 || status === 403) {
                        App.signOut();
                    }
                });
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

    async checkDevicesFromLocalStorage() {
        AsyncStorage.getItem('devices').then((devicesAsString) => {
            const devices = JSON.parse(devicesAsString);
            if (typeof devices === 'undefined' || devices === null) {
                return;
            }
            const deviceIDs = devices.map(d => d.id);
            this.setState({
                devices,
                deviceIDs,
            });
        });
    }

    async checkForActiveFlare() {
        const hasActiveFlare = await AsyncStorage.getItem('hasActiveFlare');
        this.setState({
            hasActiveFlare: hasActiveFlare === 'yes',
        });
        this.checkDevicesFromLocalStorage();
    }

    render() {
        return (
            <AuthenticatedAppStack
                ref={(nav) => { this.navigatorObj = nav; }}
                screenProps={{
                    lastBeacon: this.state.lastBeacon,
                    devices: this.state.devices,
                    flareAPI,
                    hasActiveFlare: this.state.hasActiveFlare,
                    onCancelFlare: () => this.onCancelFlare(),
                    checkForActiveFlare: () => this.checkForActiveFlare(),
                }}
            />
        );
    }
}
