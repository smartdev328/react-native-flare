import React from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CodePin from 'react-native-pin-code';

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
    },
    logo: {
        width: 200,
        margin: 25,
        marginBottom: 90,
        padding: 8,
        resizeMode: 'contain',
    },
});

export default class CodeInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checking: false,
        };
    }

    async checkCode(code, callback) {
        const { flareAPI } = this.props.screenProps;
        this.setState({
            checking: true,
        });
        const response = await flareAPI.cancelActiveFlare(code);
        this.setState({
            checking: false,
        });
        callback(response.status === flareAPI.requestStatus.success);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image
                    source={require('../assets/FLARE-white.png')}
                    style={styles.logo}
                />}
                <CodePin
                    number={4}
                    checkPinCode={(code, callback) => {
                        this.checkCode(code, callback);
                    }}
                    success={() => this.props.screenProps.onCancelFlare()}
                    text={Strings.pin.prompt}
                    error={Strings.pin.failure}
                    keyboardType="numeric"
                />
                {this.state.checking &&
                    <Text>
                        <ActivityIndicator />
                    </Text>
                }
            </KeyboardAvoidingView>
        );
    }
}

