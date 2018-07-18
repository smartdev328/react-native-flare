import React, { Component } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from './Colors';
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.theme.purple,
        margin: 0,
        padding: 0,
    },
    menuButton: {
        marginRight: 16,
    },
    logo: {
        width: 98,
        resizeMode: 'contain',
    },
});

export default class FlareNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuButton}>
                    <Text>
                        <Icon name="menu" size={30} color={Colors.white} />,
                    </Text>
                </TouchableOpacity>
                <Image
                    source={require('../assets/FLARE-white.png')}
                    style={styles.logo}
                />
            </View>
        );
    }
}
