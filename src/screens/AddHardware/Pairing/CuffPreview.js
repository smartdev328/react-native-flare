import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import image from '../../../assets/cuff-confirm.png';

const styles = StyleSheet.create({
    container: {
        width: 232,
        height: 110,
    },
    image: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    text: {
        position: 'absolute',
        left: 91,
        top: 71,
        fontSize: 12,
    },
});

const CuffPreview = ({ text, style }) => (
    <View style={[styles.container, style]}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
    </View>
);

export default CuffPreview;
