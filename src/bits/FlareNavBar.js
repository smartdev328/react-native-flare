import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.theme.blueDark,
        margin: 0,
        padding: 0,
        height: 44,
    },
    menuButton: {
        marginRight: 16,
    },
    logo: {
        width: 98,
        resizeMode: 'contain',
    },
});

function FlareNavBar(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => props.navigator.toggleDrawer({ side: 'left' })}
            >
                <Text>
                    <Icon name="menu" size={36} color={Colors.white} />,
                </Text>
            </TouchableOpacity>
            <Image
                source={require('../assets/flare_white.png')}
                style={styles.logo}
            />
        </View>
    );
}

export default FlareNavBar;
