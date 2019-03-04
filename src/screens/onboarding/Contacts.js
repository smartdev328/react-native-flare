import React from 'react';
import {
    Button,
    Text,
    View,
} from 'react-native';
import LottieView from 'lottie-react-native';

import Colors from '../../bits/Colors';
import Strings from '../../locales/en';

export default function getContactsPage(args) {
    let title = null;
    let subtitle = null;
    let image = null;
    let imageSource = null;

    if (args.hasContactsPermission) {
        imageSource = require('../../assets/lotties/checkmark.json');
        ({ title, subtitle } = Strings.onboarding.contacts.hasPermission);
    } else {
        imageSource = require('../../assets/lotties/unlock.json');
        ({ title } = Strings.onboarding.contacts.initial);
        subtitle = (
            <View>
                <Text>{Strings.onboarding.contacts.initial.subtitle}</Text>
                <Button
                    title={Strings.onboarding.contacts.initial.buttonLabel}
                    primary
                    rounded
                    onPress={() => args.chooseCrew()}
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
