import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from './Colors';

const stripeHeight = 2;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: stripeHeight,
    },
    third: {
        position: 'absolute',
        width: '100%',
        height: stripeHeight,
        backgroundColor: Colors.theme.orangeLight,
    },
    second: {
        position: 'absolute',
        left: '10%',
        width: '30%',
        height: stripeHeight,
        backgroundColor: Colors.theme.orangeDark,
    },
    first: {
        position: 'absolute',
        width: '10%',
        height: stripeHeight,
        backgroundColor: Colors.theme.pink,
    }
});

function FlavorStripe(props, context) {
    return (
        <View style={styles.container}>
            <View style={styles.third} />
            <View style={styles.second} />
            <View style={styles.first} />
        </View>
    );
}

export default FlavorStripe;