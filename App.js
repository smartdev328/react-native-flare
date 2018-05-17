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
        AuthLoading: AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);


export default class App extends React.Component {
    constructor() {
        super();
        BleManager.startListening();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <AuthenticatedAppStack />
        );
    }
}
