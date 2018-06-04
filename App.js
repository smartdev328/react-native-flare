import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import './bits/ReactotronConfig';

import API from './bits/API';
import AuthLoading from './screens/AuthLoading';
import BleManager from './bits/BleManager';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import { BeaconTypes } from './bits/BleConstants';

const AppStack = createStackNavigator({ Home: { screen: Home } });
const AuthStack = createStackNavigator({ SignInScreen: SignIn });
const AuthenticatedAppStack = createSwitchNavigator(
    {
        AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    },
);

const AppNavigation = props => (
    <AuthenticatedAppStack
        {...props}
    />
);

const flareAPI = new API();

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastBeacon: null,
            hasActiveFlare: false,
            cancelingFlare: false,
        };

        const boundDetectedMethod = this.onBeaconDetected.bind(this);
        BleManager.startListening({
            onBeaconDetected: beacon => boundDetectedMethod(beacon),
        });
    }

    async onCancelFlare() {
        this.setState({
            cancelingFlare: true,
        });
        await flareAPI.cancelActiveFlare();
        this.setState({
            cancelingFlare: false,
            hasActiveFlare: false,
        })
    }

    onBeaconDetected(beacon) {
        const myDeviceID = 176;

        // For now, only act on beacons from my device. We want to propagate calls and flares
        // for all devices in the future.
        if (beacon.deviceID !== myDeviceID) {
            return;
        }

        switch (beacon.type) {
        case BeaconTypes.Short.name:
            flareAPI.call(beacon);
            break;
        case BeaconTypes.Long.name:
            flareAPI.flare(beacon);
            break;
        case BeaconTypes.Checkin.name:
            flareAPI.checkin(beacon);
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

    render() {
        return (
            <AppNavigation
                screenProps={{
                    lastBeacon: this.state.lastBeacon,
                    flareAPI,
                    hasActiveFlare: this.state.hasActiveFlare,
                    cancelingFlare: this.state.cancelingFlare,
                    onCancelFlare: () => this.onCancelFlare(),
                }}
            />
        );
    }
}
