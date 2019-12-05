import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    base: {
        width: 180,
        height: 66,
        borderRadius: 33,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#F5F2ED',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    color: {
        backgroundColor: '#D0D0D0',
    },
});

const gradientColors = ['#F9885E', '#C75C71'];

const ColorButton = ({ children }) => (
    <View style={[styles.base, styles.color]}>{children}</View>
);

const GradientButton = ({ children }) => (
    <LinearGradient
        colors={gradientColors}
        style={styles.base}
        useAngle
        angle={13}
    >
        {children}
    </LinearGradient>
);

const RoundedButton = ({ text, onPress, useGradient = true, wrapperStyle }) => {
    const ButtonComponent = useGradient ? GradientButton : ColorButton;
    return (
        <TouchableOpacity onPress={onPress} style={wrapperStyle}>
            <ButtonComponent>
                <Text style={styles.text}>{text}</Text>
            </ButtonComponent>
        </TouchableOpacity>
    );
};

export default RoundedButton;
