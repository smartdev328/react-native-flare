import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';

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
        position: 'absolute',
        top: -200,
        left: -200,
        width: 400,
        height: 400,
    },
    bottomRight: {
        position: 'absolute',
        opacity: 0.8,
        bottom: -350,
        right: -500,
        width: 800,
        height: 1024,
    },
});

function Aura() {
    return (
        <View style={styles.container}>
            <RadialGradient
                style={styles.bottomRight}
                colors={[Colors.theme.pink, Colors.theme.green, Colors.theme.purple]}
                stops={[0.02, 0.25, 0.45]}
                radius={1024}
            />
            <RadialGradient style={styles.topLeft} colors={[Colors.theme.peach, Colors.theme.purple]} radius={200} />
        </View>
    );
}

export default Aura;
