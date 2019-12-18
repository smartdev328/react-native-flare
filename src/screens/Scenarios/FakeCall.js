import * as React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

import styles from './styles';
import Aura from '../../bits/Aura';
import WhiteBar from '../Onboarding/WhiteBar';
import Headline from '../Onboarding/Headline';
import Colors from '../../bits/Colors';
import Geyser from '../../bits/Geyser';

import aura from '../../assets/aura-6-light.jpg';
import cuff from '../../assets/cuff-v2.png';
import RoundedButton from '../../bits/RoundedButton';

const FakeCall = ({ onBack }) => {
    const [havingTrouble, setHavingTrouble] = React.useState(false);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setHavingTrouble(true);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Aura source={aura} />
            <WhiteBar showLogo={false} black goBack={onBack} />
            <Headline style={[styles.headline, { color: Colors.theme.purple }]}>
                {'Ready to try it?\n'}
                <Text style={{ fontStyle: 'italic' }}>Press for a call.</Text>
            </Headline>
            <View style={[styles.line, { backgroundColor: Colors.black }]} />
            <Text style={[styles.text, styles.blackText]}>
                Press the button on your cuff and we’ll call you. Listen and
                react to the call, and hang up whenever!
            </Text>
            <Geyser />
            <Image source={cuff} style={{ width: 241, height: 215 }} />
            <RoundedButton
                text="I got the call"
                useGradient={false}
                wrapperStyle={{ marginTop: 24, marginBottom: 'auto' }}
                width={146}
                height={46}
                fontSize={14}
            />
            {havingTrouble && (
                <RoundedButton
                    text="Having trouble?"
                    useGradient={false}
                    invisible
                    width={146}
                    height={46}
                    fontSize={14}
                />
            )}
        </SafeAreaView>
    );
};

export default FakeCall;
