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
import Icon from 'react-native-vector-icons/Entypo';
import RadialGradient from 'react-native-radial-gradient';

import Colors from '../bits/Colors';
import FlavorStripe from '../bits/FlavorStripe';
import Strings from '../locales/en';


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        backgroundColor: Colors.theme.purple,
    },
    backgroundGradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    logo: {
        width: 98,
        resizeMode: 'contain'
    },
});

export default class PinCheck extends React.Component {
    static navigationOptions = {
        title: 'Questions',
    };

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
                <FlavorStripe />
                <RadialGradient
                    style={styles.backgroundGradient}
                    colors={[Colors.theme.orangeDark, Colors.theme.purple]}
                    radius={300}
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

