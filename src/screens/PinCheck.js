import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { cancelActiveFlare, resetCancelFlareState } from '../actions/beaconActions';
import { LONG_PRESS_CANCEL_PIN_LENGTH } from '../constants';
import Aura from '../bits/Aura';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import CommonTop from './onboarding/CommonTop';
import FlareAlert from '../bits/FlareAlert';
import FlareTextInput from '../bits/FlareTextInput';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import Type from '../bits/Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.cream,
        padding: Spacing.huge,
    },
    header: {
        marginTop: Spacing.huge,
        paddingTop: Spacing.small,
    },
    headerText: {
        fontSize: Type.size.medium,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: Spacing.medium,
    },
    cancelButtonArea: {
        marginTop: Spacing.medium,
    },
    secondaryArea: {
        marginTop: Spacing.huge,
    },
    warningArea: {
        marginVertical: Spacing.medium,
    },
    footer: {
        alignItems: 'center',
        paddingVertical: Spacing.small,
    },
});

class PinCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pin: null,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hasActiveFlare && !this.props.hasActiveFlare && this.props.cancelActiveFlareState === 'success') {
            Navigation.pop(this.props.componentId);
        }
    }

    componentDidMount() {
        this.props.dispatch(resetCancelFlareState());
    }

    async submitPIN() {
        this.props.dispatch(cancelActiveFlare(this.props.authToken, this.state.pin));
    }

    changePinText(val) {
        this.setState({
            pin: val,
        });
    }

    neverMind() {
        Navigation.pop(this.props.componentId);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Aura source="aura-7" />
                <CommonTop />
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.header}>
                    <Text style={styles.headerText}>{Strings.pin.prompt}</Text>
                    {!this.props.cancelActiveFlare && this.props.cancelActiveFlareState === 'failure' && (
                        <FlareAlert
                            message={Strings.pin.error}
                            variant="info"
                            centered
                            containerStyle={styles.warningArea}
                        />
                    )}
                    <FlareTextInput
                        maxLength={LONG_PRESS_CANCEL_PIN_LENGTH}
                        placeholder={Strings.onboarding.longPressCancel.pinPlaceholder}
                        secureTextEntry
                        keyboardType="phone-pad"
                        onChangeText={v => this.changePinText(v)}
                        value={this.state.pin}
                    />
                    <View style={styles.cancelButtonArea}>
                        <Button title={Strings.pin.title} onPress={() => this.submitPIN()} primary />
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.secondaryArea}>
                        <Button title={Strings.pin.neverMind} onPress={() => this.neverMind()} secondary />
                    </View>
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
        cancelActiveFlareState: state.user.cancelActiveFlareState,
        hasActiveFlare: state.user.hasActiveFlare,
    };
}

export default connect(mapStateToProps)(PinCheck);
