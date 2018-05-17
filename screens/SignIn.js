import React from 'react';
import { translate } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button, TextInput } from '@shoutem/ui';

import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';

export default class SignIn extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/FLARE-white.png')}
                    style={styles.logo}
                />
                <View style={styles.inputs}>
                    <TextInput
                        placeholder={Strings.signin.usernamePrompt}
                    />
                    <TextInput
                        placeholder={Strings.signin.passwordPrompt}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttons}>
                    <Button styleName="dark">
                        <Text>{Strings.signin.signInLabel}</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.medium,
    },
    separate: {
        marginTop: 50
    },
    choosePrompt: {
        marginBottom: 12
    },
    logo: {
        width: '70%',
        margin: Spacing.large,
        padding: 8,
        resizeMode: 'contain'
    },
    subhead: {
        marginBottom: Spacing.large
    },
    inputs: {
        width: '100%',
        alignItems: 'stretch',
        marginBottom: Spacing.large
    },
    buttons: {
        height: 36,
        marginBottom: 80
    }
});