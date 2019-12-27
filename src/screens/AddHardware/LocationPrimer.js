import * as React from 'react';
import { Image, Text, View } from 'react-native';
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
    requestingPermissions,
    tellMeMore,
}) => {
    const [didRequestPermission, setDidRequestPermission] = React.useState(
        false
    );
    React.useEffect(() => {
        if (requestingPermissions) {
            setDidRequestPermission(true);
        } else if (!requestingPermissions && didRequestPermission) {
            nextPage();
        }
    }, [requestingPermissions, nextPage, didRequestPermission]);

    const allowLocation = React.useCallback(() => {
        getPermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
    }, [getPermission]);

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

const mapStateToProps = ({ user: { requestingPermissions } }) => ({
    requestingPermissions,
});

const mapDispatchToProps = {
    getPermission: userActions.getPermission,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationPrimer);
