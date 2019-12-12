import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Aura from '../../bits/Aura';
import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import CommonTop from '../CommonTop';
import CommonMiddle from './CommonMiddle';
import Spacing from '../../bits/Spacing';
import Strings from '../../locales/en';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    outerContainer: {
        padding: Spacing.medium,
        minHeight: '60%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    innerContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.theme.cream,
        padding: Spacing.medium,
        justifyContent: 'space-between',
    },
    p: {
        marginVertical: Spacing.small,
        fontSize: Type.size.medium,
    },
    b: {
        fontWeight: 'bold',
    },
});

export default function getFlareExamplePage(props) {
    let subtitle = null;
    const {
        flareName,
        first,
        second,
        third,
    } = Strings.onboarding.flareExample.story;
    subtitle = (
        <View style={styles.outerContainer}>
            <Aura source="aura-5" />
            <View style={styles.innerContainer}>
                {!props.locationEnabled && props.locationPrompted && (
                    <View>
                        <Text>
                            {Strings.onboarding.flareExample.locationDisabled}
                        </Text>
                    </View>
                )}
                <View>
                    <Text style={styles.p}>
                        <Text style={styles.b}>{flareName}</Text>
                        {first}
                    </Text>
                    <Text style={styles.p}>
                        <Text style={styles.b}>{flareName}</Text>
                        {second}
                    </Text>
                    <Text style={styles.p}>
                        <Text style={styles.b}>{flareName}</Text>
                        {third}
                    </Text>
                </View>
                <Button
                    title={Strings.onboarding.flareExample.buttonLabel}
                    onPress={() => props.onCancelFlare()}
                    primary
                    dark
                />
            </View>
        </View>
    );

    return {
        backgroundColor: Colors.theme.peach,
        image: <CommonTop />,
        title: <CommonMiddle center form={subtitle} />,
        subtitle: <View />,
    };
}
