import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import Colors from '../../bits/Colors';
import CommonBottom from './CommonBottom';
import CommonMiddle from './CommonMiddle';
import CommonTop from './CommonTop';
import Strings from '../../locales/en';

export default function LongPressPage(args) {
    let title = null;
    let subtitle = null;
    let image = null;
    let imageSource = null;

    if (!args.bluetoothEnabled) {
        // bluetooth is disabled
        imageSource = require('../../assets/lotties/hmm.json');
        ({ title, subtitle } = Strings.onboarding.noBluetooth);
    } else if (args.receivedLongPress) {
        // success -- received a long press
        imageSource = require('../../assets/lotties/chat.json');
        ({ title, subtitle } = Strings.onboarding.longPress.success);
    } else {
        // no devices found yet
        imageSource = require('../../assets/lotties/ripple.json');
        ({ title, subtitle } = Strings.onboarding.longPress.waiting);
    }

    if (imageSource) {
        image = (
            <LottieView
                source={imageSource}
                autoPlay
                loop
                resizeMode="cover"
                style={{
                    width: 292,
                    height: 292,
                }}
            />
        );
    }

    return {
        backgroundColor: Colors.theme.purple,
        image: (
            <View>
                <CommonTop />
            </View>
        ),
        title: (
            <View>
                <CommonMiddle right body={subtitle} image={image} />
            </View>
        ),
        subtitle: <View />,
    };
}
