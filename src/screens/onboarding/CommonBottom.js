import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    left: {
        marginRight: Spacing.huge,
        alignItems: 'flex-end',
    },
    right: {
        marginLeft: Spacing.huge,
        alignItems: 'flex-start',
    },
    logo: {
        width: 180,
        height: 64,
        resizeMode: 'contain',
    },
    bodyText: {
        fontSize: Type.size.medium,
        color: Colors.white,
        width: '50%',
    },
    bodyTextLeft: {
        textAlign: 'right',
    },
    bodyTextRight: {
        textAlign: 'left',
    },
});

export default function CommonBottom(props) {
    return (
        <View style={[styles.container, props.left && styles.left, props.right && styles.right]}>
            <Text style={[styles.bodyText, props.left && styles.bodyTextLeft, props.right && styles.bodyTextRight]}>
                {props.bodyText}
            </Text>
        </View>
    );
}
