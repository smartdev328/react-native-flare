import React, { Component } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Linking, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { changeAppRoot } from '../actions/navActions';
import { iconsMap } from '../bits/AppIcons';
import { setUserDetails } from '../actions/userActions';
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

class Register2 extends Component {
    static options() {
        return {
            topBar: {
                background: {
                    color: Colors.theme.blue,
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

    static isPasswordValid(password) {
        // / https://stackoverflow.com/questions/3466850/regular-expression-to-enforce-complex-passwords-matching-3-out-of-4-rules
        let valid = true;
        if (password.length < 8) {
            valid = false;
        } else {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasNonalphas = /\W/.test(password);
            if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3) {
                valid = false;
            }
        }

        return valid;
    }

    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            invalid: false,
            invalidReason: null,
            lastName: null,
            settingDetailsState: null,
            password: null,
            passwordIsValid: false,
            userTyping: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.settingDetailsState !== state.settingDetailsState) {
            if (props.settingDetailsState === 'failed') {
                return {
                    invalid: true,
                    invalidReason: Strings.register.errors.serverError,
                };
            }
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.settingDetailsState !== 'succeeded' && this.props.settingDetailsState === 'succeeded') {
            this.props.dispatch(changeAppRoot('secure-onboarding'));
        }
    }

    setInputsFocused(hasFocus) {
        this.setState({
            userTyping: hasFocus,
        });
    }

    changeField(fieldName, newValue) {
        const newState = {
            [fieldName]: newValue,
        };
        if (fieldName === 'password') {
            newState.passwordIsValid = Register2.isPasswordValid(newValue);
        }
        this.setState(newState);
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Register2',
            },
        });
    };

    startSettingPassword() {
        const { dispatch } = this.props;
        const { firstName, lastName, password } = this.state;
        if (
            !firstName ||
            firstName.length === 0 ||
            !lastName ||
            lastName.length === 0 ||
            !password ||
            password.length === 0
        ) {
            this.setState({
                invalid: true,
                invalidReason: Strings.register.errors.allFieldsRequired,
            });
            return;
        }

        if (!Register2.isPasswordValid(password)) {
            this.setState({
                invalid: true,
                invalidReason: Strings.register2.errors.invalidPassword,
            });
            return;
        }

        this.setState({
            invalid: false,
            invalidReason: null,
        });

        dispatch(setUserDetails(this.props.authToken, firstName, lastName, password));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Aura source="aura-4" />
                {(this.state.invalid || this.props.settingDetailsState === 'failed') && (
                    <FlareAlert variant="info" message={this.state.invalidReason} />
                )}
                {!this.state.userTyping && !this.state.invalid && (
                    <View style={styles.instructionsBackground}>
                        <Text style={styles.instructionsForeground}>{Strings.register2.instructions}</Text>
                    </View>
                )}
                <View style={styles.inputs}>
                    <FlareTextInput
                        autoCapitalize="sentences"
                        placeholder={Strings.register2.firstNamePrompt}
                        value={this.state.firstName}
                        onChangeText={v => this.changeField('firstName', v)}
                        keyboardType="ascii-capable"
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <FlareTextInput
                        autoCapitalize="sentences"
                        placeholder={Strings.register2.lastNamePrompt}
                        value={this.state.lastName}
                        onChangeText={v => this.changeField('lastName', v)}
                        keyboardType="ascii-capable"
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <FlareTextInput
                        autoCapitalize="none"
                        placeholder={Strings.register2.passwordPrompt}
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={v => this.changeField('password', v)}
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                        error={!this.state.passwordIsValid}
                    />
                    {this.props.settingDetailsState !== 'requested' && (
                        <Button
                            primary
                            onPress={() => this.startSettingPassword()}
                            title={Strings.register2.submitLabel}
                            styleBackground={styles.registerButton}
                        />
                    )}
                    {this.props.settingDetailsState === 'requested' && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color={Colors.white} />
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(state) {
    return {
        authToken: state.user.authToken,
        settingDetailsState: state.user.settingDetailsState,
    };
}

export default connect(mapStateToProps)(Register2);
