import * as React from 'react';
import { Text, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import styles from '../styles';
import Headline from '../../Onboarding/Headline';
import CuffPreview from './CuffPreview';
import FlareDeviceID from '../../../bits/FlareDeviceID';

const Confirm = ({ device }) => {
    const deviceLabel = FlareDeviceID.getJewelryLabelFromDeviceID(device);
    const leftAccessory = React.useCallback(
        () => <Text style={{ fontSize: 16 }}>{deviceLabel}</Text>,
        [deviceLabel]
    );
    return (
        <View style={[styles.scrollContainer, { paddingVertical: 0 }]}>
            <Headline>Confirm your Flare</Headline>
            <Text style={[styles.helpText, { marginBottom: 0 }]}>
                Enter the last 3 digits of your serial number
            </Text>
            <TextField
                renderLeftAccessory={leftAccessory}
                autoFocus
                autoCapitalize="characters"
                autoCompleteType="off"
                autoCorreft={false}
                keyboardType="ascii-capable"
                returnKeyType="next"
                maxLength={3}
            />
            <CuffPreview
                style={{ alignSelf: 'center', marginTop: 48 }}
                text={`${deviceLabel}???`}
            />
        </View>
    );
};

export default Confirm;
