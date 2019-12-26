import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { PERMISSIONS } from 'react-native-permissions';

import styles from './styles';
import Headline from '../Onboarding/Headline';
import * as userActions from '../../actions/userActions';
import RoundedButton from '../../bits/RoundedButton';

import starryLocation from '../../assets/starry-location.png';

const LocationPrimer = ({
    style,
    nextPage,
    getPermission,
    locationPermission,
    requestingPermissions,
}) => {
    React.useEffect(() => {
        if (locationPermission && !requestingPermissions) {
            nextPage();
        }
    }, [locationPermission, requestingPermissions, nextPage]);

    const allowLocation = React.useCallback(() => {
        getPermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
    }, [getPermission]);

    const tellMeMore = React.useCallback(() => {
        Navigation.showModal({
            component: {
                name:
                    'com.flarejewelry.onboarding.addhardware.aboutpermissions',
            },
        });
    }, []);

    return (
        <View style={[styles.centerContainer, ...style]}>
            <Headline style={styles.headline}>Enable Location</Headline>
            <View style={styles.line} />
            <Text style={[styles.subhead, { textAlign: 'center' }]}>
                You’ll need to enable your location in order to use Flare.
            </Text>
            <View style={styles.spacer} />
            <Image
                style={{ width: 202, height: 271 }}
                source={starryLocation}
            />
            <View style={styles.spacer} />
            <RoundedButton
                text="Allow Location"
                onPress={allowLocation}
                width={240}
            />
            <RoundedButton
                text="Why do you need it?"
                onPress={tellMeMore}
                invisible
                width={240}
                wrapperStyle={{ marginVertical: 12 }}
            />
        </View>
    );
};

const mapStateToProps = ({ user: { permissions, requestingPermissions } }) => ({
    locationPermission:
        typeof permissions === 'object' &&
        'location' in permissions &&
        permissions.location,
    requestingPermissions,
});

const mapDispatchToProps = {
    getPermission: userActions.getPermission,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationPrimer);
