import * as React from 'react';
import { Animated, Easing, Image, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import useDimensions from '../../bits/useDimensions';
import pizzaWoman from '../../assets/pizza-woman.png';
import Quote from './Quote';
import WhiteBar from '../Onboarding/WhiteBar';
import WouldYouRather from './WouldYouRather';

const greenGradient = ['#007461FF', '#00877A00'];
const blueGradient = ['#B6C6F800', '#A9BBFBFF'];

const TOP_MARGIN = 48;
const TOP_GRADIENT_SIZE = 298;
const BOTTOM_GRADIENT_SIZE = 235;

const WeirdVibes = ({ onBack }) => {
    const insets = useSafeArea();
    const dimensions = useDimensions();

    const [fadeAnim] = React.useState(new Animated.Value(0.0));
    const [translation] = React.useState(new Animated.Value(1000));

    const onLayout = React.useCallback(
        ({
            nativeEvent: {
                layout: { height },
            },
        }) => {
            translation.setValue(height);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    duration: 600,
                    toValue: 1.0,
                    useNativeDriver: true,
                    easing: Easing.ease,
                }),
                Animated.timing(translation, {
                    duration: 600,
                    toValue: 0.0,
                    useNativeDriver: true,
                    easing: Easing.ease,
                }),
            ]).start();
        },
        []
    );

    const fullScreen = {
        position: 'absolute',
        width: dimensions.width,
        height: dimensions.height - insets.top - insets.bottom - TOP_MARGIN,
        top: insets.top + TOP_MARGIN,
        left: 0,
    };
    const topGradient = {
        position: 'absolute',
        top: 0,
        height: insets.top + TOP_GRADIENT_SIZE,
        left: 0,
        width: dimensions.width,
    };
    const topGradientStops = [
        (TOP_MARGIN + insets.top) / (TOP_GRADIENT_SIZE + insets.top),
        1,
    ];

    const bottomGradient = {
        position: 'absolute',
        bottom: 0,
        height: insets.bottom + BOTTOM_GRADIENT_SIZE,
        left: 0,
        width: dimensions.width,
    };
    const bottomGradientStops = [
        0,
        1 - insets.bottom / (insets.bottom + BOTTOM_GRADIENT_SIZE),
    ];

    return (
        <View style={styles.container}>
            {/* background elements */}
            <Image style={fullScreen} source={pizzaWoman} resizeMode="cover" />
            <LinearGradient
                style={topGradient}
                colors={greenGradient}
                locations={topGradientStops}
            />
            <LinearGradient
                style={bottomGradient}
                colors={blueGradient}
                locations={bottomGradientStops}
            />

            {/* actual flexbox children start here */}
            <View style={{ height: insets.top }} />
            <WhiteBar showLogo={false} goBack={onBack} />
            <Quote style={{ opacity: fadeAnim }}>
                The party started to give me weird vibes. I was ready to leave.
            </Quote>
            <WouldYouRather
                onLayout={onLayout}
                style={{
                    marginTop: 'auto',
                    transform: [{ translateY: translation }],
                }}
                extraPaddingBottom={insets.bottom}
            />
        </View>
    );
};

export default WeirdVibes;
