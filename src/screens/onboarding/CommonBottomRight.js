import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        marginRight: Spacing.huge,
    },
    logo: {
        width: 180,
        height: 64,
        resizeMode: 'contain',
    },
    bodyText: {
        fontSize: Type.size.medium,
        textAlign: 'right',
        color: Colors.white,
        width: '50%',
    },
});

export default function CommonBottomRight(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.bodyText}>{props.bodyText}</Text>
        </View>
    );
}
