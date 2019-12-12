import * as React from 'react';
import { Image, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import Headline from '../Onboarding/Headline';
import styles from './styles';
import RoundedButton from '../../bits/RoundedButton';
import * as regActions from '../../actions/regActions';

import cuff from '../../assets/cuff-v2.png';

const GetStarted = ({ style, setPreferredPairingMethod, nextPage }) => {
    const preferBluetooth = () => {
        setPreferredPairingMethod('bluetooth');
        nextPage();
    };
    const preferManual = () => {
        setPreferredPairingMethod('manual');
        nextPage();
    };
    const howToConnect = () => {
        Navigation.showModal({
            component: {
                name: 'com.flarejewelry.onboarding.addhardware.howtoconnect',
            },
        });
    };

    return (
        <View style={[styles.centerContainer, ...style]}>
            <View style={styles.spacer} />
            <Headline style={styles.headline}>
                Let’s connect your Flare cuff
            </Headline>
            <View style={styles.line} />
            <View style={styles.spacer} />
            <Image source={cuff} style={styles.image} />
            <View style={styles.spacer} />
            <RoundedButton
                wrapperStyle={styles.spacedButton}
                onPress={preferBluetooth}
                text="Connect via Bluetooth"
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
            <RoundedButton
                text="Enter serial number"
                onPress={preferManual}
                outline
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
            <RoundedButton
                text="Tell me more"
                onPress={howToConnect}
                invisible
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
        </View>
    );
};

const mapDispatchToProps = {
    setPreferredPairingMethod: regActions.setPreferredPairingMethod,
};

export default connect(
    null,
    mapDispatchToProps
)(GetStarted);
