import * as React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.theme.cream,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 32,
        alignSelf: 'stretch',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    head: {
        fontFamily: 'Nocturno Display Std',
        fontSize: 24,
        textAlign: 'center',
        color: Colors.black,
    },
    body: {
        fontSize: 14,
        textAlign: 'center',
        color: Colors.black,
        marginBottom: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    firstButton: {
        marginRight: 16,
    },
    buttonMargin: {
        marginTop: 12,
    },
});

const WouldYouRather = ({ fakeCall, textCrew, cardHead, cardBody }) => (
    <>
        <Text style={styles.head}>{cardHead}</Text>
        <Text style={styles.body}>{cardBody}</Text>
        <View style={styles.buttonContainer}>
            <RoundedButton
                useGradient={false}
                disabled={typeof fakeCall !== 'function'}
                onPress={fakeCall}
                text="Get a fake call"
                wrapperStyle={styles.firstButton}
                height={46}
                width={146}
                fontSize={14}
                color={Colors.theme.peach}
            />
            <RoundedButton
                useGradient={false}
                disabled={typeof textCrew !== 'function'}
                onPress={textCrew}
                text="Text your crew"
                height={46}
                width={146}
                fontSize={14}
                color={Colors.theme.purple}
            />
        </View>
    </>
);

const Nice = ({ nextScenario, addToContacts, finishUp, busy }) => {
    const didAddToContacts = useSelector(
        state => state.user.scenarios.addedToContacts
    );
    return (
        <>
            <Text style={styles.head}>Nice.</Text>
            <RoundedButton
                useGradient
                wrapperStyle={styles.buttonMargin}
                onPress={finishUp || nextScenario}
                text={finishUp ? 'Finish Onboarding' : 'Next Scenario'}
                busy={busy}
                width={242}
            />
            {!didAddToContacts && (
                <RoundedButton
                    useGradient={false}
                    wrapperStyle={styles.buttonMargin}
                    onPress={addToContacts}
                    text="Add Flare to Contacts"
                    width={242}
                />
            )}
        </>
    );
};

const BottomSheet = ({
    style,
    extraPaddingBottom = 0,
    fakeCall,
    textCrew,
    postDemo,
    addToContacts,
    nextScenario,
    finishUp,
    busy,
    cardHead,
    cardBody,
    ...props
}) => (
    <Animated.View
        style={[
            styles.container,
            { paddingBottom: 48 + extraPaddingBottom },
            style,
        ]}
        {...props}
    >
        {postDemo ? (
            <Nice
                addToContacts={addToContacts}
                nextScenario={nextScenario}
                finishUp={finishUp}
                busy={busy}
            />
        ) : (
            <WouldYouRather
                fakeCall={fakeCall}
                textCrew={textCrew}
                cardHead={cardHead}
                cardBody={cardBody}
            />
        )}
    </Animated.View>
);

export default BottomSheet;
