import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

import cuff from '../../assets/cuff-v2.png';
import cuffButton from '../../assets/cuff-button.png';
import touchAndRelease from '../../assets/lotties/touch-and-release';
import pressAndHold from '../../assets/lotties/press-and-hold';

const styles = StyleSheet.create({
    wh: {
        width: 241,
        height: 215,
    },
    button: {
        position: 'absolute',
        width: 30,
        height: 11,
        top: 21,
        left: 105,
    },
    animation: {
        width: 128,
        height: 96,
    },
    animationWrapper: {
        position: 'absolute',
        left: 58,
        top: -20,
    },
});

export const TOUCH_AND_RELEASE = 'touchAndRelease';
export const PRESS_AND_HOLD = 'pressAndHold';

const animations = {
    [TOUCH_AND_RELEASE]: touchAndRelease,
    [PRESS_AND_HOLD]: pressAndHold,
};

const Cuff = ({ button, animation, style, ...rest }) => {
    const animationSource = animations[animation];

    return (
        <View style={[styles.wh, style]} {...rest}>
            <Image source={cuff} style={styles.wh} />
            {button && <Image source={cuffButton} style={styles.button} />}
            {animationSource && (
                <View style={[styles.animationWrapper, styles.animation]}>
                    <AnimatedLottieView
                        source={animationSource}
                        style={styles.animation}
                        autoPlay
                        loop
                    />
                </View>
            )}
        </View>
    );
};

export default Cuff;
