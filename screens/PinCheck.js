import React from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';

import Colors from '../bits/Colors';
import Strings from '../locales/en';


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: Colors.theme.orange,
    },
    logo: {
        width: 200,
        margin: 25,
        marginBottom: 90,
        padding: 8,
        resizeMode: 'contain',
    },
});

export default class PinCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checking: false,
        };
    }

    async checkCode(code) {
        const { flareAPI } = this.props.screenProps;
        this.setState({
            checking: true,
        });
        flareAPI.cancelActiveFlare(code)
            .then(() => {
                this.setState({
                    checking: false,
                });
                this.props.screenProps.onCancelFlare();
                this.props.navigation.navigate('Home');
            })
            .catch((status, json) => {
                console.log(`Failed to cancel Flare: ${status} ${json}`);
            });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Image
                    source={require('../assets/FLARE-white.png')}
                    style={styles.logo}
                />
                <Text style={styles.prompt}>
                    {Strings.pin.prompt}
                </Text>
                <CodeInput
                    codeLength={4}
                    secureTextEntry
                    onFulfill={code => this.checkCode(code)}
                    keyboardType="numeric"
                />
                {this.state.checking &&
                    <ActivityIndicator />
                }
            </KeyboardAvoidingView>
        );
    }
}

