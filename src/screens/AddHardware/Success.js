import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

import Colors from '../../bits/Colors';
import Headline from '../Onboarding/Headline';
import sharedStyles from './styles';

import handshake from '../../assets/lotties/handshake';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme.cream,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: 400,
        height: 400,
    },
});

const Success = ({ style, nextPage }) => (
    <View style={[...style, styles.container]}>
        <Headline style={sharedStyles.headline}>Success!</Headline>
        <AnimatedLottieView
            style={styles.animation}
            source={handshake}
            autoPlay
            loop={false}
            onAnimationFinish={nextPage}
        />
    </View>
);

export default Success;
