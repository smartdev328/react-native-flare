import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        paddingTop: Spacing.medium,
        marginRight: Spacing.huge,
        marginBottom: Spacing.medium,
    },
    h1: {
        fontSize: Type.size.huge,
        color: Colors.white,
        marginBottom: Spacing.medium,
    },
    image: {
        width: '100%',
        height: 240,
        resizeMode: 'cover',
    },
});

export default function CommonMiddleRight(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>{props.title}</Text>
            <Image source={{ uri: props.imageSource }} style={styles.image} />
        </View>
    );
}
