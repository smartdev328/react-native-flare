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
    let title = null;
    let subtitle = null;
    let image = null;
    let imageSource = null;

    if (!props.bluetoothEnabled) {
        // bluetooth is disabled
        imageSource = require('../../assets/lotties/hmm.json');
        ({ title, subtitle } = Strings.onboarding.noBluetooth);
    } else if (props.deviceHasBeenClaimed) {
        imageSource = require('../../assets/lotties/gift.json');
        ({ title, subtitle } = Strings.onboarding.shortPress.deviceClaimed);
    } else if (props.chosenDeviceID) {
        image = (
            <View style={styles.image}>
                <JewelryLabelPreview
                    deviceID={FlareDeviceID.getJewelryLabelFromDeviceID(props.chosenDeviceID)}
                    circleTwoFactor
                    containerStyle={styles.jewelryPreview}
                />
            </View>
        );
        ({ title } = Strings.onboarding.shortPress.chosenDevice);
        subtitle = (
            <View style={styles.bluetoothConfirm}>
                <Text style={styles.confirmInstructions}>{Strings.onboarding.shortPress.chosenDevice.subtitle}</Text>
                <TextInput
                    autoCapitalize="characters"
                    placeholder={Strings.jewelry.addNewConfirm.placeholderTwoFactor}
                    onChangeText={v => props.changeTwoFactorText(v)}
                    maxLength={DEVICE_TWO_FACTOR_LABEL_LENGTH}
                    value={props.secondFactor}
                    style={styles.secondFactorInput}
                />
                <Button
                    primary
                    rounded
                    title={Strings.onboarding.shortPress.singleDevice.buttonLabel}
                    onPress={() => props.claimDevice()}
                />
            </View>
        );
    } else if (props.multipleDevicesBroadcasting) {
        // too many devices transmitting to know for sure which one belongs to user
        imageSource = require('../../assets/lotties/hmm.json');
        ({ title, subtitle } = Strings.onboarding.shortPress.multipleDevices);
    } else if (props.highestPressCount.deviceID) {
        // one good device transmitting
        imageSource = require('../../assets/lotties/dino-dance.json');
        ({ title } = Strings.onboarding.shortPress.singleDevice);
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
                        rounded
                        title={Strings.onboarding.shortPress.singleDevice.buttonLabel}
                        onPress={() => props.chooseThisDevice(props.highestPressCount.deviceID)}
                    />
                )}
            </View>
        );
    } else {
        // no devices found yet
        imageSource = require('../../assets/lotties/ripple.json');
        ({ title, subtitle } = Strings.onboarding.shortPress);
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
        subtitle: (
            <View style={styles.subtitleContainer}>
                <CommonBottom right bodyText={subtitle} />
            </View>
        ),
    };
}
