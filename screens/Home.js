import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import BackgroundTimer from 'react-native-background-timer';
import RadialGradient from 'react-native-radial-gradient';
import moment from 'moment';

import Colors from '../bits/Colors';
import DeviceSelector from '../bits/DeviceSelector';
import FlavorStripe from '../bits/FlavorStripe';
import Strings from '../locales/en';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        backgroundColor: Colors.theme.purple,
    },
    containerWithActiveFlare: {
        backgroundColor: Colors.theme.orange,
    },
    backgroundGradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    choosePrompt: {
        marginBottom: 12
    },
    logo: {
        width: 98,
        resizeMode: 'contain'
    },
    footer: {
        padding: 16,
    },
    centered: {
        textAlign: 'center',
        color: Colors.white,
    },
    deviceSelector: {
        marginTop: 90,
    },
});

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: Colors.theme.purple,
            paddingLeft: 16,
        },        
        headerLeft : <Icon name="menu" size={30} color={Colors.white} />,
        headerTitle: <Image
            source={require('../assets/FLARE-white.png')}
            style={styles.logo}
        />,
    });

    async checkAuth() {
        this.props.screenProps.flareAPI.ping()
            .then(response => {
                console.log(response);
            })
            .catch((status, json) => {
            if (status === 401 || status === 403) {
                this.props.navigation.navigate('SignIn');
            }
        });
    }

    componentDidMount() {
        this.checkAuth();
        BackgroundTimer.runBackgroundTimer(() => { 
            this.checkAuth();
        }, 300000);
        this.props.screenProps.checkForActiveFlare();
    }

    componentWillUnmount() {
        BackgroundTimer.stopBackgroundTimer();
    }

    handleCancelClick() {
        this.props.navigation.navigate('PinCheck');
    }

    render() {
        const { screenProps } = this.props;
        const hasTimestamp = screenProps && screenProps.lastBeacon && screenProps.lastBeacon.timestamp;
        const lastBeaconTimeHeading = hasTimestamp ? 
            Strings.beacons.lastReceived : Strings.beacons.notYetReceived;

        const containerStyles = [styles.container];
        if (screenProps.hasActiveFlare) {
            containerStyles.push(styles.containerWithActiveFlare);
        }

        return (
            <View style={containerStyles}>
                <FlavorStripe />
                <RadialGradient 
                    style={styles.backgroundGradient}
                    colors={[Colors.theme.orangeDark, Colors.theme.purple]}
                    radius={300}
                />
                <View style={styles.deviceSelector}>
                    <DeviceSelector 
                        addDevice={(deviceID) => this.props.screenProps.flareAPI.addDevice(deviceID)}
                        devices={this.props.screenProps.devices}
                    />
                </View>
                {screenProps.hasActiveFlare &&
                    <Button 
                        title={Strings.home.cancelActiveFlare}
                        onPress={() => this.handleCancelClick()}
                    />
                }
                <View style={styles.footer}>
                    <Text style={styles.centered}>
                        {lastBeaconTimeHeading}
                    </Text>
                    {hasTimestamp &&
                        <Text style={styles.centered}>
                            {moment(screenProps.lastBeacon.timestamp).toLocaleString()}
                        </Text>
                    }
                </View>
            </View>
        );
    }
}
