import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';
import Type from './Type';

const styles = StyleSheet.create({
    container: {
        margin: Spacing.medium,
        padding: Spacing.smallish,
        borderRadius: 7,
    },
    warningBackground: {
        backgroundColor: Colors.red,
    },
    infoBackground: {
        backgroundColor: Colors.theme.blue,
    },
    foreground: {
        color: Colors.white,
        fontSize: Type.size.small,
    },
});

export default function FlareAlert(props) {
    return (
        <View style={[styles.container, styles[`${props.variant}Background`]]}>
            <Text style={styles.foreground}>{props.message}</Text>
        </View>
    );
}
