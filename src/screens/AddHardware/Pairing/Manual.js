import * as React from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import styles from '../styles';
import Headline from '../../Onboarding/Headline';
import CuffPreview from './CuffPreview';
import RoundedButton from '../../../bits/RoundedButton';

const PARSER_REGEX = /^([0-9A-F]{6})([0-9A-Z]{3})$/i;

const parseDeviceId = fullId => {
    const parseResult = PARSER_REGEX.exec(fullId);
    if (!parseResult) {
        return undefined;
    }
    return {
        deviceId: parseInt(parseResult[1], 16),
        secondFactor: parseResult[2],
    };
};

const Manual = ({ style, submit, busy }) => {
    const [serial, setSerial] = React.useState('');
    const onPress = React.useCallback(() => {
        const parse = parseDeviceId(serial);
        if (parse) {
            submit(parse);
        }
    }, [submit, serial]);

    return (
        <KeyboardAvoidingView
            style={[styles.scrollContainer, { paddingTop: 0 }]}
            keyboardVerticalOffset={96}
            behavior="padding"
        >
            <Headline>Enter your Flare serial number</Headline>
            <CuffPreview
                style={{ alignSelf: 'center', marginTop: 48 }}
                onChangeText={setSerial}
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

export default Manual;
