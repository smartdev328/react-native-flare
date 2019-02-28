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

import Colors from '../bits/Colors';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    render() {
        return (
            <View style={styles.container}>
                <Onboarding
                    givePage
                    showSkip
                    showBack
                    onSkip={d => console.log(`skiiiiiip ${JSON.stringify(d)}`)}
                    pages={[
                        {
                            backgroundColor: Colors.white,
                            image: <LottieView
                                source={require('../assets/lotties/heart.json')}
                                autoPlay
                                duration={2000}
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
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.location.title,
                            subtitle: Strings.onboarding.location.subtitle,
                            showDone: false,
                        },
                        {
                            backgroundColor: Colors.white,
                            image: <Image source={require('../assets/home-diamond.png')} />,
                            title: Strings.onboarding.shortPress.title,
                            subtitle: Strings.onboarding.shortPress.subtitle,
                            showDone: false,
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
    };
}

export default connect(mapStateToProps)(OnboardingMain);
