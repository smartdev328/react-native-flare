import * as React from 'react';
import { Text, KeyboardAvoidingView } from 'react-native';

import styles from '../styles';
import Headline from '../../Onboarding/Headline';
import CuffPreview from './CuffPreview';
import FlareDeviceID from '../../../bits/FlareDeviceID';
import RoundedButton from '../../../bits/RoundedButton';

const Confirm = ({ device, submit, busy }) => {
    const [secondFactor, setSecondFactor] = React.useState();
    const onPress = React.useCallback(() => {
        submit({ deviceId: device, secondFactor });
    }, [submit, device, secondFactor]);

    const deviceLabel = FlareDeviceID.getJewelryLabelFromDeviceID(device);
    return (
        <KeyboardAvoidingView
            style={[styles.scrollContainer, { paddingTop: 0 }]}
            keyboardVerticalOffset={96}
            behavior="padding"
        >
            <Headline>Confirm your Flare</Headline>
            <Text style={[styles.helpText, { marginBottom: 0 }]}>
                Enter the last 3 digits of your serial number
            </Text>
            <CuffPreview
                style={{ alignSelf: 'center', marginTop: 48 }}
                text={deviceLabel}
                onChangeText={setSecondFactor}
            />
            <RoundedButton
                wrapperStyle={{
                    alignSelf: 'center',
                    marginTop: 'auto',
                    marginBottom: 16,
                }}
                text="Continue"
                useGradient={false}
                busy={busy}
                onPress={onPress}
            />
        </KeyboardAvoidingView>
    );
};

export default Confirm;
