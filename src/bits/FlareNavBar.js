import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    logo: {
        width: 180,
        height: 48,
        resizeMode: 'contain',
    },
});

function FlareNavBar() {
    return <Image source={{ uri: 'logo-aura' }} style={styles.logo} />;
}

export default FlareNavBar;
