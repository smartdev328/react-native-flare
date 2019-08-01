import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import CommonTop from './CommonTop';
import CommonMiddle from './CommonMiddle';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';

const styles = StyleSheet.create({
    subtitleArea: {
        paddingHorizontal: Spacing.medium,
    },
    subtitleText: {
        marginBottom: Spacing.medium,
    },
});

export default function ContactsPage(props) {
    let subtitle = null;
    let image = null;
    let lottieSource = null;
    let imageUri = null;

    if (props.hasContactsPermission) {
        lottieSource = require('../../assets/lotties/checkmark.json');
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.contacts.hasPermission.subtitle}</Text>
                </View>
                <Button
                    title={Strings.onboarding.contacts.hasPermission.chooseCrewLabel}
                    primary
                    onPress={() => props.endOnboarding()}
                />
            </View>
        );
        image = (
            <LottieView
                source={lottieSource}
                autoPlay
                loop
                resizeMode="cover"
                style={{
                    width: 292,
                    height: 292,
                }}
            />
        );
    } else {
        imageUri = { uri: 'onboarding-contacts' };
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.contacts.initial.subtitle}</Text>
                </View>
                <Button
                    title={Strings.onboarding.contacts.initial.buttonLabel}
                    primary
                    onPress={() => props.requestContactsPermission()}
                />
            </View>
        );
    }

    return {
        backgroundColor: Colors.theme.purple,
        image: <CommonTop />,
        title: lottieSource ? <CommonMiddle right image={image} /> : <CommonMiddle right imageSource={imageUri} />,
        subtitle,
    };
}
