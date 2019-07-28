import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import CommonTop from './CommonTop';
import CommonMiddleRight from './CommonMiddleRight';
import CommonBottomRight from './CommonBottomRight';

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleContainer: {
        width: '100%',
    },
    subtitleContainer: {
        width: '100%',
    },
});

export default function getWelcomePage() {
    return {
        backgroundColor: Colors.theme.purple,
        image: (
            <View style={styles.imageContainer}>
                <CommonTop />
            </View>
        ),
        title: (
            <View style={styles.titleContainer}>
                <CommonMiddleRight title={Strings.onboarding.welcome.title} imageSource="onboarding-welcome" />
            </View>
        ),
        subtitle: (
            <View style={styles.subtitleContainer}>
                <CommonBottomRight bodyText={Strings.onboarding.welcome.subtitle} />
            </View>
        ),
    };
}
