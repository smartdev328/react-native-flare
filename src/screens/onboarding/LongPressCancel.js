import React from 'react';
import {
    Button,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { LONG_PRESS_CANCEL_PIN_LENGTH } from '../../constants';
import Colors from '../../bits/Colors';
import Strings from '../../locales/en';

const styles = StyleSheet.create({});

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
                <Text>{Strings.onboarding.longPressCancel.initial.subtitle}</Text>
                <TextInput
                    autoCapitalize="characters"
                    placeholder={Strings.onboarding.longPressCancel.pinPlaceholder}
                    onChangeText={v => args.changeCancelPIN(v)}
                    maxLength={LONG_PRESS_CANCEL_PIN_LENGTH}
                    value={args.pin}
                    style={styles.pinInput}
                    secureTextEntry
                />
                <Button
                    title={Strings.onboarding.longPressCancel.initial.buttonLabel}
                    primary
                    rounded
                    onPress={() => args.setCancelPIN()}
                    disabled={args.pin.length < LONG_PRESS_CANCEL_PIN_LENGTH}
                />
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
            />);
    }

    return {
        backgroundColor: Colors.white,
        image,
        title,
        subtitle,
    };
}
