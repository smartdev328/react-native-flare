import * as React from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
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
    buttonWrapper: {
        alignSelf: 'center',
        marginTop: 'auto',
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

    render() {
        const { close, authState } = this.props;
        const { showPassword } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Aura />
                <WhiteBar goBack={close} />
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
                        autoCapitalize="none"
                        onSubmitEditing={this.goToPassword}
                        returnKeyType="next"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        enablesReturnKeyAutomatically
                        onChangeText={this.emailChange}
                        autoFocus
                    />
                    <TextField
                        ref={this.passwordRef}
                        label="Password"
                        textColor={Colors.white}
                        tintColor={Colors.white}
                        baseColor={Colors.white}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={this.onSubmit}
                        returnKeyType="done"
                        textContentType="password"
                        renderRightAccessory={this.renderAccessory}
                        enablesReturnKeyAutomatically
                        onChangeText={this.passwordChange}
                        error={
                            authState === 'failed'
                                ? 'Please make sure your email address and password are correct'
                                : undefined
                        }
                    />
                    <RoundedButton
                        useGradient
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
