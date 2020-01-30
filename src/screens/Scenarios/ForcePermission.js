import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';
import { PERMISSIONS } from 'react-native-permissions';

import AlwaysAllow from '../AddHardware/AlwaysAllow';
import { getPermission } from '../../actions/userActions';

// If the user resumes onboarding, they might not have granted location
// permission, so we need to re-show the screen to ask for it.

const ForcePermission = ({ onNext }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getPermission(PERMISSIONS.IOS.LOCATION_ALWAYS));
    });

    const aboutPermissions = React.useCallback(() => {
        Navigation.showModal({
            component: {
                name:
                    'com.flarejewelry.onboarding.addhardware.aboutpermissions',
            },
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AlwaysAllow
                nextPage={onNext}
                tellMeMore={aboutPermissions}
                style={[{ flex: 1, marginTop: 32 }]}
            />
        </SafeAreaView>
    );
};

export default ForcePermission;
