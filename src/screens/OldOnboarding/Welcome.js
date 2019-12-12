import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../../bits/Colors';
import Strings from '../../locales/en';
import CommonTop from '../CommonTop';
import CommonMiddle from './CommonMiddle';
import CommonBottom from './CommonBottom';
import Button from '../../bits/Button';

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

export default function getWelcomePage(props) {
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
                <CommonBottom
                    left
                    bodyText={Strings.onboarding.welcome.subtitle}
                    body={
                        <View>
                            <Button
                                title={Strings.onboarding.welcome.buttonLabel}
                                primary
                                onPress={() => props.onPressNext()}
                            />
                        </View>
                    }
                />
            </View>
        ),
    };
}
