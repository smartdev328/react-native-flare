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
        };

        const boundDetectedMethod = this.onBeaconDetected.bind(this);
        BleManager.startListening({
            onBeaconDetected: beacon => boundDetectedMethod(beacon),
        });
    }

    onBeaconDetected(beacon) {
        const myDeviceID = 176;

        // For now, only act on beacons from my device. We want to propagate calls and flares
        // for all devices in the future.
        if (beacon.deviceID !== myDeviceID) {
            return;
        }

        if (beacon.type === BeaconTypes.Short.name) {
            flareAPI.call();
        }

        this.setState({
            lastBeacon: beacon,
        });
    }

    render() {
        return (
            <AppNavigation
                screenProps={{
                    lastBeacon: this.state.lastBeacon,
                    flareAPI,
                }}
            />
        );
    }
}
