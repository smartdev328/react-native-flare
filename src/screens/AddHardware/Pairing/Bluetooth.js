/* eslint-disable react/jsx-curly-brace-presence,react/jsx-one-expression-per-line */
import * as React from 'react';
import { Animated, Easing, Text, View } from 'react-native';
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

const Bluetooth = ({ style, switchToManual }) => {
    const dispatch = useDispatch();
    const [warningOffset] = React.useState(() => new Animated.Value(1000));
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

    const onWarningLayout = React.useCallback(
        ({
            nativeEvent: {
                layout: { height },
            },
        }) => {
            warningOffset.setValue(height);
            Animated.timing(warningOffset, {
                toValue: 0,
                delay: 5000,
                useNativeDriver: true,
                duration: 450,
                easing: Easing.ease,
            }).start();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <View
            style={[styles.centerContainer, { paddingHorizontal: 0 }, ...style]}
        >
            <Headline style={[styles.headline, styles.whiteText]}>
                Press your Flare repeatedly
            </Headline>
            <View style={[styles.line, styles.whiteLine]} />
            <Text
                style={[
                    styles.subhead,
                    styles.whiteText,
                    {
                        textAlign: 'center',
                        marginTop: 12,
                        marginBottom: 32,
                        marginHorizontal: 32,
                    },
                ]}
            >
                Press the button on your jewelry repeatedly so that your phone
                and jewelry can connect.
            </Text>
            <Cuff button animation={TOUCH_AND_RELEASE} />
            <Animated.View
                style={[
                    styles.warning,
                    { transform: [{ translateY: warningOffset }] },
                ]}
                onLayout={onWarningLayout}
            >
                <Text style={styles.warningText}>
                    Sometimes it takes a few seconds to connect for the first
                    time. Keep trying, or{' '}
                    <Text
                        style={{ textDecorationLine: 'underline' }}
                        onPress={switchToManual}
                    >
                        connect manually
                    </Text>
                    .
                </Text>
            </Animated.View>
        </View>
    );
};

export default Bluetooth;
