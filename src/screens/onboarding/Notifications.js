import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import Strings from '../../locales/en';
import CommonTop from './CommonTop';
import CommonMiddle from './CommonMiddle';
import CommonBottom from './CommonBottom';

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
    },
    subtitleContainer: {
        width: '100%',
    },
});

export default function getNotificationsPage(props) {
    return {
        backgroundColor: Colors.theme.purple,
        image: <CommonTop />,
        title: (
            <View style={styles.titleContainer}>
                <CommonMiddle center imageSource={{ uri: 'onboarding-notification' }} />
            </View>
        ),
        subtitle: (
            <View style={styles.subtitleContainer}>
                {!props.notificationPrompted && (
                    <CommonBottom
                        center
                        bodyText={Strings.onboarding.notifications.subtitle}
                        body={
                            <Button
                                title={Strings.onboarding.notifications.buttonLabel}
                                primary
                                onPress={() => props.requestNotificationsPermission()}
                            />
                        }
                    />
                )}
                {props.notificationPrompted && !props.notificationEnabled && (
                    <CommonBottom
                        center
                        bodyText={Strings.onboarding.notifications.disabled.subtitle}
                        body={
                            <Button
                                title={Strings.onboarding.notifications.disabled.buttonLabel}
                                secondary
                                onPress={() => props.onPressNext()}
                            />
                        }
                    />
                )}
            </View>
        ),
    };
}
