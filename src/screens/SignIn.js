import React, { Component } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Linking, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { signIn, resetAuth } from '../actions/authActions';
import Aura from '../bits/Aura';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import FlareTextInput from '../bits/FlareTextInput';

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
    backgroundGradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    choosePrompt: {
        marginBottom: 12,
    },
    logo: {
        width: '70%',
        flex: 4,
        marginTop: Spacing.huge,
        marginBottom: Spacing.huge,
        minHeight: 88,
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
    signinButton: {
        marginTop: Spacing.huge,
    },
};

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            invalid: false,
            userNameFocused: false,
            passwordFocused: false,
        };

        const { dispatch } = props;
        dispatch(resetAuth());
    }

    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.SignIn',
            },
        });
    };

    changeUserName(newValue) {
        this.setState({
            username: newValue,
        });
    }

    changePassword(newValue) {
        this.setState({
            password: newValue,
        });
    }

    register() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.app.Register',
            },
        });
    }

    userNameFocused(hasFocus) {
        this.setState({
            userNameFocused: hasFocus,
        });
    }

    passwordFocused(hasFocus) {
        this.setState({
            passwordFocused: hasFocus,
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
                <Aura />
                <Image source={{ uri: 'logo-aura' }} style={styles.logo} />
                {(this.state.invalid || this.props.authState === 'failed') && (
                    <View style={styles.invalid}>
                        <Text style={styles.invalidText}>{Strings.signin.invalid}</Text>
                    </View>
                )}
                <View style={styles.inputs}>
                    <FlareTextInput
                        autoCapitalize="none"
                        placeholder={Strings.signin.usernamePrompt}
                        value={this.state.username}
                        onChangeText={v => this.changeUserName(v)}
                        onFocus={() => this.userNameFocused(true)}
                        onBlur={() => this.userNameFocused(false)}
                        keyboardType="email-address"
                        returnKeyType="next"
                    />
                    <FlareTextInput
                        autoCapitalize="none"
                        placeholder={Strings.signin.passwordPrompt}
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={v => this.changePassword(v)}
                        onFocus={() => this.passwordFocused(true)}
                        onBlur={() => this.passwordFocused(false)}
                        returnKeyType="done"
                        onSubmitEditing={() => this.startSignIn()}
                    />
                    <Button
                        secondary
                        title={Strings.signin.forgotPassword}
                        onPress={() => Linking.openURL('https://app.flarejewelry.co/reset')}
                        invisible={this.state.userNameFocused || this.state.passwordFocused}
                    />
                    <Button
                        primary
                        onPress={() => this.startSignIn()}
                        title={Strings.signin.signInLabel}
                        styleBackground={styles.signinButton}
                        invisible={this.props.authState === 'requested'}
                    />
                </View>
                <View style={styles.loadingContainer}>
                    {this.props.authState === 'requested' && <ActivityIndicator color={Colors.white} />}
                </View>
                {this.props.authState !== 'requested' && (
                    <View style={styles.buttons}>
                        <Button
                            secondary
                            title={Strings.signin.register}
                            onPress={() => this.register()}
                            invisible={
                                this.props.authState === 'requested' ||
                                this.state.userNameFocused ||
                                this.state.passwordFocused
                            }
                        />
                    </View>
                )}
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(state) {
    return {
        authState: state.user.authState,
        devices: state.user.devices,
    };
}

export default connect(mapStateToProps)(SignIn);
