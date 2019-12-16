import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../styles';
import Headline from '../../Onboarding/Headline';
import Geyser from './Geyser';
import { beaconCountsReset } from '../../../actions/hardwareActions';
import { DEVICE_ADDITION_MIN_PRESS_COUNT } from '../../../constants/Config';
import { setFoundDevice } from '../../../actions/regActions';

import cuff from '../../../assets/cuff-v2.png';

const Bluetooth = ({ style }) => {
    const dispatch = useDispatch();
    const latestPress = useSelector(state => {
        const {
            beacons: { recentShortPressCounts },
        } = state;
        return recentShortPressCounts ? recentShortPressCounts[0] : {};
    });

    React.useEffect(() => {
        dispatch(beaconCountsReset());
        return () => dispatch(beaconCountsReset());
    }, [dispatch]);

    React.useEffect(() => {
        if (
            latestPress &&
            'count' in latestPress &&
            latestPress.count >= DEVICE_ADDITION_MIN_PRESS_COUNT
        ) {
            dispatch(setFoundDevice(latestPress.deviceID));
        }
    }, [latestPress, dispatch]);

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
            <TouchableOpacity>
                <Text style={styles.trouble}>Having trouble?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Bluetooth;
