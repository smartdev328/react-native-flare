import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Type from './Type';
import Spacing from './Spacing';
import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: Spacing.large,
        paddingVertical: Spacing.medium,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.medium,
    },
    title: {
        fontSize: Type.size.medium,
    },
});

export default function SettingsToggle(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.theme.purpleLight, false: Colors.theme.cream }}
                thumbColor={props.value ? Colors.theme.purple : Colors.theme.purpleLight}
                value={props.value}
                onValueChange={props.onValueChange}
            />
        </View>
    );
}
