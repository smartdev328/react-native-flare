const Strings = {
    auth: {
        loading: 'Loading af',
    },
    beacons: {
        lastReceived: 'Latest beacon',
        notYetReceived: 'No beacons detected',
    },
    contacts: {
        add: {
            title: 'Choose your Crew',
        },
        chooseInstruction: 'Click on the name of a contact to add them to your Crew',
        choosePrompt: 'Choose up to 5 contacts',
        crewNamePlaceholder: 'My Crew',
    },
    crewEventTimeline: {
        headings: {
            cancel: '🚫 You canceled the Flare.',
            create: '📣 You started the Flare.',
            join: 'is available.',
            notify: '💌 We reached out to',
            unknown: '🤮 Something got mixed up on our end',
        },
        title: 'You held down the button so we reached out to your crew.',
    },
    dev: {
        sendTestFlare: 'Send test flare',
    },
    deviceSelector: {
        enterDeviceCodePrompt: 'Enter the code printed on your jewelry',
        errorAddingDevice: 'Please enter a valid code',
    },
    generic: {
        idPrefix: '#',
        signOut: 'Sign Out',
    },
    home: {
        bluetoothDisabledWarning: {
            body: 'Please enable Bluetooth on this device so that Flare can work.',
            title: 'OMG Bluetooth is off!!',
        },
        cancelActiveFlare: 'Cancel Flare',
        chooseLanguage: 'Choose language',
        contactsButtonLabelAdd: 'Choose Your Crew',
        contactsButtonLabelEdit: 'Edit Your Crew',
        lastBeacon: {
            absent: 'No beacons received',
            present: 'Last beacon received',
        },
        title: 'Welcome',
    },
    jewelry: {
        addNew: 'Add New',
        addNewAuto: {
            prompt: 'Please press the button on your new jewelry 3 times in a row.',
        },
        addNewConfirm: {
            fccMessage: 'CONTAINS FCC ID: RYYEYSLSN',
            placeholderTwoFactor: 'Last 3 digits',
            prompt: 'Got it! Please look at the bottom of your jewelry and type the last 3 digits of the code you see.',
            sampleDigits: '???',
            secondFactorError: 'Wrong code? Please try again.',
        },
        addNewManual: {
            buttonLabel: 'Add Manually',
            cameraPermissionMessage: 'Please let us use your camera so we can scan your jewelry',
            cameraPermissionTitle: 'Permission to use camera',
            placeholderDeviceID: 'Jewelry code, eg XXX123',
            prompt:
                'Please point your camera at the QR code on the bottom of your jewelry. ' +
                'If you prefer, type the jewelry code into the field below.',
        },
        addNewTryAgain: 'Start over',
        addThisButtonLabel: 'Add this Jewelry',
        cuffV1: {
            name: 'Flare Prototype',
        },
        cuffV2: {
            name: 'Flare Cuff',
        },
        emptyList: "You don't have any jewelry. Press the Add New button to add some jewelry to your account",
        remove: 'Remove',
        removeConfirm: {
            cancelLabel: 'No, keep it',
            confirmLabel: 'Yes, remove it',
            promptBegin: 'After you remove the jewelry with label ',
            promptEnd: ", pressing its button won't do anything. " + ' You will not get calls and your crew will not receive alerts.\n\n' + 'Are you sure you want to remove it?',
        },
    },
    leftDrawer: {
        home: 'Home',
        jewelry: 'Jewelry',
        settings: 'Settings',
    },
    manufacturing: {
        title: 'Device Provisioning',
        /* Stages -- must match server enum */
        stages: {
            New: 'New',
            Added: 'Added',
            BurnIn: 'Burn In',
            Ready: 'Ready',
        },
        testBeacon: 'Test',
    },
    notifications: {
        bluetoothDisabled: 'Please turn on bluetooth so that Flare can work! 💔',
        events: {
            flare: {
                defaultMessage: 'Get that thing done',
            },
        },
    },
    permissions: {
        coarseLocation: {
            message: 'Please give Flare permission to use your location. We only share your ' + 'location with your selected contacts when you need backup.',
            title: 'Flare wants your general location',
        },
        contacts: {
            message: 'Please give Flare permission to read your contacts. We display your ' + 'contacts so that you can choose your crew.',
            title: 'Flare wants to read your contacts',
        },
        fineLocation: {
            message: 'Please give Flare permission to use your location. We only share ' + 'your location with your selected contacts when you need backup.',
            title: 'Flare wants your precise location',
        },
    },
    pin: {
        failure: 'Invalid PIN',
        prompt: 'Enter your Flare PIN',
        title: 'Cancel Flare',
    },
    settings: {
        config: {
            title: 'Configuration',
        },
        notifications: {
            customOption: 'Custom',
            customPromptPlaceholder: 'Your custom popup text',
            defaultMessage: 'Reminder: 8am appt tomorrow',
            defaultOption: 'Default',
            promptSelectionBody: "When you press and hold the button on your bracelet to send out a flare, we'll send you a push " + "notification. It's your secret message! That's how you'll know that your flare was sent out " + 'successfully. Customize the message below.',
            promptSelectionTitle: 'Custom popup message',
            saveButtonLabel: 'Save popup',
            title: 'Notifications',
        },
        title: 'Settings',
    },
    signin: {
        forgotPassword: 'Forgot Password',
        invalid: 'Please enter a valid username and password.',
        passwordPrompt: 'Password',
        signInLabel: 'Sign In',
        usernamePrompt: 'Email',
        warning: 'You need to sign in so Flare can work! 🔥',
    },
};

export default Strings;
