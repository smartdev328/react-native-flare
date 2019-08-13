import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Spacing from '../../bits/Spacing';
import Type from '../../bits/Type';
import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingTop: Spacing.medium,
        marginBottom: Spacing.medium,
    },
    right: {
        alignItems: 'flex-start',
        marginLeft: Spacing.huge,
    },
    left: {
        alignItems: 'flex-end',
        marginRight: Spacing.huge,
    },
    center: {
        alignItems: 'center',
    },
    h1: {
        fontSize: Type.size.huge,
        color: Colors.white,
        marginBottom: Spacing.medium,
    },
    bodyText: {
        fontSize: Type.size.medium,
        color: Colors.white,
        marginBottom: Spacing.medium,
    },
    image: {
        width: '100%',
        height: 240,
        resizeMode: 'cover',
    },
    imageContain: {
        resizeMode: 'contain',
    },
});

export default function CommonMiddle(props) {
    return (
        <View
            style={[
                styles.container,
                props.left && styles.left,
                props.right && styles.right,
                props.center && styles.center,
            ]}
        >
            {props.title && <Text style={styles.h1}>{props.title}</Text>}
            {props.bodyText && <Text style={styles.bodyText}>{props.bodyText}</Text>}
            {props.imageSource && (
                <Image source={props.imageSource} style={[styles.image, props.imageContain && styles.imageContain]} />
            )}
            {props.image}
            {props.form}
        </View>
    );
}
