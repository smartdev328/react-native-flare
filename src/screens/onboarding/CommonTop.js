import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Spacing from '../../bits/Spacing';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: Spacing.large,
    },
    logo: {
        width: 180,
        height: 64,
        resizeMode: 'contain',
    },
});

export default function CommonTop() {
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'logo-aura' }} style={styles.logo} />
        </View>
    );
}
