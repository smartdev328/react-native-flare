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
        fontSize: Type.size.small,
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
    error: {
        borderBottomColor: Colors.red,
    },
});

const FlareTextInput = ({ disabled, error, inputRef, ...rest }) => (
    <TextInput
        {...rest}
        ref={inputRef}
        editable={!disabled}
        placeholderTextColor={Colors.grey}
        style={[
            styles.input,
            disabled && styles.disabled,
            error && styles.error,
        ]}
    />
);

export default FlareTextInput;
