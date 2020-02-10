import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../bits/Colors';

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'stretch',
        padding: 24,
        backgroundColor: '#1e1d2a',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    text: {
        color: Colors.theme.cream,
        fontSize: 14,
    },
});

const ErrorMessage = () => (
    <View style={styles.wrapper}>
        <Text style={styles.text}>
            There was a problem saving your Crew. Please check your internet
            connection.
        </Text>
    </View>
);

export default ErrorMessage;
