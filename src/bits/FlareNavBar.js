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
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        height: 44,
    },
    menuButton: {
        position: 'absolute',
        left: Spacing.small,
    },
    logo: {
        width: 98,
        resizeMode: 'contain',
        marginBottom: 3,
    },
});

class FlareNavBar extends React.PureComponent {
    render() {
        const dynamicContainerStyle = styles.container;
        let iconColor = null;
        let image = null;
        if (this.props.hasActiveFlare) {
            dynamicContainerStyle.backgroundColor = Colors.theme.purple;
            iconColor = Colors.white;
            image = require('../assets/flare_white.png');
        } else {
            iconColor = Colors.grey;
            image = require('../assets/flare_dark.png');
        }
        return (
            <View style={dynamicContainerStyle}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => this.props.navigator.toggleDrawer({ side: 'left' })}
                >
                    <Text>
                        <Icon name="menu" size={26} color={iconColor} />
                    </Text>
                </TouchableOpacity>
                <Image
                    source={image}
                    style={styles.logo}
                />
            </View>
        );
    }
}

export default FlareNavBar;
