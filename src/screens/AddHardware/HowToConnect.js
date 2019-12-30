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
    <HelpScreen headline="How do I connect my Flare cuff?" {...props}>
        <Text style={styles.option}>Option 1:</Text>
        <HelpSection
            icon={bluetooth}
            title="Bluetooth"
            body="By repeatedly pressing the discreet button on your cuff, your phone and cuff can establish a permanent connection."
        />
        <Text style={styles.option}>Option 2:</Text>
        <HelpSection
            icon={manual}
            title="Serial Number"
            body="You can manually enter the serial number on the underside of your cuff; this also establishes a permanent connection and you can ensure that you are connecting to your cuff."
        />
    </HelpScreen>
);

export default HowToConnect;
