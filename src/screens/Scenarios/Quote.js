import * as React from 'react';
import { Animated, Easing, Image, StyleSheet, Text } from 'react-native';

import quoteTop from '../../assets/quote-top.png';
import quoteBottom from '../../assets/quote-bottom.png';

const styles = StyleSheet.create({
    container: {
        width: 264,
        flexDirection: 'column',
    },
    quote: {
        width: 30,
        height: 15,
    },
    quoteTop: {
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    quoteBottom: {
        alignSelf: 'flex-end',
        marginTop: 2,
    },
    text: {
        fontSize: 24,
        lineHeight: 26,
        color: '#F8F5F1',
        fontFamily: 'Nocturno Display Std',
        alignSelf: 'stretch',
        textAlign: 'center',
    },
});

const Quote = ({ children }) => {
    const [fadeAnim] = React.useState(new Animated.Value(0.0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            duration: 600,
            toValue: 1.0,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image style={[styles.quote, styles.quoteTop]} source={quoteTop} />
            <Text style={styles.text}>{children}</Text>
            <Image
                style={[styles.quote, styles.quoteBottom]}
                source={quoteBottom}
            />
        </Animated.View>
    );
};

export default Quote;
