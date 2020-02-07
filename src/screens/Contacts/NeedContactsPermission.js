import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import { openSettings } from '../../bits/settingsUrl';

import heartHands from '../../assets/heart-hands.png';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    text: {
        fontFamily: 'Nocturno Display Std',
        color: Colors.black,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 24,
    },
    image: {
        width: 318,
        height: 236,
        marginBottom: 'auto',
    },
});

const NeedContactsPermission = () => (
    <View style={styles.container}>
        <Text style={styles.text}>
            In order to add contacts to your Crew, we need access to your
            contacts.
            {'\n\n'}
            We’ll never reach out to your contacts without your permission.
        </Text>
        <Image source={heartHands} style={styles.image} />
        <RoundedButton
            onPress={openSettings}
            text="Open Settings"
            width={240}
        />
    </View>
);

export default NeedContactsPermission;
