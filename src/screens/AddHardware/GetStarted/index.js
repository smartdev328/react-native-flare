import * as React from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';

import Headline from '../../Onboarding/Headline';
import styles from '../styles';
import { setPreferredPairingMethod } from '../../../actions/regActions';
import Cuff from '../../Cuff';
import BottomSheet from './BottomSheet';

const GetStarted = ({ style, nextPage }) => {
    const [translation] = React.useState(new Animated.Value(1000));
    const dispatch = useDispatch();

    const preferBluetooth = React.useCallback(() => {
        dispatch(setPreferredPairingMethod('bluetooth'));
        nextPage();
    }, [dispatch, nextPage]);
    const preferManual = React.useCallback(() => {
        dispatch(setPreferredPairingMethod('manual'));
        nextPage();
    }, [dispatch, nextPage]);
    const howToConnect = React.useCallback(() => {
        Navigation.showModal({
            component: {
                name: 'com.flarejewelry.onboarding.addhardware.howtoconnect',
            },
        });
    }, []);

    const onLayout = React.useCallback(
        ({
            nativeEvent: {
                layout: { height },
            },
        }) => {
            translation.setValue(height);
            Animated.timing(translation, {
                duration: 600,
                toValue: 0.0,
                useNativeDriver: true,
                easing: Easing.ease,
            }).start();
        },
        []
    );
    return (
        <View
            style={[styles.centerContainer, { paddingHorizontal: 0 }, ...style]}
        >
            <Headline style={[styles.headline, styles.whiteText]}>
                Welcome to the Movement
            </Headline>
            <View style={[styles.line, styles.whiteLine]} />
            <Text
                style={[
                    styles.subhead,
                    styles.whiteText,
                    { textAlign: 'center' },
                ]}
            >
                Let’s connect.
            </Text>
            <View style={styles.spacer} />
            <Cuff small />
            <View style={styles.spacer} />
            <BottomSheet
                style={{ transform: [{ translateY: translation }] }}
                howToConnect={howToConnect}
                preferBluetooth={preferBluetooth}
                preferManual={preferManual}
                onLayout={onLayout}
            />
        </View>
    );
};

export default GetStarted;
