import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import { openSettings } from '../../bits/settingsUrl';

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
        <RoundedButton
            onPress={openSettings}
            text="Open Settings"
            width={240}
        />
    </View>
);

export default NeedContactsPermission;
