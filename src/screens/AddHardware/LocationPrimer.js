import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import styles from './styles';
import Headline from '../Onboarding/Headline';

import locationStars from '../../assets/location-stars.png';
import RoundedButton from '../../bits/RoundedButton';

const LocationPrimer = ({ style, nextPage }) => {
    const tellMeMore = () => {
        Navigation.showModal({
            component: {
                name:
                    'com.flarejewelry.onboarding.addhardware.aboutpermissions',
            },
        });
    };

    return (
        <View style={[styles.centerContainer, ...style]}>
            <View style={styles.spacer} />
            <Headline style={styles.headline}>Enable Location</Headline>
            <View style={styles.line} />
            <View style={styles.spacer} />
            <Text style={[styles.subhead, { textAlign: 'center' }]}>
                You’ll need to enable your location in order to use Flare and
                connect with your jewelry
            </Text>
            <View style={styles.spacer} />
            <Image style={{ width: 172, height: 230 }} source={locationStars} />
            <View style={styles.spacer} />
            <RoundedButton
                text="Allow Location"
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
            <RoundedButton
                text="Tell me more"
                onPress={tellMeMore}
                invisible
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
        </View>
    );
};

export default LocationPrimer;
