import * as React from 'react';
import { Animated, Easing, Image, StatusBar, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import useDimensions from '../../bits/useDimensions';
import Quote from './Quote';
import WhiteBar from '../Onboarding/WhiteBar';
import BottomSheet from './BottomSheet';

const TOP_MARGIN = 48;
const TOP_GRADIENT_SIZE = 298;
const BOTTOM_GRADIENT_SIZE = 235;
const BOTTOM_MARGIN = 120;

const Scenario = ({
    onBack,
    fakeCall,
    textCrew,
    nextScenario,
    addToContacts,
    postDemo = false,
    topGradient,
    bottomGradient,
    image,
    finishUp,
    busy,
    FirstQuote,
    SecondQuote,
    cardHead,
    cardBody,
}) => {
    const insets = useSafeArea();
    const dimensions = useDimensions();

    const [firstQuoteOpacity] = React.useState(new Animated.Value(0.0));
    const [secondQuoteOpacity] = React.useState(new Animated.Value(0.0));
    const [translation] = React.useState(new Animated.Value(1000));
    const [didAnimation, setDidAnimation] = React.useState(false);

    const onLayout = React.useCallback(
        ({
            nativeEvent: {
                layout: { height },
            },
        }) => {
            if (didAnimation || height <= 0) {
                return;
            }

            translation.setValue(height);
            setDidAnimation(true);

            if (postDemo) {
                firstQuoteOpacity.setValue(1.0);
                Animated.sequence([
                    Animated.timing(firstQuoteOpacity, {
                        duration: 600,
                        toValue: 0.0,
                        delay: 400,
                        useNativeDriver: true,
                        easing: Easing.ease,
                    }),
                    Animated.timing(secondQuoteOpacity, {
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
            } else {
                Animated.sequence([
                    Animated.timing(firstQuoteOpacity, {
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
            }
        },
        [postDemo, didAnimation]
    );

    const fullScreen = {
        position: 'absolute',
        width: dimensions.width,
        height:
            dimensions.height -
            insets.top -
            insets.bottom -
            TOP_MARGIN -
            BOTTOM_MARGIN,
        top: insets.top + TOP_MARGIN,
        left: 0,
    };
    const topGradientStyle = {
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

    const bottomGradientStyle = {
        position: 'absolute',
        bottom: 0,
        height: insets.bottom + BOTTOM_GRADIENT_SIZE + BOTTOM_MARGIN,
        left: 0,
        width: dimensions.width,
    };
    const bottomGradientStops = [
        0,
        1 -
            (insets.bottom + BOTTOM_MARGIN) /
                (insets.bottom + BOTTOM_GRADIENT_SIZE + BOTTOM_MARGIN),
    ];

    return (
        <View style={styles.container}>
            {/* background elements */}
            <StatusBar barStyle="light-content" />
            <Image style={fullScreen} source={image} resizeMode="cover" />
            <LinearGradient
                style={topGradientStyle}
                colors={topGradient}
                locations={topGradientStops}
            />
            <LinearGradient
                style={bottomGradientStyle}
                colors={bottomGradient}
                locations={bottomGradientStops}
            />

            {/* actual flexbox children start here */}
            <View style={{ height: insets.top }} />
            <WhiteBar
                showLogo={false}
                goBack={onBack}
                showBack={typeof onBack === 'function'}
                offWhite
            />
            <View style={{ width: 264 }}>
                <Quote
                    style={{
                        opacity: firstQuoteOpacity,
                        position: 'absolute',
                        top: 0,
                    }}
                >
                    <FirstQuote />
                </Quote>
                <Quote
                    style={{
                        opacity: secondQuoteOpacity,
                        position: 'absolute',
                        top: 0,
                    }}
                >
                    <SecondQuote />
                </Quote>
            </View>
            <BottomSheet
                onLayout={onLayout}
                style={{
                    marginTop: 'auto',
                    transform: [{ translateY: translation }],
                }}
                extraPaddingBottom={insets.bottom}
                fakeCall={fakeCall}
                textCrew={textCrew}
                nextScenario={nextScenario}
                addToContacts={addToContacts}
                postDemo={postDemo}
                finishUp={finishUp}
                busy={busy}
                cardHead={cardHead}
                cardBody={cardBody}
            />
        </View>
    );
};

export default Scenario;
