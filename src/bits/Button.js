import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 2,
        alignSelf: 'center',
        height: 60,
        minHeight: 60,
        maxHeight: 60,
    },
    left: {
        alignSelf: 'flex-start',
    },
    text: {
        fontWeight: '900',
        lineHeight: 60,
        height: 60,
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
                props.left && styles.left,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    props.primary && styles.primaryForeground,
                ]}
                allowFontScaling={false}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
