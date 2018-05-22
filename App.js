import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import './bits/ReactotronConfig';

import AuthLoading from './screens/AuthLoading';
import BleManager from './bits/BleManager';
import Home from './screens/Home';
import SignIn from './screens/SignIn';

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

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            lastBeacon: null,
        };

        BleManager.startListening({
            onBeaconDetected: (beacon) => {
                this.onBeaconDetected(beacon);
            },
        });
    }

    onBeaconDetected(beacon) {
        console.log(`Detected beacon: ${beacon.uuid}, proximity: ${beacon.proximity}, accuracy: ${beacon.accuracy}`);
        this.setState({
            lastBeacon: beacon,
        });
    }

    render() {
        console.log(`Last beacon ${this.state.lastBeacon}`);
        return (
            <AuthenticatedAppStack />
        );
    }
}
