import React from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { getPermission } from '../actions/userActions';
import { claimDevice } from '../actions/deviceActions';
import getBluetoothPage from './OnboardingBluetooth';
import Button from '../bits/Button';
import Colors from '../bits/Colors';
import Spacing from '../bits/Spacing';
import Strings from '../locales/en';
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
            chosenDeviceID: null,
            secondFactor: '',
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

    chooseThisDevice(deviceID) {
        this.setState({
            chosenDeviceID: deviceID,
        });
    }

    changeTwoFactorText(val) {
        this.setState({
            secondFactor: val,
        });
    }

    claimDevice() {
        this.dispatch(claimDevice(this.props.token, this.state.chosenDeviceID, this.state.secondFactor));
    }

    render() {
        const bluetoothPage = getBluetoothPage({
            bluetoothEnabled: this.props.bluetoothEnabled,
            claimingDevice: this.props.claimingDevice,
            chosenDeviceID: this.state.chosenDeviceID,
            secondFactor: this.state.secondFactor,
            multipleDevicesBroadcasting: this.state.multipleDevicesBroadcasting,
            highestPressCount: this.state.highestPressCount,
            changeTwoFactorText: e => this.changeTwoFactorText(e),
            claimDevice: () => this.claimDevice(),
            chooseThisDevice: id => this.chooseThisDevice(id),
        });


        return (
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={600}>
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
                        /* Bluetooth and short press */
                        bluetoothPage,
                        {
                            /* Long Press */
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.longPress.title,
                            subtitle: Strings.onboarding.longPress.subtitle,
                        },
                        {
                            /* Cancel Flare */
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.cancelFlare.title,
                            subtitle: Strings.onboarding.cancelFlare.subtitle,
                        },
                        {
                            /* Contacts */
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.contacts.title,
                            subtitle: Strings.onboarding.contacts.subtitle,
                        },
                    ]}
                />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.user.token,
        permissions: state.user.permissions,
        bluetoothEnabled: state.hardware.bluetooth === 'on',
        shortPressCounts: state.beacons.recentShortPressCounts,
        claimingDevice: state.user.claimingDevice,
        claimedDevice: state.user.claimedDevice,
    };
}

export default connect(mapStateToProps)(OnboardingMain);
