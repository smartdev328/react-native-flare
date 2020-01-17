import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import Headline from '../Onboarding/Headline';
import CloseButton from './CloseButton';
import RoundedButton from '../../bits/RoundedButton';

import saraAndQuinn from '../../assets/sara-and-quinn.png';

const localStyles = StyleSheet.create({
    orange: {
        backgroundColor: '#ff8154',
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

const gradientColors = ['#aa473f00', '#aa433e'];

const Intro = ({ onClose, onNext }) => {
    const insets = useSafeArea();

    const buttonWrapperStyle = {
        marginTop: -24,
        marginBottom: insets.bottom + 24,
        alignSelf: 'center',
    };

    const bottomGradient = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: insets.bottom + 250,
    };

    const gradientLocations = [
        0,
        1 - (insets.bottom + 48) / (insets.bottom + 250),
    ];

    return (
        <View
            style={[
                styles.container,
                localStyles.orange,
                { paddingTop: insets.top },
            ]}
        >
            <CloseButton onPress={onClose} />
            <Headline style={styles.headline}>
                Flare was created for that gut feeling
            </Headline>
            <View style={styles.line} />
            <Text style={styles.deviceActionText}>
                Flare gives you two low-key options to get out of an iffy
                situation the moment you’re feeling unsure. No need to hang
                around.
            </Text>
            <View style={styles.imageWrapper}>
                <Image
                    style={localStyles.image}
                    source={saraAndQuinn}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={gradientColors}
                    style={bottomGradient}
                    locations={gradientLocations}
                />
                <RoundedButton
                    useGradient={false}
                    height={48}
                    width={240}
                    onPress={onNext}
                    wrapperStyle={buttonWrapperStyle}
                    text="Show me how"
                />
            </View>
        </View>
    );
};

export default Intro;
