import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Spacing from './Spacing';

const styles = StyleSheet.create({
    container: {
        padding: Spacing.small,
    },
});

function IconButton(props) {
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <Icon style={styles.itemIcon} {...props} />
        </TouchableOpacity>
    );
}

export default IconButton;
