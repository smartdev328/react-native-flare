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
import Headline from '../Onboarding/Headline';

const Intro = ({ onNext }) => {
    const insets = useSafeArea();
    const dimensions = useDimensions();

    const buttonWrapperStyle = React.useMemo(
        () => ({
            marginTop: 'auto',
            marginBottom: insets.bottom + 32,
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

    const headline =
        dimensions.height >= 812
            ? 'Flare was created for that gut feeling'
            : 'For that gut feeling';

    return (
        <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
            {/* background items */}
            <StatusBar barStyle="light-content" />
            <Video
                style={StyleSheet.absoluteFill}
                repeat
                source={animatedBackground}
                resizeMode="cover"
                selectedAudioTrack={{ type: 'disabled' }}
                muted
            />
            <AnimatedLottieView
                source={gutFeeling}
                style={lottieStyle}
                autoPlay
                loop
                resizeMode="cover"
            />

            {/* flexbox items */}
            <Headline style={styles.headline}>{headline}</Headline>
            <View style={styles.line} />
            <Text style={[styles.deviceActionText, { marginHorizontal: 24 }]}>
                Flare gives you two low-key options to get out of an iffy
                situation the moment you’re feeling unsure. No need to hang
                around.
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
