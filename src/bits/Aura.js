import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: Colors.theme.purple,
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
});

function Aura(props) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: props.source }} style={styles.image} />
        </View>
    );
}

Aura.defaultProps = {
    source: 'aura-4',
};

export default Aura;
