import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Linking,
    Text,
    ScrollView,
    View,
} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import { connect } from 'react-redux';
import moment from 'moment';
import { Navigation } from 'react-native-navigation';

import { signIn, resetAuth } from '../actions/authActions';
import { syncAccountDetails } from '../actions/index';
import { ACCOUNT_SYNC_INTERVAL } from '../constants/Config';
import Aura from '../bits/Aura';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import getCurrentPosition from '../helpers/location';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
import FlareTextInput from '../bits/FlareTextInput';
import { keyboardOffset } from '../helpers/screen';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    scroller: {
        flex: 1,
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
        marginBottom: Spacing.large,
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

    componentDidMount() {
        this.accountSyncInterval = setInterval(
            () => this.syncAccount(),
            ACCOUNT_SYNC_INTERVAL
        );
    }

    componentDidUpdate(prevProps) {
        /**
         * Show a local notification when we're first requesting a flare
         */
        if (this.props.hasActiveFlare && !prevProps.hasActiveFlare) {
            PushNotificationIOS.requestPermissions();
            PushNotificationIOS.presentLocalNotification({
                alertBody: this.props.crewEventNotificationMessage,
                alertTitle: Strings.notifications.title,
            });
        }
    }

    componentWillUnmount() {
        if (this.accountSyncInterval) {
            clearInterval(this.accountSyncInterval);
        }
    }

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

    /**
     * Submit user location and fetch any account updates.
     */
    syncAccount() {
        // Only submit app status for users who have signed in at least once.
        if (!this.props.analyticsToken) {
            return;
        }

        // Transmit the current state and retrieve any updates from the server.
        getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(position => {
            this.props.dispatch(
                syncAccountDetails({
                    analyticsToken: this.props.analyticsToken,
                    status: {
                        timestamp: moment()
                            .utc()
                            .format('YYYY-MM-DD HH:mm:ss'),
                        latitude: position.latitude,
                        longitude: position.longitude,
                        details: {
                            permissions: this.props.permissions,
                            hardware: this.props.hardware,
                            position,
                        },
                    },
                })
            );
        });
    }

    async startSignIn() {
        const { dispatch } = this.props;
        const { username, password } = this.state;
        if (
            username === null ||
            username.length === 0 ||
            password === null ||
            password.length === 0
        ) {
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

    onSubmitUsernameEditing = () => {
        if (this.passwordRef) {
            this.passwordRef.focus();
        }
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Aura />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scroller}
                >
                    <Image source={{ uri: 'logo-aura' }} style={styles.logo} />
                    {(this.state.invalid ||
                        this.props.authState === 'failed') && (
                        <View style={styles.invalid}>
                            <Text style={styles.invalidText}>
                                {Strings.signin.invalid}
                            </Text>
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
                            onSubmitEditing={this.onSubmitUsernameEditing}
                            keyboardType="email-address"
                            returnKeyType="next"
                        />
                        <FlareTextInput
                            inputRef={ref => {
                                this.passwordRef = ref;
                            }}
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
                            onPress={() =>
                                Linking.openURL(
                                    'https://app.flarejewelry.co/reset'
                                )
                            }
                            invisible={
                                this.state.userNameFocused ||
                                this.state.passwordFocused
                            }
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
                        {this.props.authState === 'requested' && (
                            <ActivityIndicator color={Colors.white} />
                        )}
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
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
function mapStateToProps(state) {
    return {
        activatingFlareState: state.user.activatingFlareState,
        hasActiveFlare: state.user.hasActiveFlare,
        analyticsToken: state.user.analyticsToken,
        authState: state.user.authState,
        crewEventNotificationMessage: state.user.settings.promptMessage,
        devices: state.user.devices,
        permissions: state.user.permissions,
    };
}

export default connect(mapStateToProps)(SignIn);
