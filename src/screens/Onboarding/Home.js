import * as React from 'react';
import {
    Linking,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';

import RoundedButton from '../../bits/RoundedButton';
import Strings from '../../locales/en';
import Colors from '../../bits/Colors';
import { openSettings } from '../../bits/settingsUrl';
import useBluetoothStatus from '../../bits/useBluetoothStatus';
import { registerPermissionDetection } from '../../bits/NativeEmitters';

import logo from '../../assets/logo-aura-subtle.png';
import iconShop from '../../assets/icon-shop.png';
import animatedBackground from '../../assets/animated-aura.mp4';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    shopLink: {
        alignSelf: 'flex-end',
        paddingHorizontal: 16,
        marginRight: 32,
        marginTop: 32,
        height: 40,
        marginBottom: 72,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    shopLinkIcon: {
        width: 19,
        height: 17,
        marginRight: 8,
    },
    shopLinkText: {
        fontSize: 16,
        color: Colors.theme.cream,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    logo: {
        width: 142,
        height: 55,
    },
    signupButton: {
        marginTop: 'auto',
        marginBottom: 18,
    },
    signinButton: {
        marginBottom: 30,
    },
    forceBluetooth: {
        marginTop: 'auto',
        marginBottom: 18,
        alignSelf: 'stretch',
        marginHorizontal: 32,
        textAlign: 'center',
        fontSize: 14,
        color: Colors.theme.cream,
    },
});

const ForceBluetooth = () => (
    <>
        <Text style={styles.forceBluetooth}>
            Flare requires Bluetooth permission in order to communicate with
            your smart jewelry. Please turn “Bluetooth” on in order to proceed.
        </Text>
        <RoundedButton
            text="Open Settings"
            outline
            forceWhiteText
            wrapperStyle={styles.signinButton}
            onPress={openSettings}
            width={240}
        />
    </>
);

const Buttons = ({ onSignUpPressed, onSignInPressed }) => (
    <>
        <RoundedButton
            text={Strings.onboarding.signupButton}
            neumorphic
            color="#576286"
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
    </>
);

const Home = ({ onSignUpPressed, onSignInPressed }) => {
    const dispatch = useDispatch();
    React.useEffect(() => registerPermissionDetection(dispatch), [dispatch]);

    const bluetoothStatus = useBluetoothStatus();

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
                selectedAudioTrack={{ type: 'disabled' }}
                muted
            />
            <TouchableOpacity style={styles.shopLink} onPress={openShop}>
                <Image style={styles.shopLinkIcon} source={iconShop} />
                <Text style={styles.shopLinkText}>Shop</Text>
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} />
            {bluetoothStatus === 'unauthorized' ? (
                <ForceBluetooth />
            ) : (
                <Buttons
                    onSignUpPressed={onSignUpPressed}
                    onSignInPressed={onSignInPressed}
                />
            )}
        </SafeAreaView>
    );
};

export default Home;
