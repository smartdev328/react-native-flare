import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Colors from '../bits/Colors';
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
        justifyContent: 'center',
        padding: 0,        
    },
    separate: {
        marginTop: 50,
    },
    choosePrompt: {
        marginBottom: 12,
    },
    logo: {
        width: 200,
        margin: 25,
        marginBottom: 90,
        padding: 8,
        resizeMode: 'contain',
    },
});

export default class AuthLoading extends React.Component {
    constructor(props) {
        super(props);
        this.checkUserToken();
    }

    async checkUserToken() {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
            this.props.screenProps.flareAPI.authenticated = true;
            this.props.navigation.navigate('App');
        } else {
            this.props.screenProps.flareAPI.authenticated = false;
            this.props.navigation.navigate('Auth');
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/FLARE-white.png')}
                    style={styles.logo}
                />
                <Text>
                    {Strings.auth.loading}
                </Text>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

