import React, { Component } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Linking, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { iconsMap } from '../bits/AppIcons';
import { signIn, resetAuth } from '../actions/authActions';
import Aura from '../bits/Aura';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
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
    invalid: {
        paddingTop: Spacing.small,
        paddingBottom: Spacing.small,
        paddingLeft: Spacing.large,
        paddingRight: Spacing.large,
        backgroundColor: Colors.theme.blue,
    },
    invalidText: {
        color: Colors.white,
    },
    inputs: {
        flex: 3,
        width: '100%',
        padding: Spacing.large,
        alignItems: 'stretch',
        marginBottom: Spacing.huge,
        borderRadius: Spacing.large,
    },
    input: {
        marginBottom: Spacing.small,
        paddingHorizontal: Spacing.smallish,
        paddingVertical: Spacing.medium,
        backgroundColor: Colors.theme.cream,
        borderBottomWidth: 1,
        borderBottomColor: Colors.theme.purple,
        borderRightColor: Colors.theme.peach,
        fontSize: 18,
        color: Colors.black,
        textAlign: 'center',
        borderRadius: 4,
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
            username: null,
            phone: null,
            password: null,
            passwordConfirm: null,
            invalid: false,
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

    async startSignIn() {
        const { dispatch } = this.props;
        const { username, password } = this.state;
        if (username === null || username.length === 0 || password === null || password.length === 0) {
            this.setState({
                invalid: true,
            });
            return;
        }

        this.setState({
            invalid: false,
        });

        dispatch(signIn(username, password));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Aura source="aura-5" />
                {(this.state.invalid || this.props.authState === 'failed') && (
                    <View style={styles.invalid}>
                        <Text style={styles.invalidText}>{Strings.signin.invalid}</Text>
                    </View>
                )}
                {!this.state.userTyping && (
                    <View style={styles.instructionsBackground}>
                        <Text style={styles.instructionsForeground}>{Strings.register.instructions}</Text>
                    </View>
                )}
                <View style={styles.inputs}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder={Strings.register.usernamePrompt}
                        placeholderTextColor={Colors.black}
                        style={styles.input}
                        value={this.state.username}
                        onChangeText={v => this.changeField('username', v)}
                        keyboardType="email-address"
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <TextInput
                        autoCapitalize="none"
                        placeholder={Strings.register.phonePrompt}
                        placeholderTextColor={Colors.black}
                        style={styles.input}
                        value={this.state.phone}
                        onChangeText={v => this.changeField('phone', v)}
                        keyboardType="phone-pad"
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <TextInput
                        autoCapitalize="none"
                        placeholder={Strings.register.passwordPrompt}
                        placeholderTextColor={Colors.black}
                        secureTextEntry
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={v => this.changeField('password', v)}
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <TextInput
                        autoCapitalize="none"
                        placeholder={Strings.register.confirmPasswordPrompt}
                        placeholderTextColor={Colors.black}
                        secureTextEntry
                        style={styles.input}
                        value={this.state.passwordConfirm}
                        onChangeText={v => this.changeField('passwordConfirm', v)}
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <TextInput
                        autoCapitalize="characters"
                        placeholder={Strings.register.serialNumber}
                        placeholderTextColor={Colors.black}
                        style={styles.input}
                        value={this.state.serialNumber}
                        onChangeText={v => this.changeField('serialNumber', v)}
                        onFocus={() => this.setInputsFocused(true)}
                        onBlur={() => this.setInputsFocused(false)}
                    />
                    <Button
                        primary
                        onPress={() => this.startSignIn()}
                        title={Strings.register.title}
                        styleBackground={styles.registerButton}
                        disabled={
                            this.state.password &&
                            this.state.password.length > 0 &&
                            this.state.password === this.state.passwordConfirm
                        }
                    />
                    {!this.state.userTyping && (
                        <Button
                            secondary
                            title={Strings.register.needToBuy}
                            onPress={() => Linking.openURL('https://getflare.com')}
                        />
                    )}
                </View>
                <View style={styles.loadingContainer}>
                    {this.props.authState === 'requested' && <ActivityIndicator color={Colors.white} />}
                </View>
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(state) {
    return {
        devices: state.user.devices,
    };
}

export default connect(mapStateToProps)(Register);
