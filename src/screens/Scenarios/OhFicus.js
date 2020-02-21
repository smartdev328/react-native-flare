import * as React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../bits/Colors';
import RoundedButton from '../../bits/RoundedButton';
import contactSupport from '../../bits/contactSupport';

import ficus from '../../assets/ficus.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.theme.cream,
        alignItems: 'center',
    },
    spacer: {
        flexGrow: 1,
    },
    headline: {
        color: Colors.black,
        fontSize: 30,
        fontFamily: 'Nocturno Display Std',
        textAlign: 'center',
    },
    line: {
        height: 1,
        width: 33,
        marginVertical: 12,
        backgroundColor: Colors.black,
    },
    text: {
        width: 300,
        color: Colors.black,
        fontSize: 20,
        fontFamily: 'Nocturno Display Std',
        textAlign: 'center',
    },
    ficus: {
        width: 167,
        height: 241,
        marginRight: 32,
        marginTop: 48,
    },
    spacedButton: {
        marginBottom: 12,
    },
});

const OhFicus = ({ retry }) => {
    const userDevices = useSelector(({ user: { devices } }) => devices);

    const support = React.useCallback(() => {
        contactSupport(userDevices);
    }, [userDevices]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.spacer} />
            <Text style={styles.headline}>Oh, Ficus!</Text>
            <View style={styles.line} />
            <Text style={styles.text}>
                Something went awry. Ready to try again?
            </Text>
            <Image style={styles.ficus} source={ficus} />
            <View style={styles.spacer} />
            <RoundedButton
                neumorphicDark
                wrapperStyle={styles.spacedButton}
                width={240}
                text="Retry"
                onPress={retry}
            />
            <RoundedButton
                wrapperStyle={styles.spacedButton}
                width={240}
                invisible
                text="Contact Help Center"
                onPress={support}
            />
        </SafeAreaView>
    );
};

export default OhFicus;
