import * as React from 'react';
import { Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

import Headline from '../Onboarding/Headline';
import styles from './styles';
import RoundedButton from '../../bits/RoundedButton';
import { setPreferredPairingMethod } from '../../actions/regActions';
import Cuff from '../Cuff';

const GetStarted = ({ style, nextPage }) => {
    const insets = useSafeArea();
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
            <View
                style={[
                    styles.bottomSheet,
                    { paddingBottom: insets.bottom + 12 },
                ]}
            >
                <Headline style={styles.headline}>Ready to pair?</Headline>
                <RoundedButton
                    wrapperStyle={styles.spacedButton}
                    onPress={preferBluetooth}
                    text="Connect via Bluetooth"
                    useGradient
                    width={240}
                />
                <RoundedButton
                    wrapperStyle={styles.spacedButton}
                    text="Enter serial number"
                    onPress={preferManual}
                    outline
                    width={240}
                />
                <RoundedButton
                    text="Tell me more"
                    onPress={howToConnect}
                    invisible
                    useGradient={false}
                    width={240}
                />
            </View>
        </View>
    );
};

export default GetStarted;
