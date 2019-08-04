import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Aura from '../bits/Aura';
import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';
import { cancelActiveFlare } from '../actions/beaconActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.cream,
        paddingBottom: Spacing.small,
    },
    header: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        paddingTop: Spacing.small,
        paddingBottom: Spacing.medium,
    },
    headerText: {
        marginTop: Spacing.small,
        marginBottom: Spacing.medium,
        fontSize: Type.size.medium,
        fontWeight: 'bold',
        color: Colors.white,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: Spacing.small,
    },
});

class PinCheck extends React.Component {
    static options() {
        return {
            topBar: {
                visible: true,
            },
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.hasActiveFlare && !this.props.hasActiveFlare) {
            Navigation.pop(this.props.componentId);
        }
    }

    async checkCode(code) {
        this.props.dispatch(cancelActiveFlare(this.props.authToken, code));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Aura source="aura-6" />
                <View style={styles.header}>
                    <Text style={styles.headerText}>{Strings.pin.prompt}</Text>
                </View>
                <CodeInput
                    codeLength={4}
                    secureTextEntry
                    onFulfill={code => this.checkCode(code)}
                    keyboardType="numeric"
                    activeColor="#000000"
                />
                <View style={styles.footer}>
                    {this.props.cancelingActiveFlare && this.props.cancelActiveFlareState === 'request' && (
                        <ActivityIndicator />
                    )}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        authToken: state.user.authToken,
        cancelingActiveFlare: state.user.cancelingActiveFlare,
        hasActiveFlare: state.user.hasActiveFlare,
    };
}

export default connect(mapStateToProps)(PinCheck);
