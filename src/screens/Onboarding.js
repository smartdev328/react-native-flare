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
import FlareDeviceID from '../bits/FlareDeviceID';
import Strings from '../locales/en';
import Button from '../bits/Button';
import Spacing from '../bits/Spacing';
import Type from '../bits/Type';

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
    foundJewelryIntro: {
        textAlign: 'center',
    },
    foundJewelryID: {
        margin: Spacing.large,
        fontSize: Type.size.medium,
        textAlign: 'center',
    },
});

class OnboardingMain extends React.Component {
    static getDerivedStateFromProps(props, state) {
        const { shortPressCounts } = props;
        const { highestPressCount, multipleDevicesBroadcasting } = state;
        const newHighestPressCount = (shortPressCounts && shortPressCounts.length > 0 && shortPressCounts[0]) || {};

        const newMultipleBroadcasting = shortPressCounts && shortPressCounts.length > 1;
        const multipleBroadcastChanged = multipleDevicesBroadcasting !== newMultipleBroadcasting;
        const highestPressCountChanged =
            newHighestPressCount.deviceID !== highestPressCount.deviceID ||
            newHighestPressCount.count !== highestPressCount.count;

        if (multipleBroadcastChanged || highestPressCountChanged) {
            return {
                highestPressCount: newHighestPressCount,
                multipleDevicesBroadcasting,
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            highestPressCount: {},
            multipleDevicesBroadcasting: false,
        };
    }

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
        // Dynamically configure bluetooth page
        let bluetoothTitle = null;
        let bluetoothSubtitle = null;
        let bluetoothImageSource = null;

        if (!this.props.bluetoothEnabled) {
            // bluetooth is disabled
            bluetoothImageSource = require('../assets/lotties/hmm.json');
            bluetoothTitle = Strings.onboarding.shortPress.noBluetooth.title;
            bluetoothSubtitle = Strings.onboarding.shortPress.noBluetooth.subtitle;
        } else if (this.state.multipleDevicesBroadcasting) {
            // too many devices transmitting to know for sure which one belongs to user
            bluetoothImageSource = require('../assets/lotties/hmm.json');
            bluetoothTitle = Strings.onboarding.shortPress.multipleDevices.title;
            bluetoothSubtitle = Strings.onboarding.shortPress.multipleDevices.subtitle;
        } else if (this.state.highestPressCount.deviceID) {
            // one good device transmitting
            bluetoothImageSource = require('../assets/lotties/dino-dance.json');
            bluetoothTitle = Strings.onboarding.shortPress.singleDevice.title;
            bluetoothSubtitle = (
                <View>
                    <Text style={styles.foundJewelryIntro}>
                        {Strings.onboarding.shortPress.singleDevice.subtitleStart}
                    </Text>
                    <Text style={styles.foundJewelryID}>
                        {FlareDeviceID.getJewelryLabelFromDeviceID(this.state.highestPressCount.deviceID)}
                    </Text>
                </View>
            );
        } else {
            // no devices found yet
            bluetoothImageSource = require('../assets/lotties/ripple.json');
            bluetoothTitle = Strings.onboarding.shortPress.title;
            bluetoothSubtitle = Strings.onboarding.shortPress.subtitle;
        }

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
                            image: (
                                <LottieView
                                    source={bluetoothImageSource}
                                    autoPlay
                                    loop
                                    resizeMode="cover"
                                    style={{
                                        width: 292,
                                        height: 292,
                                    }}
                                />),
                            title: bluetoothTitle,
                            subtitle: bluetoothSubtitle,
                        },
                        {
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.longPress.title,
                            subtitle: Strings.onboarding.longPress.subtitle,
                        },
                        {
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.cancelFlare.title,
                            subtitle: Strings.onboarding.cancelFlare.subtitle,
                        },
                        {
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.contacts.title,
                            subtitle: Strings.onboarding.contacts.subtitle,
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
        shortPressCounts: state.beacons.recentShortPressCounts,
    };
}

export default connect(mapStateToProps)(OnboardingMain);
