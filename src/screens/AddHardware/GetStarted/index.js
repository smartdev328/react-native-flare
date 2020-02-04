import * as React from 'react';
import { Animated, Easing, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';

import Headline from '../../Onboarding/Headline';
import styles from '../styles';
import { setPreferredPairingMethod } from '../../../actions/regActions';
import { startBleListening } from '../../../actions';
import Cuff from '../../Cuff';
import BottomSheet from './BottomSheet';

const GetStarted = ({ style, nextPage }) => {
    const [titleOpacity] = React.useState(new Animated.Value(0));
    const [cuffOpacity] = React.useState(new Animated.Value(0));
    const [translation] = React.useState(new Animated.Value(1000));
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(startBleListening());
    }, [dispatch]);

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
            Animated.sequence([
                Animated.timing(titleOpacity, {
                    duration: 400,
                    toValue: 1,
                    useNativeDriver: true,
                    easing: Easing.ease,
                }),
                Animated.timing(cuffOpacity, {
                    duration: 400,
                    toValue: 1,
                    useNativeDriver: true,
                    easing: Easing.ease,
                }),
                Animated.timing(translation, {
                    duration: 600,
                    toValue: 0.0,
                    useNativeDriver: true,
                    easing: Easing.ease,
                }),
            ]).start();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return (
        <View
            style={[styles.centerContainer, { paddingHorizontal: 0 }, ...style]}
        >
            <Headline
                animatable
                style={[
                    styles.headline,
                    styles.whiteText,
                    { opacity: titleOpacity },
                ]}
            >
                Welcome to the Movement 🎉
            </Headline>

            <View style={styles.spacer} />
            <Cuff animatable small style={{ opacity: cuffOpacity }} />
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
