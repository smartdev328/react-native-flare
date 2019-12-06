import * as React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

import RoundedButton from '../../bits/RoundedButton';
import Strings from '../../locales/en';

import logoWhite from '../../assets/logo-white.png';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#A8A8A8',
    },
    logo: {
        width: 144,
        height: 62,
        marginTop: 80,
    },
    spacer: {
        flex: 1,
    },
    signupButton: {
        marginBottom: 18,
    },
    signinButton: {
        marginBottom: 30,
    },
});

const Home = ({ onSignUpPressed, onSignInPressed }) => (
    <SafeAreaView style={styles.wrapper}>
        <Image source={logoWhite} style={styles.logo} />
        <View style={styles.spacer} />
        <RoundedButton
            useGradient
            text={Strings.onboarding.signupButton}
            wrapperStyle={styles.signupButton}
            onPress={onSignUpPressed}
        />
        <RoundedButton
            useGradient={false}
            text={Strings.signin.signInLabel}
            wrapperStyle={styles.signinButton}
            onPress={onSignInPressed}
        />
    </SafeAreaView>
);

export default Home;
