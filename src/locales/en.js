const Strings = {
    auth: {
        loading: 'Loading af',
    },
    home: {
        title: 'Welcome',
        chooseLanguage: 'Choose language',
        cancelActiveFlare: 'CANCEL FLARE',
        contactsButtonLabelAdd: 'CHOOSE YOUR CREW',
        contactsButtonLabelEdit: 'Edit Your Crew',
        bluetoothDisabledWarning: {
            title: 'OMG Bluetooth is off!!',
            body: 'Please enable Bluetooth on this device so that Flare can work.',
        },
        lastBeacon: {
            present: 'Last beacon received',
            absent: 'No beacons received',
        },
    },
    crewEventTimeline: {
        title: 'You held down the button so we reached out to your crew.',
        headings: {
            notify: '💌 We told your crew.',
            cancel: '🚫 You canceled the Flare.',
            create: '📣 You started the Flare.',
            join: 'is available.',
            unknown: '🤮 Something got mixed up on our end.',
        },
    },
    leftDrawer: {
        signOut: 'Sign Out',
    },
    pin: {
        prompt: 'Enter your Flare PIN',
        failure: 'Invalid PIN',
        title: 'Cancel Flare',
    },
    signin: {
        usernamePrompt: 'Email or phone',
        passwordPrompt: 'Password',
        signInLabel: 'SIGN IN',
        invalid: 'Please enter a valid username and password.',
    },
    beacons: {
        lastReceived: 'Latest beacon',
        notYetReceived: 'No beacons detected',
    },
    deviceSelector: {
        enterDeviceCodePrompt: 'Enter the code printed on your jewelry',
        errorAddingDevice: 'Please enter a valid code',
    },
    jewelry: {
        cuffV1: {
            name: 'Cuff v1',
        },
        cuffV2: {
            name: 'Cuff v2',
        },
    },
    permissions: {
        coarseLocation: {
            title: 'Flare wants your general location',
            message:
                'Please give Flare permission to use your location. We only share your ' +
                'location with your selected contacts when you need backup.',
        },
        fineLocation: {
            title: 'Flare wants your precise location',
            message:
                'Please give Flare permission to use your location. We only share ' +
                'your location with your selected contacts when you need backup.',
        },
        contacts: {
            title: 'Flare wants to read your contacts',
            message:
                'Please give Flare permission to read your contacts. We display your ' +
                'contacts so that you can choose your crew.',
        },
    },
    contacts: {
        crewNamePlaceholder: 'My Crew',
        choosePrompt: 'Choose up to 5 contacts',
        chooseInstruction: 'Scroll through the list below and press on the names you want to include in this crew.',
        add: {
            title: 'Choose your Crew',
        },
    },
    notifications: {
        title: 'w/ ❤️ from Flare',
        events: {
            flare: {
                defaultMessage: 'Get that thing done',
            },
        },
    },
};

export default Strings;
