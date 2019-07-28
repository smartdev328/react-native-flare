import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { LONG_PRESS_CANCEL_PIN_LENGTH } from '../../constants';
import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    subtitleArea: {
        paddingHorizontal: Spacing.medium,
    },
    subtitleText: {
        marginBottom: Spacing.medium,
    },
    pinInputArea: {
        margin: Spacing.medium,
    },
    pinInputField: {
        fontSize: Type.size.large,
        padding: Spacing.small,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Colors.theme.pink,
        marginBottom: Spacing.large,
    },
});

export default function getLongPressCancelPage(args) {
    let title = null;
    let subtitle = null;
    let image = null;
    let imageSource = null;

    if (args.hasSetPin) {
        imageSource = require('../../assets/lotties/safe.json');
        ({ title, subtitle } = Strings.onboarding.longPressCancel.hasSetPin);
    } else {
        imageSource = require('../../assets/lotties/unlock.json');
        ({ title } = Strings.onboarding.longPressCancel.initial);
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.longPressCancel.initial.subtitle}</Text>
                </View>
                <View style={styles.pinInputArea}>
                    <TextInput
                        autoCapitalize="characters"
                        placeholder={Strings.onboarding.longPressCancel.pinPlaceholder}
                        onChangeText={v => args.changeCancelPIN(v)}
                        maxLength={LONG_PRESS_CANCEL_PIN_LENGTH}
                        value={args.pin}
                        style={styles.pinInputField}
                        secureTextEntry
                    />
                    <Button
                        title={Strings.onboarding.longPressCancel.initial.buttonLabel}
                        onPress={() => args.setCancelPIN()}
                        disabled={args.pin.length < LONG_PRESS_CANCEL_PIN_LENGTH}
                        primary
                        rounded
                    />
                </View>
            </View>
        );
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
        backgroundColor: Colors.theme.peach,
        image,
        title,
        subtitle,
    };
}
