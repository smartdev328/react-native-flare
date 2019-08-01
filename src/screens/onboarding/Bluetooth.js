import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { DEVICE_TWO_FACTOR_LABEL_LENGTH } from '../../constants';
import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import CommonBottom from './CommonBottom';
import CommonMiddle from './CommonMiddle';
import CommonTop from './CommonTop';
import FlareDeviceID from '../../bits/FlareDeviceID';
import JewelryLabelPreview from '../../bits/JewelryLabelPreview';
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
    let subtitle = null;
    let image = null;
    let imageSource = null;
    let bottomComponent = null;

    if (props.ownedDevices.indexOf(props.highestPressCount.deviceID) !== -1) {
        // one good device transmitting
        imageSource = require('../../assets/lotties/dino-dance.json');
        subtitle = (
            <View>
                <Text style={styles.foundJewelryIntro}>{Strings.onboarding.shortPress.singleDevice.subtitleStart}</Text>
                <Text style={styles.foundJewelryID}>
                    {FlareDeviceID.getJewelryLabelFromDeviceID(props.highestPressCount.deviceID)}
                </Text>
                {props.claimingDevice && <ActivityIndicator />}
                {!props.claimingDevice && (
                    <Button
                        primary
                        title={Strings.onboarding.shortPress.singleDevice.buttonLabel}
                        onPress={() => props.chooseThisDevice(props.highestPressCount.deviceID)}
                    />
                )}
            </View>
        );
        bottomComponent = <CommonBottom right body={subtitle} />;
    } else {
        // no devices found yet
        imageSource = require('../../assets/lotties/ripple.json');
        ({ subtitle } = Strings.onboarding.shortPress);
        bottomComponent = <CommonBottom right bodyText={subtitle} />;
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
