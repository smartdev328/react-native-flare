import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LONG_PRESS_CANCEL_PIN_LENGTH } from '../../constants';
import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import CommonBottom from './CommonBottom';
import CommonTop from './CommonTop';
import CommonMiddle from './CommonMiddle';
import FlareAlert from '../../bits/FlareAlert';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import FlareTextInput from '../../bits/FlareTextInput';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    subtitleArea: {
        paddingHorizontal: Spacing.medium,
    },
    titleContainer: {
        width: '100%',
    },
    subtitleText: {
        marginBottom: Spacing.medium,
        color: Colors.white,
        fontSize: Type.size.medium,
    },
    pinInputArea: {
        margin: Spacing.medium,
    },
});

export default function getLongPressCancelPage(props) {
    let title = null;
    let subtitle = null;

    if (props.hasSetPin) {
        ({ title, subtitle } = Strings.onboarding.longPressCancel.hasSetPin);
    } else {
        ({ title } = Strings.onboarding.longPressCancel.initial);
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.longPressCancel.initial.subtitle}</Text>
                </View>
                {props.setPinErrorMessage && <FlareAlert variant="info" message={props.setPinErrorMessage} />}
                <View style={styles.pinInputArea}>
                    <FlareTextInput
                        autoCapitalize="characters"
                        placeholder={Strings.onboarding.longPressCancel.pinPlaceholder}
                        onChangeText={v => props.changeCancelPIN(v)}
                        maxLength={LONG_PRESS_CANCEL_PIN_LENGTH}
                        value={props.pin}
                        secureTextEntry
                        keyboardType="phone-pad"
                    />
                    <FlareTextInput
                        autoCapitalize="characters"
                        placeholder={Strings.onboarding.longPressCancel.pinConfirmPlaceholder}
                        onChangeText={v => props.changeConfirmCancelPIN(v)}
                        maxLength={LONG_PRESS_CANCEL_PIN_LENGTH}
                        value={props.confirmPin}
                        secureTextEntry
                        keyboardType="phone-pad"
                    />
                    <Button
                        title={Strings.onboarding.longPressCancel.initial.buttonLabel}
                        onPress={() => props.setCancelPIN()}
                        disabled={props.setPinButtonEnabled}
                        primary
                    />
                </View>
            </View>
        );
    }

    return {
        backgroundColor: Colors.theme.peach,
        image: (
            <View>
                <CommonTop />
            </View>
        ),
        title: (
            <View style={styles.titleContainer}>
                {props.hasSetPin && (
                    <CommonMiddle center title={title} imageSource={{ uri: 'onboarding-cancelflare' }} />
                )}
                {!props.hasSetPin && <CommonMiddle center form={subtitle} />}
            </View>
        ),
        subtitle: (
            <View>
                {props.hasSetPin && (
                    <View>
                        <CommonBottom center bodyText={subtitle} />
                        <Button
                            title={Strings.onboarding.longPressCancel.hasSetPin.buttonLabel}
                            primary
                            onPress={() => props.onPressNext()}
                        />
                    </View>
                )}
            </View>
        ),
    };
}
