import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    headline: {
        fontSize: 30,
        lineHeight: 33,
        color: Colors.white,
        fontFamily: 'Nocturno Display Std',
        width: 275,
        alignSelf: 'flex-start',
        marginBottom: 32,
    },
});

const Headline = ({ children }) => (
    <Text style={styles.headline}>{children}</Text>
);

export default Headline;
