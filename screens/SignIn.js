import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { Button, Image, Text, TextInput, View } from '@shoutem/ui';
import RadialGradient from 'react-native-radial-gradient';

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
        backgroundColor: Colors.theme.purple,
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
        margin: Spacing.large,
        resizeMode: 'contain',
    },
    invalid: {
        paddingTop: Spacing.small,
        paddingBottom: Spacing.small,
        paddingLeft: Spacing.large,
        paddingRight: Spacing.large,
        backgroundColor: Colors.theme.purple,
    },
    invalidText: {
        color: Colors.white,
    },
    inputs: {
        width: '100%',
        paddingLeft: Spacing.medium,
        paddingRight: Spacing.medium,
        alignItems: 'stretch',
        marginBottom: Spacing.huge,
    },
    input: {
        marginBottom: Spacing.tiny,
    },
    buttons: {
        marginBottom: Spacing.huge + Spacing.huge,
    },
};

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            invalid: false,
        };

        this.props.screenProps.flareAPI.resetAuthentication();
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
        const { flareAPI } = this.props.screenProps;
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

        const response = await flareAPI.signIn(username, password);
        if (response === false) {
            this.setState({
                invalid: true,
            });
        } else {
            this.setState({
                invalid: false,
            });
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <RadialGradient
                    style={styles.backgroundGradient}
                    colors={[Colors.theme.orangeDark, Colors.theme.purple]}
                    radius={300}
                />
                <Image
                    source={require('../assets/FLARE-white.png')}
                    style={styles.logo}
                />
                {this.state.invalid &&
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
                <View style={styles.buttons}>
                    <Button styleName="secondary" onPress={() => this.startSignIn()}>
                        <Text>{Strings.signin.signInLabel}</Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
