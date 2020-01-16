/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme.cream,
        alignItems: 'stretch',
    },
    h1: {
        fontFamily: 'Nocturno Display Std',
        fontSize: 30,
        textAlign: 'center',
        color: Colors.black,
        marginTop: 32,
        marginHorizontal: 24,
    },
    line: {
        backgroundColor: Colors.black,
        height: 1,
        width: 33,
        marginVertical: 12,
        alignSelf: 'center',
    },
    body: {
        fontFamily: 'Nocturno Display Std',
        fontSize: 18,
        textAlign: 'center',
        color: Colors.black,
        marginHorizontal: 24,
    },
    fakeTextContainer: {
        marginTop: 16,
        marginHorizontal: 24,
        backgroundColor: Colors.theme.purple,
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        padding: 24,
    },
    fakeText: {
        textAlign: 'left',
        fontSize: 14,
        alignSelf: 'stretch',
        color: Colors.theme.cream,
    },
    spacedButton: {
        marginTop: 'auto',
        marginBottom: 12,
        alignSelf: 'center',
    },
    otherButton: {
        alignSelf: 'center',
    },
});

const generateFullName = (first, last) => {
    if (first && last) {
        return `${first} ${last[0].toUpperCase()}`;
    } else if (first) {
        return first;
    } else {
        return 'Your friend';
    }
};

const TextConfirm = ({ componentId }) => {
    const { firstName, lastName } = useSelector(({ user: { profile } }) => ({
        firstName: profile ? profile.first_name : undefined,
        lastName: profile ? profile.last_name : undefined,
    }));

    const fullName = generateFullName(firstName, lastName);

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.h1}>You have a crew!</Text>
            <View style={styles.line} />
            <Text style={styles.body}>
                We need to text your crew members individually so that they know
                that you’ve chosen them and what that means. (It’s also nice for
                them to already have our number.)
                {'\n\n'}
                Here’s what we will text them:
            </Text>
            <View style={styles.fakeTextContainer}>
                <Text style={styles.fakeText}>
                    Hey hey! {fullName} has added you to their Crew of friends
                    in Flare (a new safety jewelry company) because you always
                    have their back.
                    {'\n\n'}
                    You will receive messages when {fullName} presses the hidden
                    button on their bracelet to indicate that they’re in an iffy
                    situation and want you to check up on them.
                    {'\n\n'}
                    Learn more at http://bit.ly/FlareCrew.
                </Text>
            </View>
            <RoundedButton
                wrapperStyle={styles.spacedButton}
                text="Text My Crew"
                width={240}
            />
            <RoundedButton
                wrapperStyle={styles.otherButton}
                invisible
                text="Not Now"
                width={240}
            />
        </SafeAreaView>
    );
};

export default TextConfirm;
