import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

import Colors from '../../bits/Colors';

import animation from '../../assets/lotties/connecting';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme.cream,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    animation: { width: 200, height: 200 },
});

const Connecting = () => (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <AnimatedLottieView
            style={styles.animation}
            source={animation}
            autoPlay
            loop
        />
    </SafeAreaView>
);

export default Connecting;
