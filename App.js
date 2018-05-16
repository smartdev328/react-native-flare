import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { I18nextProvider, translate } from 'react-i18next';
import { createStackNavigator } from 'react-navigation';

import i18n from './bits/i18n';
import Home from './screens/Home';

// the navigation stack
const Stack = createStackNavigator({
    Home: { screen: Home }
  });

// Wrapping a stack with translation hoc asserts we trigger new render on language change
// the hoc is set to only trigger rerender on languageChanged
const WrappedStack = () => {
    return <Stack screenProps={{ t: i18n.getFixedT() }} />;
}

const ReloadAppOnLanguageChange = translate('translation', {
    bindI18n: 'languageChanged',
    bindStore: false
})(WrappedStack);

// The entry point using a react navigation stack navigation
// gets wrapped by the I18nextProvider enabling using translations
// https://github.com/i18next/react-i18next#i18nextprovider
export default class App extends React.Component {
    render() {
        return (
            <I18nextProvider i18n={ i18n }>
                <ReloadAppOnLanguageChange />
            </I18nextProvider>
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
