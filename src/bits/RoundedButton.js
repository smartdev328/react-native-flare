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
});

const gradientColors = ['#F9885E', '#C75C71'];

const GradientButton = ({ children, style }) => (
    <LinearGradient colors={gradientColors} style={style} useAngle angle={13}>
        {children}
    </LinearGradient>
);

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
}) => {
    const ButtonComponent = useGradient ? GradientButton : View;
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
