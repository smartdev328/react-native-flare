import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Colors from '../../bits/Colors';
import WhiteBar from '../Onboarding/WhiteBar';
import AlwaysAllow from '../AddHardware/AlwaysAllow';
import TurnBluetoothOn from '../AddHardware/TurnBluetoothOn';
import useBluetoothStatus from '../../bits/useBluetoothStatus';

const PermissionsReminder = ({ componentId, bluetooth = false }) => {
    const bluetoothStatus = useBluetoothStatus();

    const flex = React.useMemo(() => [{ flex: 1 }], []);

    const close = React.useCallback(() => {
        Navigation.dismissModal(componentId);
    }, [componentId]);

    const tellMeMore = React.useCallback(() => {
        Navigation.showModal({
            component: {
                name:
                    'com.flarejewelry.onboarding.addhardware.aboutpermissions',
            },
        });
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: Colors.theme.cream,
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <StatusBar barStyle="dark-content" />
            <WhiteBar showBack showLogo={false} black goBack={close} />
            {bluetooth ? (
                <TurnBluetoothOn
                    nextPage={close}
                    tellMeMore={tellMeMore}
                    style={flex}
                    bluetoothStatus={bluetoothStatus}
                    force
                />
            ) : (
                <AlwaysAllow
                    nextPage={close}
                    tellMeMore={tellMeMore}
                    force
                    style={flex}
                />
            )}
        </SafeAreaView>
    );
};

export default PermissionsReminder;
