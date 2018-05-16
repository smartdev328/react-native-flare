import React from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../bits/Colors';
import Strings from '../locales/en';

export default class Home extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        header: null
    });

    render() {
        const { navigation } = this.props;
        const { navigate } = navigation;
        return (
            <View style={styles.container}>
                <LinearGradient 
                    colors={[Colors.theme.orange, Colors.theme.purple]}
                    style={styles.gradient}
                >
                    <Image
                        source={require('../assets/FLARE-white.png')}
                        style={styles.logo}
                    />
                </LinearGradient>
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
        height: '100%'
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
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
    }
});