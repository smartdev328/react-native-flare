import * as React from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../styles';
import Headline from '../../Onboarding/Headline';
import {
    beaconCountsReset,
    startBleListening,
} from '../../../actions/hardwareActions';
import { DEVICE_ADDITION_MIN_PRESS_COUNT } from '../../../constants/Config';
import { setFoundDevice } from '../../../actions/regActions';

import Cuff, { TOUCH_AND_RELEASE } from '../../Cuff';

const Bluetooth = ({ style }) => {
    const dispatch = useDispatch();
    const latestPress = useSelector(state => {
        const {
            beacons: { recentShortPressCounts },
        } = state;
        return recentShortPressCounts ? recentShortPressCounts[0] : {};
    });

    React.useEffect(() => {
        dispatch(startBleListening());
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
            <Headline style={[styles.headline, styles.whiteText]}>
                Press your Flare repeatedly
            </Headline>
            <View style={[styles.line, styles.whiteLine]} />
            <Text
                style={[
                    styles.subhead,
                    styles.whiteText,
                    { textAlign: 'center', marginTop: 12 },
                ]}
            >
                Press the button on your jewelry repeatedly so that your phone
                and jewelry can connect.
            </Text>
            <View style={styles.spacer} />
            <Cuff button animation={TOUCH_AND_RELEASE} />
            <View style={{ flexGrow: 2 }} />
        </View>
    );
};

export default Bluetooth;
