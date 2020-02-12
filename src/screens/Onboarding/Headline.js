import * as React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    headline: {
        fontSize: 30,
        lineHeight: 33,
        color: Colors.theme.cream,
        fontFamily: 'Nocturno Display Std',
        width: 275,
        alignSelf: 'flex-start',
        marginBottom: 32,
    },
    squashed: {
        marginBottom: 0,
        fontSize: 24,
        lineHeight: 27,
    },
});

const Headline = ({
    children,
    style,
    squashed = false,
    animatable = false,
}) => {
    const Component = animatable ? Animated.Text : Text;
    return (
        <Component
            style={[
                styles.headline,
                squashed ? styles.squashed : undefined,
                style,
            ]}
        >
            {children}
        </Component>
    );
};

export default Headline;
