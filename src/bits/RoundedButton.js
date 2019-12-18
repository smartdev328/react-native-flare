import * as React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from './Colors';

const textColor = '#F5F2ED';

const styles = StyleSheet.create({
    base: {
        borderRadius: 33,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: textColor,
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
    outline: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.black,
    },
});

const gradientColors = ['#F9885E', '#C75C71'];

const ColorButton = ({ children, style }) => (
    <View style={style}>{children}</View>
);

const GradientButton = ({ children, style }) => (
    <LinearGradient colors={gradientColors} style={style} useAngle angle={13}>
        {children}
    </LinearGradient>
);

const computeColorStyle = ({ useGradient, outline, invisible, color }) => {
    if (useGradient || invisible) {
        return undefined;
    } else if (outline) {
        return styles.outline;
    } else if (color) {
        return { backgroundColor: color };
    } else {
        return styles.color;
    }
};

const RoundedButton = ({
    text,
    onPress,
    useGradient = true,
    wrapperStyle,
    busy,
    outline = false,
    invisible = false,
    width = 180,
    height = 66,
    fontSize = 16,
    color,
}) => {
    const ButtonComponent = useGradient ? GradientButton : ColorButton;
    const colorStyle = computeColorStyle({
        useGradient,
        outline,
        invisible,
        color,
    });
    const textColorStyle = outline || invisible ? styles.darkText : undefined;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={wrapperStyle}
            disabled={busy}
        >
            <ButtonComponent
                style={[styles.base, colorStyle, { width, height }]}
            >
                {busy ? (
                    <ActivityIndicator size="small" color={textColor} />
                ) : (
                    <Text style={[styles.text, textColorStyle, { fontSize }]}>
                        {text}
                    </Text>
                )}
            </ButtonComponent>
        </TouchableOpacity>
    );
};

export default RoundedButton;
