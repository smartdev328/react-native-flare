import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { signIn, resetAuth } from '../actions/authActions';

import Button from '../bits/Button';
import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';

const styles = {
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
        backgroundColor: Colors.theme.blueDark,
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
        margin: Spacing.large,
        marginTop: Spacing.huge,
        resizeMode: 'contain',
    },
    invalid: {
        paddingTop: Spacing.small,
        paddingBottom: Spacing.small,
        paddingLeft: Spacing.large,
        paddingRight: Spacing.large,
        backgroundColor: Colors.theme.blueDark,
    },
    invalidText: {
        color: Colors.white,
    },
    inputs: {
        width: '100%',
        flex: 3,
        paddingLeft: Spacing.medium,
        paddingRight: Spacing.medium,
        alignItems: 'stretch',
        marginBottom: Spacing.huge,
    },
    input: {
        marginBottom: Spacing.tiny,
        backgroundColor: Colors.transparent,
        borderBottomWidth: 2,
        borderBottomColor: Colors.theme.cream,
        fontSize: 20,
        color: Colors.theme.cream,
        height: Spacing.huge,
        minHeight: Spacing.huge,
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
        padding: Spacing.medium,
        flex: 2,
    },
};

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            invalid: false,
        };

        const { dispatch } = props;
        dispatch(resetAuth());
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
                <Image
                    source={require('../assets/flare_white.png')}
                    style={styles.logo}
                />
                {(this.state.invalid || this.props.authState === 'failed') &&
                    <View style={styles.invalid}>
                        <Text style={styles.invalidText}>
                            {Strings.signin.invalid}
                        </Text>
                    </View>
                }
                <View style={styles.inputs}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder={Strings.signin.usernamePrompt}
                        style={styles.input}
                        value={this.state.username}
                        onChangeText={v => this.changeUserName(v)}
                    />
                    <TextInput
                        autoCapitalize="none"
                        placeholder={Strings.signin.passwordPrompt}
                        secureTextEntry
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={v => this.changePassword(v)}
                    />
                </View>
                <View style={styles.loadingContainer}>
                    {this.props.authState === 'requested' &&
                        <ActivityIndicator color={Colors.white} />
                    }
                </View>
                <View style={styles.buttons}>
                    <Button
                        rounded
                        primary
                        onPress={() => this.startSignIn()}
                        title={Strings.signin.signInLabel}
                    />
                </View>
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
