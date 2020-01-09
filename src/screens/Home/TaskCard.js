import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 8,
        height: 200,
    },
    image: {
        width: 105,
        height: 81,
        right: 0,
        top: 0,
        position: 'absolute',
    },
    card: {
        height: 200,
        paddingHorizontal: 24,
        paddingTop: 67,
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        backgroundColor: Colors.black,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        color: Colors.theme.cream,
        fontFamily: 'Nocturno Display Std',
        fontSize: 20,
        marginBottom: 8,
        marginRight: 80,
    },
    body: {
        color: Colors.theme.cream,
        fontSize: 14,
    },
    disabled: {
        opacity: 0.4,
    },
});

const TaskCard = ({ image, title, body, onPress, width }) => (
    <TouchableOpacity style={[styles.container, { width }]} onPress={onPress}>
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
        </View>
        <Image source={image} style={styles.image} />
    </TouchableOpacity>
);

export default TaskCard;
