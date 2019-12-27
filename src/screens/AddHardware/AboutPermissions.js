import * as React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import styles from './styles';
import WhiteBar from '../Onboarding/WhiteBar';
import Headline from '../Onboarding/Headline';
import Aura from '../../bits/Aura';

import aura1521 from '../../assets/aura-1521.jpg';
import bluetoothIcon from '../../assets/permission-bluetooth.png';
import locationIcon from '../../assets/permission-location.png';
import contactsIcon from '../../assets/permission-contacts.png';
import notificationsIcon from '../../assets/permission-notifs.png';

const sectionStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 12,
        alignSelf: 'center',
    },
    textWrapper: {
        flexDirection: 'column',
        flex: 1,
    },
});

const Section = ({ icon, title, body }) => (
    <View style={sectionStyles.container}>
        <Image source={icon} style={sectionStyles.icon} resizeMode="center" />
        <View style={sectionStyles.textWrapper}>
            <Text style={[styles.subhead, styles.whiteText]}>{title}</Text>
            <Text style={[styles.helpText, styles.whiteText]}>{body}</Text>
        </View>
    </View>
);

const AboutPermissions = ({ componentId }) => (
    <SafeAreaView style={styles.helpContainer}>
        <StatusBar barStyle="light-content" />
        <Aura source={aura1521} />
        <WhiteBar
            showLogo={false}
            goBack={() => {
                Navigation.dismissModal(componentId);
            }}
        />
        <ScrollView
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
            indicatorStyle="white"
        >
            <Headline>Our smart jewelry requires some permissions:</Headline>
            <Section
                icon={bluetoothIcon}
                title="Bluetooth"
                body="Without bluetooth, your phone and bracelet can’t talk to each other."
            />
            <Section
                icon={locationIcon}
                title="Location"
                body="We need your location so that we’ve always got your back, even when the app isn’t open."
            />
            <Section
                icon={contactsIcon}
                title="Contacts"
                body="When you add friends to your crew, you can add them directly from your phone contacts."
            />
            <Section
                icon={notificationsIcon}
                title="Notifications"
                body="In order to be discreet, you can opt for notifications to confirm that your jewelry has sent a text to your friends."
            />
            <View style={{ height: 24 }} />
        </ScrollView>
    </SafeAreaView>
);

export default AboutPermissions;
