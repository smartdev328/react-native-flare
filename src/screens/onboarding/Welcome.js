import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../../bits/Colors';
import Strings from '../../locales/en';
import CommonTop from './CommonTop';
import CommonMiddle from './CommonMiddle';
import CommonBottom from './CommonBottom';

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

export default function WelcomePage() {
    return {
        backgroundColor: Colors.theme.purple,
        image: (
            <View style={styles.imageContainer}>
                <CommonTop />
            </View>
        ),
        title: (
            <View style={styles.titleContainer}>
                <CommonMiddle
                    left
                    title={Strings.onboarding.welcome.title}
                    imageSource={{ uri: 'onboarding-welcome' }}
                />
            </View>
        ),
        subtitle: (
            <View style={styles.subtitleContainer}>
                <CommonBottom left bodyText={Strings.onboarding.welcome.subtitle} />
            </View>
        ),
    };
}
