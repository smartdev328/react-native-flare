import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import styles from '../styles';
import Headline from '../../Onboarding/Headline';
import Geyser from '../../../bits/Geyser';
import {
    beaconCountsReset,
    startBleListening,
} from '../../../actions/hardwareActions';
import { DEVICE_ADDITION_MIN_PRESS_COUNT } from '../../../constants/Config';
import { setFoundDevice } from '../../../actions/regActions';

import cuff from '../../../assets/cuff-v2.png';
import Colors from '../../../bits/Colors';
import Cuff, { TOUCH_AND_RELEASE } from '../../Cuff';

const localStyles = StyleSheet.create({
    troubleBox: {
        height: 48,
        alignSelf: 'stretch',
        backgroundColor: Colors.theme.cream,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginLeft: -32,
        marginRight: -32,
    },
    trouble: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

const Bluetooth = ({ style }) => {
    const dispatch = useDispatch();
    const latestPress = useSelector(state => {
        const {
            beacons: { recentShortPressCounts },
        } = state;
        return recentShortPressCounts ? recentShortPressCounts[0] : {};
    });

    const havingTrouble = React.useCallback(() => {
        Navigation.showModal({
            component: {
                name: 'com.flarejewelry.oboarding.addhardware.trouble',
            },
        });
    }, []);

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
