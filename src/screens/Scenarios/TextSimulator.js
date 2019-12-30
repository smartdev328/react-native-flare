import * as React from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import Aura from '../../bits/Aura';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import { scenarioDidText } from '../../actions/regActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    entry: {
        flexDirection: 'column',
        width: 280,
        paddingHorizontal: 20,
        marginTop: 24,
        marginHorizontal: 32,
        borderColor: Colors.black,
    },
    entryLeft: {
        borderLeftWidth: 5,
        alignSelf: 'flex-start',
    },
    entryRight: {
        borderRightWidth: 5,
        alignSelf: 'flex-end',
    },
    entryBody: {
        fontSize: 14,
        paddingBottom: 8,
        color: Colors.theme.cream,
    },
    entryTimestamp: {
        fontSize: 8,
        color: Colors.theme.cream,
    },
    textLeft: {
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    textRight: {
        textAlign: 'right',
        alignSelf: 'flex-end',
    },
    buttonWrapper: {
        marginTop: 'auto',
        marginBottom: 24,
        alignSelf: 'center',
    },
});

const Entry = ({ text, timestamp = 'just now', left = true, style }) => (
    <Animated.View
        style={[
            styles.entry,
            left ? styles.entryLeft : styles.entryRight,
            style,
        ]}
    >
        <Text
            style={[
                styles.entryBody,
                left ? styles.textLeft : styles.textRight,
            ]}
        >
            {text}
        </Text>
        <Text
            style={[
                styles.entryTimestamp,
                left ? styles.textLeft : styles.textRight,
            ]}
        >
            {timestamp}
        </Text>
    </Animated.View>
);

const messages = [
    'You started a Flare. 📢',
    'Looks like you’re testing your Flare! 💕 Holding down your Flare button is how we know to text your designated friends.',
    'Texts from your crew will appear here so that any Flares you send are discreet (and so your phone won’t start buzzing out of nowhere. 🐝 🎇',
    'Add your trusty crew in-app so that you can text them with your bracelet.',
    'Customize how YOU are notified that you sent a flare in your settings. 🤫',
];

const TextSimulator = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [animations] = React.useState(
        messages.map(() => new Animated.Value(0.0))
    );

    const fullSuccess = React.useCallback(() => {
        dispatch(scenarioDidText());
        onSuccess();
    }, [dispatch, onSuccess]);

    React.useEffect(() => {
        Animated.sequence(
            animations.map(anim =>
                Animated.timing(anim, {
                    useNativeDriver: true,
                    toValue: 1.0,
                    duration: 1000,
                    easing: Easing.ease,
                })
            )
        ).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Aura />
            {messages.map((message, index) => (
                <Entry
                    text={message}
                    left={index !== 0}
                    style={{ opacity: animations[index] }}
                />
            ))}
            <RoundedButton
                onPress={fullSuccess}
                text="Situation Resolved"
                useGradient={false}
                wrapperStyle={styles.buttonWrapper}
                width={200}
                fontSize={14}
                height={46}
            />
        </SafeAreaView>
    );
};

export default TextSimulator;
