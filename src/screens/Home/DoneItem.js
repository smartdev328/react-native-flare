import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import checkbox from '../../assets/task-card-checkbox.png';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 56,
        marginTop: 12,
        alignSelf: 'stretch',
        flexDirection: 'row',
        backgroundColor: '#382F5FA3',
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    text: {
        color: '#FFFFFF99',
        fontSize: 14,
        textDecorationLine: 'line-through',
    },
});

const DoneItem = ({ title, onPress }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={checkbox} style={styles.image} />
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

export default React.memo(DoneItem);
