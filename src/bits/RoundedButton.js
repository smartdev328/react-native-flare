import * as React from 'react';
import {
    ActivityIndicator,
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from './Colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
    base: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.theme.cream,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    darkText: {
        color: Colors.black,
    },
    color: {
        backgroundColor: Colors.black,
    },
    inverse: {
        backgroundColor: Colors.theme.cream,
    },
    outline: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.black,
    },
    whiteOutline: {
        borderColor: Colors.theme.cream,
    },
    disabled: {
        opacity: 0.4,
    },
    shadowA: {
        shadowColor: '#2F345A',
        shadowOpacity: 0.8,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 2,
    },
    shadowB: {
        shadowColor: '#FFFFFF',
        shadowOpacity: 0.33,
        shadowOffset: { width: -2, height: -2 },
        shadowRadius: 2,
    },
    shadowADark: {
        shadowColor: '#000000',
        shadowOpacity: 0.43,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 2,
    },
    shadowBDark: {
        shadowColor: '#FFFFFF',
        shadowOpacity: 0.8,
        shadowOffset: { width: -2, height: -2 },
        shadowRadius: 2,
    },
});

const gradientColors = ['#F9885E', '#C75C71'];

const GradientButton = ({ children, style }) => (
    <LinearGradient colors={gradientColors} style={style} useAngle angle={13}>
        {children}
    </LinearGradient>
);

const NeumorphicButton = ({ children, style, neumorphicDark }) => (
    <View
        style={[style[4], neumorphicDark ? styles.shadowADark : styles.shadowA]}
    >
        <View
            style={[
                ...style,
                neumorphicDark ? styles.shadowADark : styles.shadowB,
            ]}
        >
            {children}
        </View>
    </View>
);

const pickButtonComponent = ({ useGradient, neumorphic }) => {
    if (useGradient) {
        return GradientButton;
    } else if (neumorphic) {
        return NeumorphicButton;
    } else {
        return View;
    }
};

const computeColorStyle = ({
    useGradient,
    outline,
    invisible,
    color,
    inverse,
}) => {
    if (useGradient || invisible) {
        return undefined;
    } else if (outline) {
        return styles.outline;
    } else if (color) {
        return { backgroundColor: color };
    } else if (inverse) {
        return styles.inverse;
    } else {
        return styles.color;
    }
};

const RoundedButton = ({
    text,
    onPress,
    useGradient = false,
    wrapperStyle,
    busy,
    outline = false,
    invisible = false,
    inverse = false,
    width = 146,
    height = 46,
    fontSize = 14,
    color,
    animated = false,
    forceWhiteText = false,
    disabled,
    neumorphic = false,
    neumorphicDark = false,
}) => {
    const ButtonComponent = pickButtonComponent({
        useGradient,
        neumorphic: neumorphic || neumorphicDark,
    });
    const colorStyle = computeColorStyle({
        useGradient,
        outline,
        invisible,
        color,
        inverse,
    });
    const darkText = (outline || invisible || inverse) && !forceWhiteText;
    const textColorStyle = darkText ? styles.darkText : undefined;

    const Touchable = animated ? AnimatedTouchable : TouchableOpacity;

    return (
        <Touchable
            onPress={onPress}
            style={wrapperStyle}
            disabled={busy || disabled}
        >
            <ButtonComponent
                neumorphicDark={neumorphicDark}
                style={[
                    styles.base,
                    colorStyle,
                    outline && forceWhiteText ? styles.whiteOutline : undefined,
                    disabled ? styles.disabled : undefined,
                    { width, height, borderRadius: height / 2 },
                ]}
            >
                {busy ? (
                    <ActivityIndicator
                        size="small"
                        color={darkText ? Colors.black : Colors.theme.cream}
                    />
                ) : (
                    <Text style={[styles.text, textColorStyle, { fontSize }]}>
                        {text}
                    </Text>
                )}
            </ButtonComponent>
        </Touchable>
    );
};

export default RoundedButton;
