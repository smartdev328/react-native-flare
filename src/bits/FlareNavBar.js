import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Colors.theme.cream,
    },
    logo: {
        height: 64,
        resizeMode: 'contain',
    },
});

function FlareNavBar() {
    return (
        <View style={styles.center}>
            <Image source={{ uri: 'logo-aura.png' }} style={styles.logo} />
        </View>
    );
}

export default FlareNavBar;
