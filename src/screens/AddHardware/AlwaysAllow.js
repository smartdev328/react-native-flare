import * as React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Headline from '../Onboarding/Headline';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import { openSettings } from '../../bits/settingsUrl';
import { checkLocationsPermission } from '../../actions/userActions';
import useBluetoothStatus from '../../bits/useBluetoothStatus';

import locationIcon from '../../assets/ios-location-icon.png';
import bluetoothIcon from '../../assets/ios-bluetooth-icon.png';

const localStyles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.white,
        alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRadius: 30,
        shadowColor: '#505C62',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.13,
    },
    taskContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        height: 56,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    taskContainerBorder: {
        borderTopWidth: 1,
        borderTopColor: '#F0F3F4',
    },
    taskIcon: {
        width: 26,
        height: 25,
    },
    taskEmoji: {
        textAlign: 'center',
        fontSize: 20,
    },
    taskText: {
        marginLeft: 16,
        fontSize: 20,
        fontFamily: 'Nocturno Display Std',
    },
});

const TaskItem = ({ emoji, icon, text, first = false }) => (
    <View
        style={[
            localStyles.taskContainer,
            first ? undefined : localStyles.taskContainerBorder,
        ]}
    >
        {typeof emoji === 'string' ? (
            <Text style={[localStyles.taskIcon, localStyles.taskEmoji]}>
                {emoji}
            </Text>
        ) : (
            <Image source={icon} style={localStyles.taskIcon} />
        )}
        <Text style={localStyles.taskText}>{text}</Text>
    </View>
);

const AlwaysAllow = ({
    nextPage,
    style = [],
    tellMeMore,
    force = false,
    firstHadPermission,
}) => {
    const [visitedSettings, setVisitedSettings] = React.useState(false);
    const [didAdvance, setDidAdvance] = React.useState(force);
    const dispatch = useDispatch();

    const locationPermission = useSelector(
        ({ user: { permissions } }) =>
            typeof permissions === 'object' &&
            'location' in permissions &&
            permissions.location
    );

    const bluetoothStatus = useBluetoothStatus();

    React.useEffect(() => {
        // iOS 13 and later grant a provisional allow-always permission. if we
        // think we have this provisional permission, refuse to advance until
        // the user clicks the button anyway.
        const mustClickButton = Platform.select({
            ios: !firstHadPermission && parseInt(Platform.Version, 10) >= 13,
            default: false,
        });

        if (
            (!mustClickButton || visitedSettings) &&
            locationPermission &&
            bluetoothStatus === 'on' &&
            !didAdvance
        ) {
            setDidAdvance(true);
            nextPage();
        }
    }, [
        locationPermission,
        didAdvance,
        nextPage,
        visitedSettings,
        firstHadPermission,
        bluetoothStatus,
    ]);

    const visitSettings = React.useCallback(() => {
        setVisitedSettings(true);
        openSettings();
    }, []);

    // poll for permissions status, ugh
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(checkLocationsPermission());
        }, 200);
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const showBluetoothLine = !['on', ''].includes(bluetoothStatus);

    return (
        <View style={[styles.centerContainer, ...style]}>
            <Headline style={styles.headline}>“Always Allow”</Headline>
            <View style={styles.line} />
            <Text style={[styles.subhead, { textAlign: 'center' }]}>
                Our connected jewelry only works if it can “always” access your
                location and Bluetooth is turned on.
            </Text>
            <View style={styles.spacer} />
            <View style={localStyles.cardContainer}>
                <TaskItem emoji="👆" text="Visit Settings" first />
                <TaskItem icon={locationIcon} text="Tap “Location”" />
                <TaskItem emoji="✨" text="Select “Always”" />
                {showBluetoothLine && (
                    <TaskItem
                        icon={bluetoothIcon}
                        text={
                            bluetoothStatus === 'off'
                                ? 'Ensure Bluetooth is turned on'
                                : 'Turn “Bluetooth” on'
                        }
                    />
                )}
            </View>
            <View style={styles.spacer} />
            <RoundedButton
                text="Visit Settings 👆"
                onPress={visitSettings}
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

export default AlwaysAllow;
