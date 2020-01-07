/* eslint-disable react/jsx-curly-brace-presence */
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Colors from '../../bits/Colors';

import constellation3 from '../../assets/constellation-3.png';
import constellation4 from '../../assets/constellation-4.png';
import constellation5 from '../../assets/constellation-5.png';
import constellation6 from '../../assets/constellation-6.png';

const styles = StyleSheet.create({
    image: {
        width: 168,
        height: 94,
        marginBottom: 24,
    },
    textWrapper: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 12,
        color: Colors.theme.cream,
        letterSpacing: 1,
    },
    textNumber: {
        fontWeight: 'bold',
    },
    textString: {
        fontFamily: 'Nocturno Display Std',
    },
});

const images = [
    null,
    null,
    null,
    constellation3,
    constellation4,
    constellation5,
    constellation6,
];

const Constellation = ({ count, maxCount = 6 }) => {
    const image = images[count];

    return (
        <>
            {image && <Image source={image} style={styles.image} />}
            <View style={styles.textWrapper}>
                <Text style={[styles.text, styles.textNumber]}>{count}</Text>
                <Text style={[styles.text, styles.textString]}>{' of '}</Text>
                <Text style={[styles.text, styles.textNumber]}>{maxCount}</Text>
                <Text style={[styles.text, styles.textString]}>
                    {' complete'}
                </Text>
            </View>
        </>
    );
};

export default Constellation;
