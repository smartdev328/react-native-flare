import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Colors from '../../bits/Colors';
import WhiteBar from '../Onboarding/WhiteBar';
import AlwaysAllow from '../AddHardware/AlwaysAllow';

const PermissionsReminder = ({ componentId }) => {
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
            <AlwaysAllow
                nextPage={close}
                tellMeMore={tellMeMore}
                force
                style={[{ flex: 1 }]}
            />
        </SafeAreaView>
    );
};

export default PermissionsReminder;
