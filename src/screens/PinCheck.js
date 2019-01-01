import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Colors from '../bits/Colors';
import Strings from '../locales/en';
import { cancelActiveFlare } from '../actions/beaconActions';

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
        backgroundColor: Colors.backgrounds.pink,
        color: Colors.theme.pink,
    },
    backgroundGradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    logo: {
        width: 98,
        resizeMode: 'contain',
    },
});

class PinCheck extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
                animate: false,
                leftButtons: [],
            },
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hasActiveFlare && !this.props.hasActiveFlare) {
            Navigation.pop(this.props.componentId);
        }
    }

    async checkCode(code) {
        this.props.dispatch(cancelActiveFlare(this.props.token, code));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.prompt}>
                    {Strings.pin.prompt}
                </Text>
                <CodeInput
                    codeLength={4}
                    secureTextEntry
                    onFulfill={code => this.checkCode(code)}
                    keyboardType="numeric"
                    activeColor="#000000"
                />
                {this.props.cancelingActiveFlare && this.props.cancelActiveFlareState === 'request' &&
                    <ActivityIndicator />
                }
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        cancelingActiveFlare: state.user.cancelingActiveFlare,
        hasActiveFlare: state.user.hasActiveFlare,
    };
}

export default connect(mapStateToProps)(PinCheck);
