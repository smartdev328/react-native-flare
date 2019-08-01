import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
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
        marginTop: Spacing.large,
    },
});

export default function getNotificationsPage(props) {
    return {
        backgroundColor: Colors.theme.purple,
        image: (
            <View style={styles.imageContainer}>
                <CommonTop />
            </View>
        ),
        title: (
            <View style={styles.titleContainer}>
                <CommonMiddle center imageSource={{ uri: 'onboarding-notification' }} />
            </View>
        ),
        subtitle: (
            <View style={styles.subtitleContainer}>
                <CommonBottom
                    center
                    bodyText={Strings.onboarding.notifications.subtitle}
                    body={
                        <View>
                            <Button
                                title={Strings.onboarding.notifications.buttonLabel}
                                primary
                                onPress={() => props.requestNotificationsPermission()}
                            />
                        </View>
                    }
                />
            </View>
        ),
    };
}
