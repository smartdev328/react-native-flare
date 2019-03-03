import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { DEVICE_TWO_FACTOR_LABEL_LENGTH } from '../../constants';
import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import FlareDeviceID from '../../bits/FlareDeviceID';
import JewelryLabelPreview from '../../bits/JewelryLabelPreview';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';
import Strings from '../../locales/en';

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

export default function getBluetoothPage(args) {
    let title = null;
    let subtitle = null;
    let image = null;
    let imageSource = null;

    if (!args.bluetoothEnabled) {
        // bluetooth is disabled
        imageSource = require('../../assets/lotties/hmm.json');
        ({ title, subtitle } = Strings.onboarding.noBluetooth);
    } else if (args.deviceHasBeenClaimed) {
        imageSource = require('../../assets/lotties/gift.json');
        ({ title, subtitle } = Strings.onboarding.shortPress.deviceClaimed);
    } else if (args.chosenDeviceID) {
        image = (
            <View style={styles.image}>
                <JewelryLabelPreview
                    deviceID={FlareDeviceID.getJewelryLabelFromDeviceID(args.chosenDeviceID)}
                    circleTwoFactor
                    containerStyle={styles.jewelryPreview}
                />
            </View>);
        ({ title } = Strings.onboarding.shortPress.chosenDevice);
        subtitle = (
            <View style={styles.bluetoothConfirm}>
                <Text style={styles.confirmInstructions}>
                    {Strings.onboarding.shortPress.chosenDevice.subtitle}
                </Text>
                <TextInput
                    autoCapitalize="characters"
                    placeholder={Strings.jewelry.addNewConfirm.placeholderTwoFactor}
                    onChangeText={v => args.changeTwoFactorText(v)}
                    maxLength={DEVICE_TWO_FACTOR_LABEL_LENGTH}
                    value={args.secondFactor}
                    style={styles.secondFactorInput}
                />
                <Button
                    primary
                    rounded
                    title={Strings.onboarding.shortPress.singleDevice.buttonLabel}
                    onPress={() => args.claimDevice()}
                />
            </View>
        );
    } else if (args.multipleDevicesBroadcasting) {
        // too many devices transmitting to know for sure which one belongs to user
        imageSource = require('../../assets/lotties/hmm.json');
        ({ title, subtitle } = Strings.onboarding.shortPress.multipleDevices);
    } else if (args.highestPressCount.deviceID) {
        // one good device transmitting
        imageSource = require('../../assets/lotties/dino-dance.json');
        ({ title } = Strings.onboarding.shortPress.singleDevice);
        subtitle = (
            <View>
                <Text style={styles.foundJewelryIntro}>
                    {Strings.onboarding.shortPress.singleDevice.subtitleStart}
                </Text>
                <Text style={styles.foundJewelryID}>
                    {FlareDeviceID.getJewelryLabelFromDeviceID(args.highestPressCount.deviceID)}
                </Text>
                {args.claimingDevice &&
                    <ActivityIndicator />
                }
                {!args.claimingDevice &&
                    <Button
                        primary
                        rounded
                        title={Strings.onboarding.shortPress.singleDevice.buttonLabel}
                        onPress={() => args.chooseThisDevice(args.highestPressCount.deviceID)}
                    />
                }
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
            />);
    }

    return {
        backgroundColor: Colors.white,
        image,
        title,
        subtitle,
    };
}
