import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import Colors from '../../bits/Colors';
import cardBg from '../../assets/soft-land-card.jpg';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 8,
    },
    image: {
        width: 105,
        height: 81,
        left: 36,
        top: 0,
        position: 'absolute',
    },
    card: {
        marginTop: 22,
        height: 200,
        paddingTop: 76,
        paddingHorizontal: 24,
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'flex-start',
    },
    cardBg: {
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
        top: 22,
        bottom: 0,
        left: 8,
        right: 8,
        height: 200,
        opacity: 0.3,
    },
    title: {
        color: Colors.theme.cream,
        fontFamily: 'Nocturno Display Std',
        fontSize: 20,
        marginBottom: 8,
    },
    body: {
        color: Colors.theme.cream,
        fontSize: 14,
    },
    disabled: {
        opacity: 0.4,
    },
});

const TaskCard = ({ image, title, body, onPress, width, done }) => (
    <TouchableOpacity onPress={onPress} disabled={done}>
        <View style={[styles.container, { width }]}>
            <Image
                style={[styles.cardBg, { width: width - 16 }]}
                source={cardBg}
                resizeMode="cover"
            />
            <View style={[styles.card, done ? styles.disabled : undefined]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{body}</Text>
            </View>
            {!done && <Image source={image} style={styles.image} />}
        </View>
    </TouchableOpacity>
);

export default TaskCard;
