import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        flex: 1,
        height: 45,
        flexDirection: 'column',
        justifyContent: 'center',
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
            <Image source={require('../assets/logo-aura.png')} style={styles.logo} />
        </View>
    );
}

export default FlareNavBar;
