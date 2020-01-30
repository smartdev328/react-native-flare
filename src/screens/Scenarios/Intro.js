import * as React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import AnimatedLottieView from 'lottie-react-native';

import styles from './styles';
import RoundedButton from '../../bits/RoundedButton';
import useDimensions from '../../bits/useDimensions';

import animatedBackground from '../../assets/animated-aura.mp4';
import gutFeeling from '../../assets/lotties/gut-feeling';

const Intro = ({ onNext }) => {
    const insets = useSafeArea();
    const dimensions = useDimensions();

    const buttonWrapperStyle = React.useMemo(
        () => ({
            marginTop: 'auto',
            marginBottom: insets.bottom + 24,
            alignSelf: 'center',
        }),
        [insets.bottom]
    );

    const lottieStyle = React.useMemo(
        () => ({
            position: 'absolute',
            top: 0,
            left: 0,
            width: dimensions.width,
            height: dimensions.height,
        }),
        [dimensions.height, dimensions.width]
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
            {/* background items */}
            <StatusBar barStyle="light-content" />
            <Video
                style={StyleSheet.absoluteFill}
                repeat
                source={animatedBackground}
                resizeMode="cover"
            />
            <AnimatedLottieView
                source={gutFeeling}
                style={lottieStyle}
                autoPlay
                loop
                resizeMode="cover"
            />

            {/* flexbox items */}
            <Text style={styles.deviceActionText}>
                Flare gives you two low-key options to get out of an iffy
                situation the moment you’re feeling unsure.
            </Text>
            <RoundedButton
                useGradient={false}
                height={48}
                width={240}
                onPress={onNext}
                wrapperStyle={buttonWrapperStyle}
                text="Show me how"
            />
        </View>
    );
};

export default Intro;
