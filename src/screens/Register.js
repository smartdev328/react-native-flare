import React, { Component } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Linking, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { iconsMap } from '../bits/AppIcons';
import { registerNewAccount, resetAuth } from '../actions/authActions';
import { DEVICE_ID_LABEL_LENGTH, DEVICE_TWO_FACTOR_LABEL_LENGTH } from '../constants';
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
    backgroundAura: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    logo: {
        width: '70%',
        flex: 4,
        marginTop: Spacing.huge,
        marginBottom: Spacing.huge,
        maxHeight: 128,
        resizeMode: 'contain',
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

    register() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Register',
            },
        });
    }

    setInputsFocused(hasFocus) {
        this.setState({
            userTyping: hasFocus,
        });
    }

    async startRegistration() {
        const { dispatch } = this.props;
        const { email, phone, serialNumber } = this.state;
        const requiredSerialNumberLength = DEVICE_ID_LABEL_LENGTH + DEVICE_TWO_FACTOR_LABEL_LENGTH;
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

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Aura source="aura-5" />
                {(this.state.invalid || this.props.authState === 'failed') && (
                    <FlareAlert variant="info" message={this.state.invalidReason} />
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
                    {this.props.authState !== 'requested' && (
                        <Button
                            primary
                            onPress={() => this.startRegistration()}
                            title={Strings.register.title}
                            styleBackground={styles.registerButton}
                            disabled={
                                this.state.password &&
                                this.state.password.length > 0 &&
                                this.state.password === this.state.passwordConfirm
                            }
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
