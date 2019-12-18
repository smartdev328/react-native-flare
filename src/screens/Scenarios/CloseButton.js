import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import x from '../../assets/x.png';

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
        alignSelf: 'flex-start',
    },
    image: {
        height: 16,
        width: 16,
    },
});

const CloseButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
        <Image source={x} style={styles.image} />
    </TouchableOpacity>
);

export default CloseButton;
