import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from './Colors';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
        padding: Spacing.medium,
        backgroundColor: Colors.theme.orangeLight,
        borderRadius: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: Spacing.huge,
    },
    text: {
        color: Colors.white,
        fontWeight: '700',
    },
    fullWidth: {
        width: '100%',
        height: Spacing.huge,
        marginLeft: 0,
    },
});

function Button(props) {
    return (
        <TouchableOpacity
            onPress={e => props.onPress(e)} 
            style={[styles.container, props.fullWidth ? styles.fullWidth : null]}
        >
            <View>
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default Button;