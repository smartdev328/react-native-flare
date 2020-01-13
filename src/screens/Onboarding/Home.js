import * as React from 'react';
import {
    Linking,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
} from 'react-native';
import Video from 'react-native-video';

import RoundedButton from '../../bits/RoundedButton';
import Strings from '../../locales/en';
import Colors from '../../bits/Colors';

import logoWhite from '../../assets/logo-white.png';
import animatedBackground from '../../assets/animated-aura.mp4';

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
        color: Colors.theme.cream,
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
            <StatusBar barStyle="light-content" />
            <Video
                style={StyleSheet.absoluteFill}
                repeat
                source={animatedBackground}
                resizeMode="cover"
            />
            <TouchableOpacity style={styles.shopLink} onPress={openShop}>
                <Text style={styles.shopLinkText}>Shop</Text>
            </TouchableOpacity>
            <Image source={logoWhite} style={styles.logo} />
            <View style={styles.spacer} />
            <RoundedButton
                text={Strings.onboarding.signupButton}
                outline
                forceWhiteText
                wrapperStyle={styles.signupButton}
                onPress={onSignUpPressed}
                width={240}
            />
            <RoundedButton
                text={Strings.signin.signInLabel}
                invisible
                forceWhiteText
                wrapperStyle={styles.signinButton}
                onPress={onSignInPressed}
                width={240}
            />
        </SafeAreaView>
    );
};

export default Home;
