import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: Spacing.medium,
        borderRadius: 2,
        height: Spacing.huge,
        alignSelf: 'center',
    },
    text: {
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
        alignSelf: 'stretch',
    },
    fullWidth: {
        width: '100%',
        height: Spacing.huge,
        flex: 1,
        flexDirection: 'row',
        maxHeight: Spacing.huge,
        minHeight: Spacing.huge,
    },
    primaryBackground: {
        backgroundColor: Colors.theme.pink,
        padding: Spacing.large,
    },
    primaryForeground: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    rounded: {
        borderRadius: 32,
    },
});

function Button(props) {
    return (
        <TouchableOpacity
            onPress={e => props.onPress(e)}
            style={[
                styles.container,
                props.rounded && styles.rounded,
                props.fullWidth && styles.fullWidth,
                props.primary && styles.primaryBackground,
            ]}
        >
            <Text style={[styles.text, props.primary && styles.primaryForeground]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
