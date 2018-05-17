import React from 'react';
import { createStackNavigator } from 'react-navigation';

import './bits/ReactotronConfig';

import BleManager from './bits/BleManager';
import Home from './screens/Home';

const Stack = createStackNavigator({
    Home: { screen: Home },
});

export default class App extends React.Component {
    constructor() {
        super();
        BleManager.startListening();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Stack />
        );
    }
}
