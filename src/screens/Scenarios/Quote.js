import * as React from 'react';
import { Animated, Image, StyleSheet, Text } from 'react-native';

import Colors from '../../bits/Colors';

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
        color: Colors.theme.cream,
        fontFamily: 'Nocturno Display Std',
        alignSelf: 'stretch',
        textAlign: 'center',
    },
});

const Quote = ({ style, children }) => (
    <Animated.View style={[styles.container, style]}>
        <Image style={[styles.quote, styles.quoteTop]} source={quoteTop} />
        <Text style={styles.text}>{children}</Text>
        <Image
            style={[styles.quote, styles.quoteBottom]}
            source={quoteBottom}
        />
    </Animated.View>
);

export default Quote;
