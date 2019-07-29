import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import LottieView from 'lottie-react-native';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import CommonTop from './CommonTop';
import CommonMiddle from './CommonMiddle';

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
        marginTop: Spacing.large,
    },
});

export default function getLocationPage(props) {
    return {
        backgroundColor: Colors.theme.purple,
        image: (
            <View style={styles.imageContainer}>
                <CommonTop />
            </View>
        ),
        title: (
            <View style={styles.titleContainer}>
                <CommonMiddle right body={Strings.onboarding.location.subtitle} imageSource="onboarding-location" />
            </View>
        ),
        subtitle: (
            <View style={styles.subtitleContainer}>
                {(!props.permissions || !props.permissions.location) && (
                    <Button
                        title={Strings.onboarding.welcome.alwaysAllow}
                        primary
                        rounded
                        onPress={() => props.requestLocationPermission()}
                    />
                )}
                {props.permissions.location && (
                    <LottieView
                        source={require('../../assets/lotties/checkmark.json')}
                        autoPlay
                        loop={false}
                        resizeMode="center"
                        style={{
                            alignSelf: 'center',
                            height: 96,
                        }}
                    />
                )}
            </View>
        ),
    };
}
