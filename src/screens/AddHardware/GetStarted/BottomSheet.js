import * as React from 'react';
import { Animated, Text } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import styles from '../styles';
import Headline from '../../Onboarding/Headline';
import RoundedButton from '../../../bits/RoundedButton';

const BottomSheet = ({
    preferBluetooth,
    preferManual,
    howToConnect,
    style,
    ...props
}) => {
    const insets = useSafeArea();
    return (
        <Animated.View
            style={[
                styles.bottomSheet,
                { paddingBottom: insets.bottom + 24 },
                style,
            ]}
            {...props}
        >
            <Headline
                style={[styles.headline, { marginBottom: 2, width: 300 }]}
            >
                Ready to connect?
            </Headline>
            <Text style={styles.connectSubhead}>Let’s connect your cuff</Text>

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
        </Animated.View>
    );
};

export default BottomSheet;
