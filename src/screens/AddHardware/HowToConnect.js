import * as React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import styles from './styles';
import WhiteBar from '../Onboarding/WhiteBar';
import Headline from '../Onboarding/Headline';

const HowToConnect = ({ componentId }) => (
    <SafeAreaView style={styles.container}>
        <WhiteBar
            showLogo={false}
            goBack={() => {
                Navigation.dismissModal(componentId);
            }}
        />
        <ScrollView style={styles.scrollContainer}>
            <Headline style={styles.noBottomMargin}>
                How do I connect my Flare cuff?
            </Headline>
            <View style={[styles.line, styles.marginLine]} />
            <Text style={styles.subhead}>Bluetooth</Text>
            <Text style={styles.helpText}>
                By pushing the discreet button on your cuff, your phone and the
                cuff can establish a connection.
                {'\n\n'}
                It’s not working, what should I do?
                {'\n'}
                Where is the button?
                {'\n'}
                Will I have to do this again?
            </Text>
            <View style={[styles.line, styles.marginLine]} />
            <Text style={styles.subhead}>Manually</Text>
            <Text style={styles.helpText}>
                In order to ensure that we connect to the right cuff, you can
                always enter the serial number manually so that your phone and
                cuff can establish a connection.
                {'\n\n'}
                When should I use this?
                {'\n'}
                Why do I have to do this?
                {'\n'}
                Where is my serial number?
            </Text>
        </ScrollView>
    </SafeAreaView>
);

export default HowToConnect;
