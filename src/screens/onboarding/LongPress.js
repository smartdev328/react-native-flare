import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import Button from '../../bits/Button';
import Colors from '../../bits/Colors';
import CommonBottom from './CommonBottom';
import CommonMiddle from './CommonMiddle';
import CommonTop from './CommonTop';
import FlareAlert from '../../bits/FlareAlert';
import Strings from '../../locales/en';

export default function getLongPressPage(props) {
    let title = null;
    let subtitle = null;
    let image = null;
    let imageSource = null;

    if (props.receivedLongPress) {
        // success -- received a long press
        imageSource = require('../../assets/lotties/chat.json');
        ({ title, subtitle } = Strings.onboarding.longPress.success);
    } else if (props.bluetoothEnabled && props.locationEnabled) {
        imageSource = require('../../assets/lotties/ripple.json');
        ({ title, subtitle } = Strings.onboarding.longPress.waiting);
    } else if (!props.locationEnabled && props.locationPrompted) {
        imageSource = require('../../assets/lotties/ripple.json');
        ({ subtitle } = Strings.onboarding.longPress.disabled);
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
                {!props.bluetoothEnabled && (
                    <FlareAlert message={Strings.home.bluetoothDisabledWarning} variant="warning" large centered />
                )}
                {!props.locationEnabled && props.locationPrompted && (
                    <View>
                        <FlareAlert message={Strings.home.locationDisabledWarning} variant="warning" large centered />
                        <CommonMiddle center image={image} />
                    </View>
                )}
                {props.bluetoothEnabled && props.locationEnabled && (
                    <View>
                        <CommonMiddle right title={title} image={image} />
                    </View>
                )}
            </View>
        ),
        subtitle: (
            <View>
                {props.bluetoothEnabled && props.locationEnabled && <CommonBottom right bodyText={subtitle} />}
                {!props.locationEnabled && props.locationPrompted && <CommonBottom center bodyText={subtitle} />}
                <View>
                    <Button
                        secondary
                        title={
                            props.receivedLongPress
                                ? Strings.onboarding.longPress.proceedButtonLabel
                                : Strings.onboarding.longPress.proceedAnywayButtonLabel
                        }
                        onPress={() => props.onPressNext()}
                    />
                </View>
            </View>
        ),
    };
}
