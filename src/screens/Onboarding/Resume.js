import * as React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import Colors from '../../bits/Colors';

import happyAlien from '../../assets/happy-alien.png';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.theme.cream,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 32,
    },
    sadAlien: {
        width: 117,
        height: 117,
        marginBottom: 32,
    },
    text: {
        textAlign: 'center',
        width: 200,
        fontFamily: 'Nocturno Display Std',
        fontSize: 20,
        color: Colors.black,
        opacity: 0.5,
    },
});

const Resume = ({ onPress }) => (
    <SafeAreaView style={styles.wrapper}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={happyAlien} style={styles.sadAlien} />
            <Text style={styles.text}>
                Welcome back!
                {'\n\n'}
                Looks like you haven’t finished onboarding, so let’s resume.
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
);

export default Resume;
