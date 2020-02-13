import * as React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

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

const Manual = ({ submit, busy, reset, error, squashed }) => {
    const [serial, setSerial] = React.useState('');
    const parse = parseDeviceId(serial);
    const onPress = React.useCallback(() => {
        if (parse) {
            submit(parse);
        }
    }, [submit, parse]);
    const onChangeText = React.useCallback(
        text => {
            setSerial(text);
            reset();
        },
        [reset]
    );
    const insets = useSafeArea();
    const keyboardVerticalOffset = (squashed ? 84 : 96) + insets.bottom;

    return (
        <KeyboardAvoidingView
            style={[styles.scrollContainer, { paddingTop: 0 }]}
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior="padding"
        >
            <Headline squashed={squashed}>
                Enter your Flare serial number
            </Headline>
            <CuffPreview
                style={{ alignSelf: 'center', marginTop: 8 }}
                onChangeText={onChangeText}
                onSubmitEditing={onPress}
                error={
                    error
                        ? 'Please recheck and reenter your serial number'
                        : undefined
                }
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
                disabled={!parse}
            />
        </KeyboardAvoidingView>
    );
};

export default Manual;
