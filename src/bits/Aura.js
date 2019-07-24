import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: Colors.theme.purple,
    },
    topLeft: {
        background: 'radial-gradient(circle at center, red 0, blue, green 100%)',
    },
});

function Aura() {
    return (
        <View style={styles.container}>
            <View style={styles.topLeft} />
        </View>
    );
}

export default Aura;
