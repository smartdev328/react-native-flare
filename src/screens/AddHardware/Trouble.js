import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import styles from './styles';
import Headline from '../Onboarding/Headline';
import { setPreferredPairingMethod } from '../../actions/regActions';
import RoundedButton from '../../bits/RoundedButton';

const localStyles = StyleSheet.create({
    wip: {
        color: '#FF9F00',
        fontFamily: 'Nocturno Display Std',
        fontSize: 60,
        marginTop: 'auto',
        marginBottom: 'auto',
        alignSelf: 'center',
    },
});

const Trouble = ({ componentId }) => {
    const dispatch = useDispatch();

    const dismiss = React.useCallback(() => {
        Navigation.dismissModal(componentId);
    }, [componentId]);

    const switchToManual = React.useCallback(() => {
        dispatch(setPreferredPairingMethod('manual'));
        Navigation.dismissModal(componentId);
    }, [componentId, dispatch]);

    return (
        <SafeAreaView style={[styles.helpContainer, { alignItems: 'center' }]}>
            <Headline>Having Trouble?</Headline>
            <Text style={localStyles.wip}>WIP</Text>
            <RoundedButton
                wrapperStyle={styles.spacedButton}
                text="Retry"
                useGradient={false}
                onPress={dismiss}
                width={240}
                height={48}
                fontSize={14}
            />
            <RoundedButton
                wrapperStyle={styles.spacedButton}
                text="Enter Serial Number"
                useGradient={false}
                outline
                onPress={switchToManual}
                width={240}
                height={48}
                fontSize={14}
            />
        </SafeAreaView>
    );
};

export default Trouble;
