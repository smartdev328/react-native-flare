import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

import Colors from '../bits/Colors';
import Headline from './Onboarding/Headline';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme.cream,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        width: 233,
        textAlign: 'center',
        marginBottom: 12,
        alignSelf: 'center',
        color: Colors.black,
    },
});

const SuccessAnimation = ({ style, animation, onComplete, size = 400 }) => (
    <View style={[style, styles.container]}>
        <Headline style={styles.headline}>Success!</Headline>
        <AnimatedLottieView
            style={{ width: size, height: size }}
            source={animation}
            autoPlay
            loop={false}
            onAnimationFinish={onComplete}
        />
    </View>
);

export default React.memo(SuccessAnimation);
