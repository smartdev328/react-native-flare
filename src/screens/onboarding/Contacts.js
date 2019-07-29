import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import CommonBottom from './CommonBottom';
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

export default function getContactsPage(props) {
    let subtitle = null;
    let image = null;
    let lottieSource = null;
    let imageUri = null;

    if (props.hasContactsPermission && props.crews && props.crews.length) {
        /**
         * User has given contacts access and has chosen a crew
         */
        lottieSource = require('../../assets/lotties/checkmark.json');
        ({ title, subtitle } = Strings.onboarding.contacts.hasCrew);
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.contacts.hasCrew.subtitle}</Text>
                </View>
                <Button
                    title={Strings.onboarding.contacts.hasCrew.buttonLabel}
                    primary
                    onPress={() => props.endOnboarding()}
                />
            </View>
        );
    } else if (props.hasContactsPermission) {
        lottieSource = require('../../assets/lotties/checkmark.json');
        ({ title } = Strings.onboarding.contacts.hasPermission);
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.contacts.hasPermission.subtitle}</Text>
                </View>
                <Button
                    title={Strings.onboarding.contacts.hasPermission.chooseCrewLabel}
                    primary
                    onPress={() => props.chooseCrew()}
                />
            </View>
        );
    } else {
        imageUri = { uri: 'onboarding-contacts' };
        ({ title } = Strings.onboarding.contacts.initial);
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

    if (lottieSource) {
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
    }

    return {
        backgroundColor: Colors.theme.purple,
        image: <CommonTop />,
        title: lottieSource ? <CommonMiddle right image={image} /> : <CommonMiddle right imageSource={imageUri} />,
        subtitle,
    };
}
