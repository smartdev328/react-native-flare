import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import './bits/ReactotronConfig';

import API from './bits/API';
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
        console.log(`Detected beacon: ${beacon.uuid}, proximity: ${beacon.proximity}, accuracy: ${beacon.accuracy}`);
        this.setState({
            lastBeacon: beacon,
        });
        flareAPI.call();
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
