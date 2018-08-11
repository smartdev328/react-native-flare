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
        maxHeight: Spacing.huge,
        minHeight: Spacing.huge,
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
    },
    schemeWhiteBackground: {
        backgroundColor: Colors.white,
    },
    schemeWhiteForeground: {
        color: Colors.black,
    },
    schemeDefaultBackground: {
        backgroundColor: Colors.theme.red,
    },
    schemeDefaultForeground: {
        color: Colors.white,
    },
    schemeWhiteOutlineBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: Colors.white,
        borderWidth: 1,
    },
    schemeWhiteOutlineForeground: {
        color: Colors.white,
    },
});

function Button(props) {
    let colorSchemeBg = styles.schemeDefaultBackground;
    let colorSchemeFg = styles.schemeDefaultForeground;
    if (props.white) {
        colorSchemeBg = styles.schemeWhiteBackground;
        colorSchemeFg = styles.schemeWhiteForeground;
    } else if (props.whiteOutline) {
        colorSchemeBg = styles.schemeWhiteOutlineBackground;
        colorSchemeFg = styles.schemeWhiteOutlineForeground;
    }

    return (
        <TouchableOpacity
            onPress={e => props.onPress(e)}
            style={[
                styles.container,
                props.fullWidth ? styles.fullWidth : null,
                colorSchemeBg,
            ]}
        >
            <Text style={[styles.text, colorSchemeFg]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
