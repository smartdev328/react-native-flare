import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import CommonTop from './CommonTop';
import CommonMiddle from './CommonMiddle';
import CommonBottom from './CommonBottom';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        paddingHorizontal: Spacing.medium,
    },
    subtitleContainer: {
        paddingHorizontal: Spacing.medium,
    },
});

export default function getContactsage(props) {
    return {
        backgroundColor: Colors.theme.purple,
        image: <CommonTop />,
        title: (
            <View style={styles.titleContainer}>
                <CommonMiddle center imageSource={{ uri: 'onboarding-contacts' }} />
            </View>
        ),
        subtitle: (
            <View style={styles.subtitleContainer}>
                <CommonBottom
                    center
                    bodyText={Strings.onboarding.contacts.initial.subtitle}
                    body={
                        <Button
                            title={Strings.onboarding.contacts.initial.buttonLabel}
                            primary
                            onPress={() => props.requestContactsPermission()}
                        />
                    }
                />
            </View>
        ),
    };
}
