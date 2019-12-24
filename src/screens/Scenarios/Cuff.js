import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import cuff from '../../assets/cuff-v2.png';
import cuffButton from '../../assets/cuff-button.png';

const styles = StyleSheet.create({
    wh: {
        width: 241,
        height: 215,
    },
    button: {
        position: 'absolute',
        width: 30,
        height: 11,
        top: 21,
        left: 105,
    },
});

const Cuff = ({ button, style, ...rest }) => (
    <View style={[styles.wh, style]} {...rest}>
        <Image source={cuff} style={styles.wh} />
        {button && <Image source={cuffButton} style={styles.button} />}
    </View>
);

export default Cuff;
