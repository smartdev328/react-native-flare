import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import moment from 'moment';

import Colors from '../bits/Colors';
import Strings from '../locales/en';

import { API } from '../bits/API';


export default class Home extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    async checkAuth() {
        const pingResponse = await this.props.screenProps.flareAPI.ping();
        if (pingResponse.status === this.props.screenProps.flareAPI.requestStatus.failure) {
            this.props.navigation.navigate('SignIn');
        }
    }

    componentDidMount() {
        this.checkAuth();
    }

    render() {
        const { screenProps } = this.props;
        const hasTimestamp = screenProps && screenProps.lastBeacon && screenProps.lastBeacon.timestamp;
        const lastBeaconTimeHeading = hasTimestamp ? 
            Strings.beacons.lastReceived : Strings.beacons.notYetReceived;

        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/FLARE-white.png')}
                    style={styles.logo}
                />
                <Text>
                    {lastBeaconTimeHeading}
                </Text>
                {hasTimestamp &&
                    <Text>
                        {moment(screenProps.lastBeacon.timestamp).toLocaleString()}
                    </Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0        
    },
    separate: {
        marginTop: 50
    },
    choosePrompt: {
        marginBottom: 12
    },
    logo: {
        width: 200,
        margin: 25,
        marginBottom: 90,
        padding: 8,
        resizeMode: 'contain'
    }
});