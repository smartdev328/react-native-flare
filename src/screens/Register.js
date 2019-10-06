import React, { Component } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Linking, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { iconsMap } from '../bits/AppIcons';
import { registerNewAccount, resetAuth } from '../actions/authActions';
import { DEVICE_ID_LABEL_LENGTH, DEVICE_TWO_FACTOR_LABEL_LENGTH } from '../constants/Config';
import Aura from '../bits/Aura';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import FlareAlert from '../bits/FlareAlert';
import FlareTextInput from '../bits/FlareTextInput';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputs: {
        flex: 3,
        width: '100%',
        padding: Spacing.large,
        alignItems: 'stretch',
        marginBottom: Spacing.huge,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'stretch',
        padding: Spacing.small,
        height: Spacing.huge,
        minHeight: Spacing.huge,
        maxHeight: Spacing.huge,
    },
    buttons: {
        padding: Spacing.huge,
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButton: {
        marginTop: Spacing.large,
        marginBottom: Spacing.huge,
    },
    instructionsBackground: {
        margin: Spacing.large,
    },
    instructionsForeground: {
        color: Colors.white,
    },
};

const requiredSerialNumberLength = DEVICE_ID_LABEL_LENGTH + DEVICE_TWO_FACTOR_LABEL_LENGTH;

class Register extends Component {
    static options() {
        return {
            topBar: {
                background: {
                    color: '#cf6544',
                    translucent: false,
                },
                leftButtons: [
                    {
                        id: 'backButton',
                        icon: iconsMap.back,
                        color: Colors.black,
                    },
                ],
                title: {
                    component: {
                        name: 'com.flarejewelry.app.FlareNavBar',
                        alignment: 'center',
                    },
                },
            },
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            invalid: false,
            invalidReason: null,
            phone: null,
            registrationState: null,
            serialNumber: null,
            userTyping: false,
        };

        const { dispatch } = props;
        dispatch(resetAuth());
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Register',
            },
        });
    };

    changeField(fieldName, newValue) {
        this.setState({
            [fieldName]: newValue,
        });
    }

    setInputsFocused(hasFocus) {
        this.setState({
            userTyping: hasFocus,
        });
    }

    startRegistration() {
        const { dispatch } = this.props;
        const { email, phone, serialNumber } = this.state;
        if (
            !email ||
            email.length === 0 ||
            !phone ||
            phone.length === 0 ||
            !serialNumber ||
            serialNumber.length === 0
        ) {
            this.setState({
                invalid: true,
                invalidReason: Strings.register.errors.allFieldsRequired,
            });
            return;
        }

        if (serialNumber.length !== requiredSerialNumberLength) {
            this.setState({
                invalid: true,
                invalidReason: Strings.register.errors.invalidSerialNumber,
            });
            return;
        }

        this.setState({
            invalid: false,
            invalidReason: null,
        });

        dispatch(registerNewAccount(email, phone, serialNumber));
    }

    static getDerivedStateFromProps(props, state) {
        if (props.registrationState !== state.registrationState) {
            if (props.registrationState === 'failed') {
                return {
                    invalid: true,
                    invalidReason: Strings.register.errors.serverError,
                };
            }
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.registrationState !== 'succeeded' && this.props.registrationState === 'succeeded') {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'com.flarejewelry.app.Register2',
                },
            });
        }
    }

    render() {
        const hasEmail = this.state.email && this.state.email.length > 0;
        const hasPhone = this.state.phone && this.state.phone.length > 0;
        const hasSerialNumber =
            this.state.serialNumber && this.state.serialNumber.length === requiredSerialNumberLength;
        const submitDisabled = !hasEmail || !hasPhone || !hasSerialNumber;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Aura source="aura-5" />
                {(this.state.invalid || this.props.registrationState === 'failed') && (
                    <FlareAlert variant="info" message={this.state.invalidReason} />
                )}
                {!this.state.invalid &&
                    this.props.registrationState !== 'failed' &&
                    hasEmail &&
                    hasPhone &&
                    !hasSerialNumber && (
                        <FlareAlert variant="info" message={Strings.register.errors.invalidSerialNumber} />
                    )}
                {!this.state.userTyping && !this.state.invalid && (
                    <View style={styles.instructionsBackground}>
                        <Text style={styles.instructionsForeground}>{Strings.register.instructions}</Text>
                    </View>
                )}
                <View style={styles.inputs}>
                    <FlareTextInput
                        autoCapitalize="none"
                        placeholder={Strings.register.emailPrompt}
                        value={this.state.email}
                        onChangeText={v => this.changeField('email', v)}
                        keyboardType="email-address"
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <FlareTextInput
                        autoCapitalize="none"
                        placeholder={Strings.register.phonePrompt}
                        value={this.state.phone}
                        onChangeText={v => this.changeField('phone', v)}
                        keyboardType="phone-pad"
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <FlareTextInput
                        autoCapitalize="characters"
                        placeholder={Strings.register.serialNumber}
                        value={this.state.serialNumber}
                        onChangeText={v => this.changeField('serialNumber', v)}
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    {this.props.registrationState !== 'requested' && (
                        <Button
                            primary
                            onPress={() => this.startRegistration()}
                            title={Strings.register.submitLabel}
                            styleBackground={styles.registerButton}
                            disabled={submitDisabled}
                        />
                    )}
                    {this.props.registrationState === 'requested' && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color={Colors.white} />
                        </View>
                    )}
                    {!this.state.userTyping && (
                        <Button
                            secondary
                            title={Strings.register.needToBuy}
                            onPress={() => Linking.openURL('https://getflare.com')}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(state) {
    return {
        registrationState: state.user.registrationState,
    };
}

export default connect(mapStateToProps)(Register);
