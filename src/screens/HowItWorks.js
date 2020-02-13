import * as React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Colors from '../bits/Colors';
import CloseButton from './CloseButton';
import Headline from './Onboarding/Headline';
import GoldenRules from './Scenarios/GoldenRules';
import RoundedButton from '../bits/RoundedButton';

import incomingCall from '../assets/incoming-flare-call.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.theme.cream,
        alignItems: 'center',
    },
    shrink: {
        height: 32,
        flexShrink: 1,
    },
    headline: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.black,
        marginBottom: 0,
    },
    line: {
        height: 1,
        width: 33,
        marginVertical: 12,
        backgroundColor: Colors.black,
    },
    subhead: {
        width: 300,
        color: Colors.black,
        fontSize: 15,
        fontFamily: 'Nocturno Display Std',
        textAlign: 'center',
        marginBottom: 48,
    },
    l: {
        alignSelf: 'flex-start',
        marginLeft: 32,
    },
    sectionhead: {
        color: Colors.black,
        fontSize: 20,
        fontFamily: 'Nocturno Display Std',
    },
    incomingCall: {
        marginTop: 12,
        width: 206,
        height: 134,
        marginBottom: 32,
    },
    r: {
        alignSelf: 'flex-end',
        marginRight: 32,
    },
    chatItem: {
        backgroundColor: Colors.white,
        borderRadius: 30,
        maxWidth: 240,
        padding: 16,
        marginTop: 16,
    },
    chatItemText: {
        color: Colors.black,
        fontSize: 14,
    },
    emojis: {
        marginTop: -10,
        fontSize: 20,
        paddingRight: 32,
    },
    grow: {
        flexGrow: 1,
        alignSelf: 'stretch',
    },
    button: {
        marginTop: 16,
        marginBottom: 24,
    },
});

const HowItWorks = ({ componentId }) => {
    const [golden, setGolden] = React.useState(false);
    const close = React.useCallback(() => {
        Navigation.dismissModal(componentId);
    }, [componentId]);
    const toggleGolden = React.useCallback(() => {
        setGolden(g => !g);
    }, []);

    if (golden) {
        return <GoldenRules finishUp={toggleGolden} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <CloseButton black onPress={close} />
            <View style={styles.shrink} />
            <Headline style={styles.headline}>How Flare Works</Headline>
            <View style={styles.line} />
            <Text style={styles.subhead}>The basics.</Text>
            <ScrollView style={styles.grow} alwaysBounceVertical={false}>
                <Text style={[styles.l, styles.sectionhead]}>
                    Press for a call.
                </Text>
                <Image
                    style={[styles.l, styles.incomingCall]}
                    source={incomingCall}
                />
                <Text style={[styles.r, styles.sectionhead]}>
                    Hold for a friend.
                </Text>
                <View style={[styles.r, styles.chatItem]}>
                    <Text style={styles.chatItemText}>
                        Are any of you with Nicky?
                    </Text>
                </View>
                <View style={[styles.r, styles.chatItem]}>
                    <Text style={styles.chatItemText}>
                        We just talked. She’s all good! Just needed an excuse to
                        leave.
                    </Text>
                </View>
                <Text style={[styles.r, styles.emojis]}>👌✨💛</Text>
            </ScrollView>
            <RoundedButton
                onPress={toggleGolden}
                wrapperStyle={styles.button}
                text="Read More"
                width={240}
            />
        </SafeAreaView>
    );
};

export default HowItWorks;
