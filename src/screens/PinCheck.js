import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import RadialGradient from 'react-native-radial-gradient';

import Colors from '../bits/Colors';
import FlavorStripe from '../bits/FlavorStripe';
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
        resizeMode: 'contain',
    },
});

class PinCheck extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps.hasActiveFlare && !this.props.hasActiveFlare) {
            this.props.navigator.pop(this.props.componentId);
        }
    }

    async checkCode(code) {
        this.props.dispatch(cancelActiveFlare(this.props.token, code));
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
