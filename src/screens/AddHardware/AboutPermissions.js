import * as React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import styles from './styles';
import WhiteBar from '../Onboarding/WhiteBar';
import Headline from '../Onboarding/Headline';
import RoundedButton from '../../bits/RoundedButton';

const Section = ({ title, body }) => (
    <>
        <View style={[styles.line, styles.marginLine, styles.helpLine]} />
        <Text style={[styles.subhead, styles.whiteText]}>{title}</Text>
        <Text style={[styles.helpText, styles.whiteText]}>{body}</Text>
    </>
);

const AboutPermissions = ({ componentId }) => (
    <SafeAreaView style={styles.helpContainer}>
        <WhiteBar
            showLogo={false}
            goBack={() => {
                Navigation.dismissModal(componentId);
            }}
        />
        <ScrollView style={styles.scrollContainer}>
            <Headline>Our smart jewelry requires some permissions:</Headline>
            <Section
                title="Bluetooth"
                body="Without bluetooth, your phone and bracelet can’t talk to each other."
            />
            <Section
                title="Location"
                body="Allow flare to access your location “always” so that we’ve got your back, even when the app isn’t open."
            />
            <Section
                title="Contacts"
                body="Allow flare to access your contacts so that when you want us to, we can reach out to your friends with a push of a button."
            />
            <Section
                title="Notifications"
                body="In order to be discreet, you can send yourself a notification to confirm that your jewelry has sent a message to your friends."
            />
            <View style={{ height: 24 }} />
        </ScrollView>
        <View style={{ alignItems: 'center', marginVertical: 24 }}>
            <RoundedButton
                text="Visit Settings"
                useGradient={false}
                width={240}
                height={48}
                fontSize={14}
            />
        </View>
    </SafeAreaView>
);

export default AboutPermissions;
