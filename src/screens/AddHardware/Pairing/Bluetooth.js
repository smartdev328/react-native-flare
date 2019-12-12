import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import styles from '../styles';
import Headline from '../../Onboarding/Headline';
import cuff from '../../../assets/cuff-v2.png';
import Geyser from './Geyser';

const Bluetooth = ({ style }) => {
    const shortPressCounts = useSelector(
        state => state.beacons.recentShortPressCounts
    );

    console.log('shortPressCounts', shortPressCounts);

    return (
        <View style={[styles.centerContainer, ...style]}>
            <View style={styles.spacer} />
            <Headline style={styles.headline}>
                Press your Flare repeatedly
            </Headline>
            <View style={styles.line} />
            <Text
                style={[styles.subhead, { textAlign: 'center', marginTop: 12 }]}
            >
                Press the button on your jewelry repeatedly so that your phone
                and jewelry can connect.
            </Text>
            <View style={styles.spacer} />
            <Geyser />
            <Image source={cuff} style={styles.image} />
            <View style={{ flexGrow: 2 }} />
        </View>
    );
};

export default Bluetooth;
