import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        resizeMode: 'cover',
    },
});

const Aura = ({ source = 'aura-4' }) => {
    const sourceObj = React.useMemo(
        () => (typeof source === 'string' ? { uri: source } : source),
        [source]
    );
    return (
        <View style={StyleSheet.absoluteFill}>
            <Image source={sourceObj} style={styles.image} />
        </View>
    );
};

export default Aura;
