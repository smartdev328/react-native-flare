import * as React from 'react';
import {
    Animated,
    Easing,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import { scenarioDidText } from '../../actions/regActions';
import haveEmoji12 from '../../bits/haveEmoji12';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#282737',
    },
    headline: {
        color: Colors.theme.cream,
        textAlign: 'center',
        alignSelf: 'stretch',
        fontSize: 20,
        fontFamily: 'Nocturno Display Std',
        marginTop: 48,
    },
    subhead: {
        color: Colors.theme.cream,
        textAlign: 'center',
        alignSelf: 'stretch',
        fontSize: 12,
        marginBottom: 24,
    },
    entryContainer: {
        flex: 1,
        backgroundColor: '#4C5282',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 12,
    },
    entry: {
        flexDirection: 'column',
        width: 280,
        marginTop: 24,
        marginHorizontal: 32,
        alignSelf: 'flex-start',
    },
    entryBodyWrapper: {
        backgroundColor: '#F8F5F129',
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        padding: 16,
        marginBottom: 4,
    },
    entryBody: {
        fontSize: 14,
        color: Colors.theme.cream,
    },
    entryDetailBox: {
        flexDirection: 'row',
    },
    entrySender: {
        fontSize: 12,
        color: Colors.white,
        marginRight: 8,
    },
    entryTimestamp: {
        fontSize: 12,
        color: Colors.white,
        opacity: 0.7,
    },
    buttonWrapper: {
        marginTop: 'auto',
        paddingTop: 24,
        marginBottom: 24,
        alignSelf: 'center',
    },
});

const Entry = ({ text, timestamp = 'just now', style }) => (
    <Animated.View style={[styles.entry, style]}>
        <View style={styles.entryBodyWrapper}>
            <Text style={styles.entryBody}>{text}</Text>
        </View>
        <View style={styles.entryDetailBox}>
            <Text style={styles.entrySender}>Flare</Text>
            <Text style={styles.entryTimestamp}>{timestamp}</Text>
        </View>
    </Animated.View>
);

// WOMAN STANDING emoji is available only on iOS 13.2+ (and Android 10.0+),
// don't use it on older versions of the platform.
const womanStanding = haveEmoji12() ? '🧍‍♀️' : '';

const messages = [
    `Heyhey! Looks like you’re testing your Flare! 💕 Holding down your Flare button for 3 seconds is how we know to text your designated friend(s). ${womanStanding}👨‍👨‍👧‍👧👯`,
    'Text responses from your Crew will appear like this in the app. But you won’t get texts on your phone (so it won’t start buzzing out of nowhere.) 🐝',
    'Choose contacts to add to your Crew so you’ll always have trusty friends by your side.',
    'Press ‘I’m okay’ when you’ve left the situation and we’ll let your Crew know. Try it now to continue.',
];

const TextSimulator = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const insets = useSafeArea();
    const scrollRef = React.useRef();
    const [animations] = React.useState(() =>
        messages.map(() => new Animated.Value(0.0))
    );
    const [current, setCurrent] = React.useState(0);
    const [busy, setBusy] = React.useState(true);

    const fullSuccess = React.useCallback(() => {
        dispatch(scenarioDidText());
        onSuccess();
    }, [dispatch, onSuccess]);

    const nextAnimation = React.useCallback(() => {
        setBusy(true);
        if (scrollRef.current) {
            scrollRef.current.scrollToEnd();
        }
        Animated.timing(animations[current], {
            useNativeDriver: true,
            toValue: 1.0,
            duration: 300,
            easing: Easing.ease,
        }).start(() => {
            setBusy(false);
            setCurrent(n => n + 1);
        });
    }, [animations, current]);

    React.useEffect(() => {
        if (current === 0) {
            nextAnimation();
        }
    }, [current, nextAnimation]);

    const done = current === messages.length;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.headline}>You started a message.</Text>
            <Text style={styles.subhead}>just now</Text>
            <View
                style={[
                    styles.entryContainer,
                    { paddingBottom: insets.bottom },
                ]}
            >
                <ScrollView
                    alwaysBounceVertical={false}
                    ref={scrollRef}
                    indicatorStyle="white"
                >
                    {messages.map(
                        (message, index) =>
                            index <= current && (
                                <Entry
                                    text={message}
                                    style={{ opacity: animations[index] }}
                                />
                            )
                    )}
                </ScrollView>
                <RoundedButton
                    onPress={done ? fullSuccess : nextAnimation}
                    text={done ? 'I’m okay 👌' : 'Next'}
                    useGradient={false}
                    wrapperStyle={styles.buttonWrapper}
                    width={200}
                    fontSize={14}
                    height={46}
                    disabled={busy}
                />
            </View>
        </View>
    );
};

export default TextSimulator;
