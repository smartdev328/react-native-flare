import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
        padding: Spacing.medium,
        borderRadius: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: Spacing.huge,
        maxHeight: Spacing.huge,
        minHeight: Spacing.huge,
    },
    text: {
        fontWeight: '700',
    },
    fullWidth: {
        width: '100%',
        height: Spacing.huge,
        marginLeft: 0,
    },
    schemeWhiteBackground: {
        backgroundColor: Colors.white,
    },
    schemeWhiteForeground: {
        color: Colors.black,
    },
    schemeDefaultBackground: {
        backgroundColor: Colors.theme.orangeLight,
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
            <View>
                <Text style={[styles.text, colorSchemeFg]}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default Button;