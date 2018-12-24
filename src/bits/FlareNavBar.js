import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    center: {
        display: 'flex',
        flex: 1,
        height: 45,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    logo: {
        height: 22,
        resizeMode: 'contain',
    },
});

function FlareNavBar() {
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Image
                    source={require('../assets/flare_dark.png')}
                    style={styles.logo}
                />
            </View>
        </View>
    );
}

export default FlareNavBar;
