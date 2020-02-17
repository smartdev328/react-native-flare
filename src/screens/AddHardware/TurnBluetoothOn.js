/* eslint-disable react/jsx-curly-brace-presence,react/jsx-one-expression-per-line */
import * as React from 'react';
import { Image, Linking, StyleSheet, Text } from 'react-native';

import PermissionsScreen, { TaskItem } from './PermissionsScreen';
import { openSettings } from '../../bits/settingsUrl';

import bluetoothIcon from '../../assets/ios-bluetooth-icon.png';
import btControlCenter from '../../assets/bt-control-center.png';
import switchOn from '../../assets/switch-on.png';

const styles = StyleSheet.create({
    underline: {
        textDecorationLine: 'underline',
    },
    extraText: {
        fontFamily: 'Nocturno Display Std',
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 24,
        marginBottom: 8,
    },
    btControlCenter: {
        width: 146,
        height: 77,
        alignSelf: 'center',
    },
});

const Subhead = () => (
    <>
        Make sure your <Text style={styles.underline}>device</Text> has
        bluetooth turned on.
    </>
);

const Extra = () => (
    <>
        <Text style={styles.extraText}>(Or use your control center.)</Text>
        <Image style={styles.btControlCenter} source={btControlCenter} />
    </>
);

const TurnBluetoothOn = ({
    style,
    tellMeMore,
    bluetoothStatus,
    nextPage,
    force = false,
}) => {
    const [didAdvance, setDidAdvance] = React.useState(force);

    React.useEffect(() => {
        if (bluetoothStatus === 'on' && !didAdvance) {
            setDidAdvance(true);
            nextPage();
        }
    }, [bluetoothStatus, didAdvance, nextPage]);

    const visitSettings = React.useCallback(async () => {
        try {
            await Linking.openURL('prefs:');
        } catch (e) {
            await openSettings();
        }
    }, []);

    return (
        <PermissionsScreen
            style={style}
            headline="Is your Bluetooth On?"
            subhead={<Subhead />}
            tellMeMore={tellMeMore}
            extra={<Extra />}
            visitSettings={visitSettings}
        >
            <TaskItem emoji="👆" text="Visit Phone Settings" first />
            <TaskItem icon={bluetoothIcon} text="Tap “Bluetooth”" />
            <TaskItem icon={switchOn} text="Toggle Bluetooth “On”" wide />
        </PermissionsScreen>
    );
};

export default TurnBluetoothOn;
