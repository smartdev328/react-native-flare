import * as React from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Entypo';

import Aura from '../../bits/Aura';
import WhiteBar from './WhiteBar';
import Headline from './Headline';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';

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

const Signin = ({ close }) => {
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
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
                />
                <RoundedButton
                    useGradient
                    text="Sign In"
                    wrapperStyle={styles.buttonWrapper}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Signin;
