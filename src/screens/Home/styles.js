import { StyleSheet } from 'react-native';

import Colors from '../../bits/Colors';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: Colors.theme.cream,
        paddingBottom: Spacing.small,
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16,
    },
    centered: {
        alignSelf: 'center',
        textAlign: 'center',
    },
    deviceSelector: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 9,
    },
    bluetoothDisabledWarning: {
        margin: Spacing.medium,
    },
    bluetoothDisabledWarningTitle: {
        paddingHorizontal: Spacing.large,
        textAlign: 'center',
        fontSize: Type.size.medium,
        fontWeight: '700',
    },
    devOnlyButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default styles;
