import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Headline from '../Onboarding/Headline';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import { openSettings } from '../../bits/settingsUrl';

import locationIcon from '../../assets/ios-location-icon.png';
import { checkLocationsPermission } from '../../actions/userActions';

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
        borderBottomWidth: 1,
        borderBottomColor: '#F0F3F4',
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

const TaskItem = ({ emoji, icon, text, last = false }) => (
    <View
        style={[
            localStyles.taskContainer,
            last ? undefined : localStyles.taskContainerBorder,
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

const AlwaysAllow = ({ nextPage, style = [], tellMeMore, force = false }) => {
    const [didAdvance, setDidAdvance] = React.useState(force);
    const dispatch = useDispatch();

    const locationPermission = useSelector(
        ({ user: { permissions } }) =>
            typeof permissions === 'object' &&
            'location' in permissions &&
            permissions.location
    );

    React.useEffect(() => {
        if (locationPermission && !didAdvance) {
            setDidAdvance(true);
            nextPage();
        }
    }, [locationPermission, didAdvance, nextPage]);

    // poll for permissions status, ugh
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(checkLocationsPermission());
        }, 200);
        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <View style={[styles.centerContainer, ...style]}>
            <Headline style={styles.headline}>“Always Allow”</Headline>
            <View style={styles.line} />
            <Text style={[styles.subhead, { textAlign: 'center' }]}>
                Our connected jewelry only works if it can “always” access your
                location.
            </Text>
            <View style={styles.spacer} />
            <View style={localStyles.cardContainer}>
                <TaskItem emoji="👆" text="Visit Settings" />
                <TaskItem icon={locationIcon} text="Tap “Location”" />
                <TaskItem emoji="✨" text="Select “Always”" last />
            </View>
            <View style={styles.spacer} />
            <RoundedButton
                text="Visit Settings 👆"
                onPress={openSettings}
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
