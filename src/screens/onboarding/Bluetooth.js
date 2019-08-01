import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import Colors from '../../bits/Colors';
import CommonBottom from './CommonBottom';
import CommonMiddle from './CommonMiddle';
import CommonTop from './CommonTop';
import Strings from '../../locales/en';

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export default function BlueToothPage(props) {
    let image = null;
    let imageSource = null;
    let bottomComponent = null;

    if (props.ownedDevices.indexOf(props.highestPressCount.deviceID) !== -1) {
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
