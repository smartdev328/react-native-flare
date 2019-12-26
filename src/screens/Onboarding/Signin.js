import * as React from 'react';
import {
    KeyboardAvoidingView,
    Linking,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

import Aura from '../../bits/Aura';
import WhiteBar from './WhiteBar';
import Headline from './Headline';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import * as actions from '../../actions';

import aura1520 from '../../assets/aura-1520.jpg';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    formContainer: {
        flex: 1,
        paddingLeft: 32,
        paddingRight: 32,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    accessory: {
        color: Colors.white,
        fontSize: 24,
    },
    forgotWrapper: {
        marginTop: 'auto',
        alignSelf: 'center',
    },
    forgotLink: {
        alignSelf: 'center',
        color: Colors.white,
        paddingVertical: 12,
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    buttonWrapper: {
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 32,
    },
});

class Signin extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            showPassword: false,
        };
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentDidMount() {
        const { resetAuth } = this.props;
        resetAuth();
    }

    goToPassword = () => {
        this.passwordRef.current.focus();
    };

    togglePassword = () => {
        this.setState(({ showPassword }) => ({ showPassword: !showPassword }));
    };

    renderAccessory = () => {
        const { showPassword } = this.state;
        return (
            <TouchableOpacity onPress={this.togglePassword}>
                <Icon
                    style={styles.accessory}
                    name={showPassword ? 'eye-with-line' : 'eye'}
                />
            </TouchableOpacity>
        );
    };

    emailChange = text => {
        const { resetAuth } = this.props;
        this.setState({ email: text });
        resetAuth();
    };

    passwordChange = text => {
        const { resetAuth } = this.props;
        this.setState({ password: text });
        resetAuth();
    };

    submit = () => {
        const { signIn } = this.props;
        const { email, password } = this.state;

        if (
            typeof email === 'string' &&
            typeof password === 'string' &&
            email.length > 0 &&
            password.length > 0
        ) {
            signIn(email, password);
        }
    };

    forgotPassword = () => {
        Linking.openURL('https://app.flarejewelry.co/reset');
    };

    render() {
        const { close, authState } = this.props;
        const { showPassword } = this.state;
        const errored = authState === 'failed';

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Aura source={aura1520} />
                <WhiteBar goBack={close} aura />
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.formContainer}
                >
                    <Headline>Sign In</Headline>
                    <TextField
                        ref={this.emailRef}
                        label="Email address"
                        textColor={Colors.white}
                        tintColor={Colors.white}
                        baseColor={Colors.white}
                        errorColor={Colors.error}
                        autoCapitalize="none"
                        onSubmitEditing={this.goToPassword}
                        returnKeyType="next"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        enablesReturnKeyAutomatically
                        onChangeText={this.emailChange}
                        keyboardAppearance="dark"
                        autoFocus
                        error={errored ? ' ' : undefined}
                    />
                    <TextField
                        ref={this.passwordRef}
                        label="Password"
                        textColor={Colors.white}
                        tintColor={Colors.white}
                        baseColor={Colors.white}
                        errorColor={Colors.error}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={this.onSubmit}
                        returnKeyType="done"
                        textContentType="password"
                        renderRightAccessory={this.renderAccessory}
                        enablesReturnKeyAutomatically
                        onChangeText={this.passwordChange}
                        keyboardAppearance="dark"
                        error={
                            errored
                                ? 'Please enter a valid email and password combination.'
                                : undefined
                        }
                    />
                    <TouchableOpacity
                        style={styles.forgotWrapper}
                        onPress={this.forgotPassword}
                    >
                        <Text style={styles.forgotLink}>
                            Forgot your password?
                        </Text>
                    </TouchableOpacity>
                    <RoundedButton
                        inverse
                        text="Sign In"
                        wrapperStyle={styles.buttonWrapper}
                        busy={authState === 'requested'}
                        onPress={this.submit}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ user: { authState } }) => ({
    authState,
});

const mapDispatchToProps = {
    signIn: actions.signIn,
    resetAuth: actions.resetAuth,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signin);
