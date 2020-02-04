import * as React from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

import cuff from '../assets/cuff-v2.png';
import cuffButton from '../assets/cuff-button.png';
import touchAndRelease from '../assets/lotties/touch-and-release';
import pressAndHold from '../assets/lotties/press-and-hold';

const styles = StyleSheet.create({
    wh: {
        width: 241,
        height: 215,
    },
    whSmall: {
        width: 192,
        height: 171,
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

const Cuff = ({
    button,
    animation,
    style,
    small = false,
    pause,
    animatable = false,
    ...rest
}) => {
    const animationRef = React.useRef();
    const [timeoutId, setTimeoutId] = React.useState(undefined);

    const animationSource = animations[animation];
    const wh = small ? styles.whSmall : styles.wh;

    const delayThenRestart = React.useCallback(() => {
        const id = setTimeout(() => {
            if (animationRef.current) {
                animationRef.current.reset();
                animationRef.current.play();
            }
        }, 800);
        setTimeoutId(id);
    }, []);

    React.useEffect(() => {
        return timeoutId ? () => clearTimeout(timeoutId) : undefined;
    }, [timeoutId]);

    const Wrapper = animatable ? Animated.View : View;

    return (
        <Wrapper style={[wh, style]} {...rest}>
            <Image source={cuff} style={wh} />
            {button && <Image source={cuffButton} style={styles.button} />}
            {animationSource && (
                <View style={[styles.animationWrapper, styles.animation]}>
                    <AnimatedLottieView
                        ref={animationRef}
                        source={animationSource}
                        style={styles.animation}
                        autoPlay
                        loop={!pause}
                        onAnimationFinish={pause ? delayThenRestart : undefined}
                    />
                </View>
            )}
        </Wrapper>
    );
};

export default Cuff;
