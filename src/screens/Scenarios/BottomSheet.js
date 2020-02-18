import * as React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import useDimensions from '../../bits/useDimensions';
import { MIN_NON_SQUASHED_HEIGHT } from '../../constants/Config';

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
    containerSquashed: {
        paddingHorizontal: 16,
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

const WouldYouRather = React.memo(
    ({ fakeCall, textCrew, cardHead, cardBody }) => {
        const showFirst = typeof fakeCall === 'function';
        const showSecond = typeof textCrew === 'function';

        return (
            <>
                <Text style={styles.head}>{cardHead}</Text>
                <Text style={styles.body}>{cardBody}</Text>
                <View style={styles.buttonContainer}>
                    {showFirst && (
                        <RoundedButton
                            onPress={fakeCall}
                            text="Get a fake call"
                            wrapperStyle={
                                showSecond ? styles.firstButton : undefined
                            }
                            height={46}
                            width={146}
                            fontSize={14}
                            color={Colors.theme.peach}
                        />
                    )}
                    {showSecond && (
                        <RoundedButton
                            onPress={textCrew}
                            text="Text your crew"
                            height={46}
                            width={146}
                            fontSize={14}
                            color={Colors.theme.purple}
                        />
                    )}
                </View>
            </>
        );
    }
);

const Nice = ({ nextScenario, addToContacts, finishUp, busy }) => {
    const [didAddToContacts, didCall] = useSelector(state => [
        state.user.addedToContacts,
        state.user.scenarios.didCall,
    ]);
    return (
        <>
            <Text style={styles.head}>Nice.</Text>
            {didCall && !didAddToContacts && (
                <RoundedButton
                    useGradient={false}
                    wrapperStyle={styles.buttonMargin}
                    onPress={addToContacts}
                    text="Add Flare to Contacts 😉"
                    width={242}
                />
            )}
            <RoundedButton
                useGradient
                wrapperStyle={styles.buttonMargin}
                onPress={finishUp || nextScenario}
                text={finishUp ? 'Finish Onboarding' : 'Next Scenario'}
                busy={busy}
                width={242}
            />
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
}) => {
    const dimensions = useDimensions();
    const squashed = dimensions.height < MIN_NON_SQUASHED_HEIGHT;

    return (
        <Animated.View
            style={[
                styles.container,
                { paddingBottom: (squashed ? 24 : 48) + extraPaddingBottom },
                squashed ? styles.containerSquashed : undefined,
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
};

export default BottomSheet;
