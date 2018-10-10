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
        alignSelf: 'center',
        height: 60,
        minHeight: 60,
        maxHeight: 60,
    },
    text: {
        fontWeight: '900',
        lineHeight: 60,
        height: 60,
        minHeight: 60,
        maxHeight: 60,
    },
    fullWidth: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    primaryBackground: {
        backgroundColor: Colors.theme.pink,
        padding: Spacing.large,
    },
    primaryForeground: {
        color: Colors.white,
    },
    rounded: {
        borderRadius: 32,
    },
    simple: {
    },
    simpleForeground: {
        color: Colors.theme.purple,
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
                props.simple && styles.simple,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    props.primary && styles.primaryForeground,
                    props.simple && styles.simpleForeground,
                ]}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
