import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { getPermission } from '../actions/userActions';
import Colors from '../bits/Colors';
import Strings from '../locales/en';
import Button from '../bits/Button';
import Spacing from '../bits/Spacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subtitleArea: {
        paddingHorizontal: 10,
    },
    subtitleText: {
        marginBottom: Spacing.large,
    },
});

class OnboardingMain extends React.Component {
    goToPushedView = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.flarejewelry.onboarding.main',
            },
        });
    }

    requestLocationPermission() {
        this.props.dispatch(getPermission('location', { type: 'always' }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Onboarding
                    givePage
                    showSkip
                    showBack
                    onSkip={d => console.log(`TODO: Implement skip! ${JSON.stringify(d)}`)}
                    pages={[
                        {
                            /* Welcome */
                            backgroundColor: Colors.white,
                            image: <LottieView
                                source={require('../assets/lotties/heart.json')}
                                autoPlay
                                speed={0.7}
                                loop={false}
                                resizeMode="cover"
                                style={{
                                    width: 292,
                                    height: 292,
                                }}
                            />,
                            title: Strings.onboarding.welcome.title,
                            subtitle: Strings.onboarding.welcome.subtitle,
                        },
                        {
                            /* Location */
                            backgroundColor: Colors.white,
                            image: <LottieView
                                source={require('../assets/lotties/location.json')}
                                autoPlay
                                loop
                                resizeMode="cover"
                                style={{
                                    width: 292,
                                    height: 292,
                                }}
                            />,
                            title: Strings.onboarding.location.title,
                            subtitle: (
                                <View style={styles.subtitleArea}>
                                    <Text style={styles.subtitleText}>
                                        {Strings.onboarding.location.subtitle}
                                    </Text>
                                    {this.props.permissions.location &&
                                        <LottieView
                                            source={require('../assets/lotties/checkmark.json')}
                                            autoPlay
                                            loop={false}
                                            resizeMode="center"
                                            style={{
                                                alignSelf: 'center',
                                                height: 96,
                                            }}
                                        />
                                    }
                                    {!this.props.permissions.location &&
                                        <Button
                                            title={Strings.onboarding.welcome.alwaysAllow}
                                            primary
                                            rounded
                                            onPress={() => this.requestLocationPermission()}
                                        />
                                    }
                                </View>
                            ),
                        },
                        {
                            /* Bluetooth and short press */
                            backgroundColor: Colors.white,
                            image: this.props.bluetoothEnabled ?
                                <LottieView
                                    source={require('../assets/lotties/dino-dance.json')}
                                    autoPlay
                                    loop
                                    resizeMode="cover"
                                    style={{
                                        width: 292,
                                        height: 292,
                                    }}
                                /> :
                                <LottieView
                                    source={require('../assets/lotties/ripple.json')}
                                    autoPlay
                                    loop
                                    resizeMode="cover"
                                    style={{
                                        width: 292,
                                        height: 292,
                                    }}
                                />,
                            title:
                                this.props.bluetoothEnabled ?
                                    Strings.onboarding.shortPress.title :
                                    Strings.onboarding.shortPress.titleNoBluetooth,
                            subtitle:
                                this.props.bluetoothEnabled ?
                                    Strings.onboarding.shortPress.subtitle :
                                    Strings.onboarding.shortPress.subtitleNoBluetooth,
                        },
                        {
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.longPress.title,
                            subtitle: Strings.onboarding.longPress.subtitle,
                            showDone: false,
                        },
                        {
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.cancelFlare.title,
                            subtitle: Strings.onboarding.cancelFlare.subtitle,
                            showDone: false,
                        },
                        {
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.contacts.title,
                            subtitle: Strings.onboarding.contacts.subtitle,
                            showDone: false,
                        },
                    ]}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        permissions: state.user.permissions,
        bluetoothEnabled: state.hardware.bluetooth === 'on',
    };
}

export default connect(mapStateToProps)(OnboardingMain);
