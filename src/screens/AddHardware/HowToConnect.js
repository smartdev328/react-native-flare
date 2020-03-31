import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import HelpScreen from './HelpScreen';
import HelpSection from './HelpSection';
import Colors from '../../bits/Colors';

import bluetooth from '../../assets/permission-bluetooth.png';
import manual from '../../assets/text-checkmark.png';

const styles = StyleSheet.create({
    option: {
        fontSize: 16,
        color: Colors.theme.cream,
        marginBottom: 12,
    },
});

const HowToConnect = props => (
    <HelpScreen headline="How do I connect my Flare bracelet?" {...props}>
        <Text style={styles.option}>Option 1:</Text>
        <HelpSection icon={bluetooth} title="Bluetooth">
            By repeatedly pressing the discreet button on your bracelet, your
            phone and bracelet can establish a permanent connection.
        </HelpSection>
        <Text style={styles.option}>Option 2:</Text>
        <HelpSection icon={manual} title="Serial Number">
            You can manually enter the serial number on the underside of your
            bracelet; this also establishes a permanent connection and you can
            ensure that you are connecting to your bracelet.
        </HelpSection>
    </HelpScreen>
);

export default HowToConnect;
