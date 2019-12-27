import * as React from 'react';

import HelpSection from './HelpSection';
import HelpScreen from './HelpScreen';

import bluetoothIcon from '../../assets/permission-bluetooth.png';
import locationIcon from '../../assets/permission-location.png';
import contactsIcon from '../../assets/permission-contacts.png';
import notificationsIcon from '../../assets/permission-notifs.png';

const AboutPermissions = props => (
    <HelpScreen
        headline="Our smart jewelry requires some permissions:"
        {...props}
    >
        <HelpSection
            icon={bluetoothIcon}
            title="Bluetooth"
            body="Without bluetooth, your phone and bracelet can’t talk to each other."
        />
        <HelpSection
            icon={locationIcon}
            title="Location"
            body="We need your location so that we’ve always got your back, even when the app isn’t open."
        />
        <HelpSection
            icon={contactsIcon}
            title="Contacts"
            body="When you add friends to your crew, you can add them directly from your phone contacts."
        />
        <HelpSection
            icon={notificationsIcon}
            title="Notifications"
            body="In order to be discreet, you can opt for notifications to confirm that your jewelry has sent a text to your friends."
        />
    </HelpScreen>
);

export default AboutPermissions;
