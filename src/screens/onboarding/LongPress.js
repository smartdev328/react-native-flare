import React from 'react';
import LottieView from 'lottie-react-native';

import Colors from '../../bits/Colors';
import Strings from '../../locales/en';

export default function getLongPressPage(args) {
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
            />);
    }

    return {
        backgroundColor: Colors.white,
        image,
        title,
        subtitle,
    };
}
