import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
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

export default function getContactsPage(args) {
    let title = null;
    let subtitle = null;
    let image = null;
    let imageSource = null;

    if (args.hasContactsPermission && args.crews && args.crews.length) {
        /**
         * User has given contacts access and has chosen a crew
         */
        imageSource = require('../../assets/lotties/checkmark.json');
        ({ title, subtitle } = Strings.onboarding.contacts.hasCrew);
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.contacts.hasCrew.subtitle}</Text>
                </View>
                <Button
                    title={Strings.onboarding.contacts.hasCrew.buttonLabel}
                    primary
                    rounded
                    onPress={() => args.endOnboarding()}
                />
            </View>
        );
    } else if (args.hasContactsPermission) {
        imageSource = require('../../assets/lotties/checkmark.json');
        ({ title } = Strings.onboarding.contacts.hasPermission);
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.contacts.hasPermission.subtitle}</Text>
                </View>
                <Button
                    title={Strings.onboarding.contacts.hasPermission.chooseCrewLabel}
                    primary
                    rounded
                    onPress={() => args.chooseCrew()}
                />
            </View>
        );
    } else {
        imageSource = require('../../assets/lotties/unlock.json');
        ({ title } = Strings.onboarding.contacts.initial);
        subtitle = (
            <View>
                <View style={styles.subtitleArea}>
                    <Text style={styles.subtitleText}>{Strings.onboarding.contacts.initial.subtitle}</Text>
                </View>
                <Button
                    title={Strings.onboarding.contacts.initial.buttonLabel}
                    primary
                    rounded
                    onPress={() => args.requestContactsPermission()}
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
            />
        );
    }

    return {
        backgroundColor: Colors.theme.purple,
        image,
        title,
        subtitle,
    };
}
