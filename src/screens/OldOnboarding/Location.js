import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import CommonTop from '../CommonTop';
import CommonMiddle from './CommonMiddle';
import Type from '../../bits/Type';

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
    warningText: {
        marginLeft: Spacing.huge,
        marginBottom: Spacing.medium,
        fontSize: Type.size.medium,
        color: Colors.white,
    },
    proceedAnywayArea: {
        textAlign: 'center',
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
                <CommonMiddle
                    right
                    bodyText={Strings.onboarding.location.subtitle}
                    imageSource={{ uri: 'onboarding-location' }}
                />
            </View>
        ),
        subtitle: (
            <View style={styles.subtitleContainer}>
                {(!props.locationPrompted || props.locationPermission) && (
                    <View>
                        <Button
                            title={Strings.onboarding.welcome.alwaysAllow}
                            primary
                            onPress={() => props.requestLocationPermission()}
                        />
                    </View>
                )}
                {!props.locationPermission && props.locationPrompted && (
                    <View style={styles.proceedAnywayArea}>
                        <Text style={styles.warningText}>
                            {Strings.onboarding.welcome.locationAlreadyPrompted}
                        </Text>
                        <Button
                            secondary
                            title={
                                Strings.onboarding.welcome
                                    .proceedAnywayButtonLabel
                            }
                            onPress={() => props.onPressNext()}
                        />
                    </View>
                )}
            </View>
        ),
    };
}
