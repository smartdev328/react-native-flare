import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';
import Type from './Type';

const topRadius = 7;

const styles = StyleSheet.create({
    input: {
        marginBottom: Spacing.small,
        paddingHorizontal: Spacing.smallish,
        paddingVertical: Spacing.medium,
        backgroundColor: Colors.theme.cream,
        borderBottomWidth: 2,
        borderBottomColor: Colors.theme.purple,
        borderRightColor: Colors.theme.peach,
        fontSize: Type.size.smallish,
        color: Colors.black,
        textAlign: 'center',
        borderTopLeftRadius: topRadius,
        borderTopRightRadius: topRadius,
        minHeight: 52,
    },
    disabled: {
        backgroundColor: Colors.themeExtended.creamDark,
        borderBottomColor: Colors.black,
    },
});

export default function FlareTextInput(props) {
    return (
        <TextInput
            {...props}
            editable={!props.disabled}
            placeholderTextColor={Colors.grey}
            style={[styles.input, props.disabled && styles.disabled]}
        />
    );
}
