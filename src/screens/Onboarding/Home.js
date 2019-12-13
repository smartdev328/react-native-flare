import * as React from 'react';
import {
    Linking,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Voguing from './Voguing';
import RoundedButton from '../../bits/RoundedButton';
import Strings from '../../locales/en';
import Colors from '../../bits/Colors';

import logoWhite from '../../assets/logo-white.png';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    shopLink: {
        alignSelf: 'flex-end',
        marginHorizontal: 16,
        height: 40,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shopLinkText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    logo: {
        width: 144,
        height: 62,
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

const Home = ({ onSignUpPressed, onSignInPressed }) => {
    const openShop = React.useCallback(() => {
        Linking.openURL('https://getflare.com/');
    }, []);

    return (
        <SafeAreaView style={styles.wrapper}>
            <Voguing />
            <TouchableOpacity style={styles.shopLink} onPress={openShop}>
                <Text style={styles.shopLinkText}>Shop</Text>
            </TouchableOpacity>
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
};

export default Home;
