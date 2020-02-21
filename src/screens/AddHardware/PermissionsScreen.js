import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import styles from './styles';
import Colors from '../../bits/Colors';
import Headline from '../Onboarding/Headline';
import RoundedButton from '../../bits/RoundedButton';

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
    wideIcon: {
        width: 36,
        marginHorizontal: -5,
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

export const TaskItem = ({
    emoji,
    icon,
    text,
    first = false,
    wide = false,
}) => (
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
            <Image
                source={icon}
                style={[
                    localStyles.taskIcon,
                    wide ? localStyles.wideIcon : undefined,
                ]}
            />
        )}
        <Text style={localStyles.taskText}>{text}</Text>
    </View>
);

const PermissionsScreen = ({
    style,
    headline,
    subhead,
    children,
    visitSettings,
    tellMeMore,
    extra = null,
}) => (
    <View style={[styles.centerContainer, ...style]}>
        <Headline style={styles.headline}>{headline}</Headline>
        <View style={styles.line} />
        <Text style={[styles.subhead, { textAlign: 'center' }]}>{subhead}</Text>
        <View style={styles.spacer} />
        <View style={localStyles.cardContainer}>{children}</View>
        {extra}
        <View style={styles.spacer} />
        <RoundedButton
            neumorphicDark
            text="Visit Settings 👆"
            onPress={visitSettings}
            width={240}
            wrapperStyle={styles.spacedButton}
        />
        {typeof tellMeMore === 'function' ? (
            <RoundedButton
                text="Why do you need it?"
                onPress={tellMeMore}
                invisible
                width={240}
                wrapperStyle={styles.spacedButton}
            />
        ) : null}
    </View>
);

export default React.memo(PermissionsScreen);
