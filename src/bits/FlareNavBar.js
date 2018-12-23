import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        width: 98,
        height: 40,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});

function FlareNavBar() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/flare_dark.png')}
                style={styles.logo}
            />
        </View>
    );
}

export default FlareNavBar;
