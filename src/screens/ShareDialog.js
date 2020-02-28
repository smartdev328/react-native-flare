import * as React from 'react';
import {
    Clipboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { shareFlare } from '../actions';
import Colors from '../bits/Colors';
import CloseButton from './CloseButton';
import Headline from './Onboarding/Headline';
import RoundedButton from '../bits/RoundedButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.theme.cream,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headline: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.black,
        marginBottom: 0,
        marginTop: 32,
    },
    line: {
        height: 1,
        width: 33,
        marginVertical: 12,
        backgroundColor: Colors.black,
    },
    subhead: {
        width: 300,
        color: Colors.black,
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'Nocturno Display Std',
        textAlign: 'center',
        marginBottom: 48,
    },
    firstButton: {
        marginTop: 'auto',
        marginBottom: 16,
    },
    referralKey: {
        marginLeft: 16,
        marginRight: 'auto',
    },
    copy: {
        marginRight: 16,
    },
    secondButton: {
        marginBottom: 24,
    },
});

const ShareDialog = ({ componentId }) => {
    const dispatch = useDispatch();
    const referralKey = useSelector(({ user }) => user.referralKey);

    const close = React.useCallback(() => {
        Navigation.dismissModal(componentId);
    }, [componentId]);
    const copy = React.useCallback(() => {
        Clipboard.setString(referralKey);
    }, [referralKey]);
    const share = React.useCallback(() => {
        dispatch(shareFlare);
    }, [dispatch]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <CloseButton black onPress={close} />
            <Headline style={styles.headline}>Share Flare!</Headline>
            <View style={styles.line} />
            <Text style={styles.subhead}>
                Invite your friends to join the movement. They can get $50 off
                and celebrate Flare’s launch 🎉
            </Text>
            <RoundedButton
                wrapperStyle={styles.firstButton}
                outline
                onPress={copy}
                width={280}
            >
                <Text style={styles.referralKey}>
                    {`Your referral code: ${referralKey}`}
                </Text>
                <Text style={styles.copy}>Copy</Text>
            </RoundedButton>
            <RoundedButton
                wrapperStyle={styles.secondButton}
                onPress={share}
                text="Send $50"
                width={280}
            />
        </SafeAreaView>
    );
};

export const showShareDialog = () => {
    Navigation.showModal({
        component: {
            name: 'com.flarejewelry.sharedialog',
        },
    });
};

export default ShareDialog;
