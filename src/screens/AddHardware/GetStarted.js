import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Headline from '../Onboarding/Headline';
import sharedStyles from './styles';
import RoundedButton from '../../bits/RoundedButton';

import cuff from '../../assets/cuff-v2.png';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    bigSpacer: {
        flexGrow: 1.75,
    },
    spacer: {
        flexGrow: 1,
    },
    headline: {
        width: 233,
        textAlign: 'center',
        marginBottom: 12,
        alignSelf: 'center',
    },
    image: {
        width: 220,
        height: 196,
    },
    spacedButton: {
        marginBottom: 12,
    },
});

const GetStarted = ({ style }) => {
    const howToConnect = () => {
        Navigation.showModal({
            component: {
                name: 'com.flarejewelry.onboarding.addhardware.howtoconnect',
            },
        });
    };

    return (
        <View style={[styles.container, ...style]}>
            <View style={styles.bigSpacer} />
            <Headline style={styles.headline}>
                Let’s connect your Flare cuff
            </Headline>
            <View style={sharedStyles.line} />
            <View style={styles.spacer} />
            <Image source={cuff} style={styles.image} />
            <View style={styles.spacer} />
            <RoundedButton
                wrapperStyle={styles.spacedButton}
                text="Connect via Bluetooth"
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
            <RoundedButton
                text="Enter serial number"
                outline
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
            <RoundedButton
                text="Tell me more"
                onPress={howToConnect}
                invisible
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
        </View>
    );
};

export default GetStarted;
