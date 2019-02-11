const Strings = {
    auth: {
        loading: 'Loading af',
    },
    dev: {
        sendTestFlare: 'Send test flare',
    },
    home: {
        title: 'Welcome',
        chooseLanguage: 'Choose language',
        cancelActiveFlare: 'Cancel Flare',
        contactsButtonLabelAdd: 'Choose Your Crew',
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
            notify: '💌 We reached out to',
            cancel: '🚫 You canceled the Flare.',
            create: '📣 You started the Flare.',
            join: 'is available.',
            unknown: '🤮 Something got mixed up on our end',
        },
    },
    leftDrawer: {
        home: 'Home',
        jewelry: 'Jewelry',
        settings: 'Settings',
        signOut: 'Sign Out',
    },
    pin: {
        prompt: 'Enter your Flare PIN',
        failure: 'Invalid PIN',
        title: 'Cancel Flare',
    },
    signin: {
        forgotPassword: 'Forgot Password',
        usernamePrompt: 'Email',
        passwordPrompt: 'Password',
        signInLabel: 'Sign In',
        invalid: 'Please enter a valid username and password.',
        warning: 'You need to sign in so Flare can work! 🔥',
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
            prompt:
                'Please point your camera at the QR code on the bottom of your jewelry. ' +
                'If you prefer, type the jewelry code into the field below.',
            placeholderDeviceID: 'Jewelry code, eg XXX123',
            cameraPermissionTitle: 'Permission to use camera',
            cameraPermissionMessage: 'Please let us use your camera so we can scan your jewelry',
        },
        addNewTryAgain: 'Start over',
        addThisButtonLabel: 'Add this Jewelry',
        emptyList: "You don't have any jewelry. Press the Add New button to add some jewelry to your account",
        remove: 'Remove',
        removeConfirm: {
            promptBegin: 'After you remove the jewelry with label ',
            promptEnd:
                ", pressing its button won't do anything. " +
                ' You will not get calls and your crew will not receive alerts.\n\n' +
                'Are you sure you want to remove it?',
            confirmLabel: 'Yes, remove it',
            cancelLabel: 'No, keep it',
        },
        cuffV1: {
            name: 'Flare Prototype',
        },
        cuffV2: {
            name: 'Flare Cuff',
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
        chooseInstruction: 'Click on the name of a contact to add them to your Crew',
        add: {
            title: 'Choose your Crew',
        },
    },
    notifications: {
        bluetoothDisabled: 'Please turn on bluetooth so that Flare can work! 💔',
        events: {
            flare: {
                defaultMessage: 'Get that thing done',
            },
        },
    },
    settings: {
        config: {
            title: 'Configuration',
        },
        notifications: {
            title: 'Notifications',
            promptSelectionTitle: 'Custom popup message',
            promptSelectionBody:
                "When you press and hold the button on your bracelet to send out a flare, we'll send you a push " +
                "notification. It's your secret message! That's how you'll know that your flare was sent out " +
                'successfully. Customize the message below.',
            customOption: 'Custom',
            customPromptPlaceholder: 'Your custom popup text',
            defaultMessage: 'Reminder: 8am appt tomorrow',
            defaultOption: 'Default',
            saveButtonLabel: 'Save popup',
        },
        title: 'Settings',
    },
};

export default Strings;
