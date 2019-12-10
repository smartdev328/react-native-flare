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

const Signin = ({ close, authState, signIn, resetAuth }) => {
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const goToPassword = React.useMemo(
        () => () => passwordRef.current.focus(),
        [passwordRef]
    );

    const togglePassword = React.useMemo(() => () => setShowPassword(b => !b), [
        setShowPassword,
    ]);

    const renderAccessory = React.useMemo(
        () => () => (
            <TouchableOpacity onPress={togglePassword}>
                <Icon
                    style={styles.accessory}
                    name={showPassword ? 'eye-with-line' : 'eye'}
                />
            </TouchableOpacity>
        ),
        [togglePassword, showPassword]
    );

    const emailChange = text => {
        setEmail(text);
        resetAuth();
    };

    const passwordChange = text => {
        setPassword(text);
        resetAuth();
    };

    const submit = () => {
        if (
            typeof email === 'string' &&
            typeof password === 'string' &&
            email.length > 0 &&
            password.length > 0
        ) {
            signIn(email, password);
        }
    };

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
                    ref={emailRef}
                    label="Email address"
                    textColor={Colors.white}
                    tintColor={Colors.white}
                    baseColor={Colors.white}
                    autoCapitalize="none"
                    onSubmitEditing={goToPassword}
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    enablesReturnKeyAutomatically
                    onChangeText={emailChange}
                    autoFocus
                />
                <TextField
                    ref={passwordRef}
                    label="Password"
                    textColor={Colors.white}
                    tintColor={Colors.white}
                    baseColor={Colors.white}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    textContentType="password"
                    renderRightAccessory={renderAccessory}
                    enablesReturnKeyAutomatically
                    onChangeText={passwordChange}
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
                    onPress={submit}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const mapStateToProps = state => ({
    authState: state.user.authState,
});

const mapDispatchToProps = {
    signIn: actions.signIn,
    resetAuth: actions.resetAuth,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signin);
