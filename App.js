import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { I18nextProvider, translate } from 'react-i18next';
import { createStackNavigator } from 'react-navigation';

import './bits/ReactotronConfig';

import BleManager from './bits/BleManager';
import I18n from 'react-native-i18n';
import Home from './screens/Home';

const Stack = createStackNavigator({
    Home: { screen: Home }
  });

export default class App extends React.Component {

    constructor() {
        super();

        this.bleManager = new BleManager();
    }

    componentWillUnmount() {
        delete this.bleManager;
    }

    render() {
        return (
            <Stack />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
