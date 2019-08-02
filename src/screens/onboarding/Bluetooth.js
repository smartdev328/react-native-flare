import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import Colors from '../../bits/Colors';
import CommonBottom from './CommonBottom';
import CommonMiddle from './CommonMiddle';
import CommonTop from './CommonTop';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    bluetoothConfirm: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
    },
    bluetoothImageComponent: {
        display: 'flex',
        width: 292,
        height: 292,
        justifyContent: 'center',
    },
    confirmInstructions: {
        marginBottom: Spacing.medium,
    },
    secondFactorInput: {
        fontSize: Type.size.large,
        padding: Spacing.small,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Colors.theme.pink,
        marginBottom: Spacing.large,
    },
    jewelryPreview: {
        alignSelf: 'center',
        width: 300,
        height: 75,
        maxHeight: 75,
        borderRadius: 16,
    },
});

export default function getBluetoothPage(props) {
    let image = null;
    let imageSource = null;
    let bottomComponent = null;

    if (props.receivedShortPress) {
        // one good device transmitting
        imageSource = require('../../assets/lotties/dino-dance.json');
        bottomComponent = <CommonBottom right bodyText={Strings.onboarding.shortPress.singleDevice.subtitleStart} />;
    } else {
        // no devices found yet
        imageSource = require('../../assets/lotties/ripple.json');
        bottomComponent = <CommonBottom right bodyText={Strings.onboarding.shortPress.subtitle} />;
    }

    if (imageSource) {
        image = (
            <LottieView
                source={imageSource}
                autoPlay
                loop
                resizeMode="cover"
                style={{
                    width: 292,
                    height: 292,
                }}
            />
        );
    }

    return {
        backgroundColor: Colors.theme.purple,
        image: (
            <View style={styles.imageContainer}>
                <CommonTop />
            </View>
        ),
        title: (
            <View style={styles.titleContainer}>
                <CommonMiddle right image={image} />
            </View>
        ),
        subtitle: <View style={styles.subtitleContainer}>{bottomComponent}</View>,
    };
}
