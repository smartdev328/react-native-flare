const Strings = {
    auth: {
        loading: 'Loading af',
    },
    beacons: {
        lastReceived: 'Latest beacon',
        notYetReceived: 'Waiting for beacons',
    },
    contacts: {
        add: {
            title: 'Choose your Crew',
        },
        chooseInstruction: {
            start: 'You have',
            end: 'of 5 possible people in your crew. Adjust your crew by pressing names shown below.',
        },
        choosePrompt:
            'Choose up to 5 contacts by touching their names. These are the people we will reach out to when you start a Flare.',
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
        sendTestFlare: 'Flare',
        sendTestCall: 'Call',
        sendTestCheckin: 'Checkin',
    },
    deviceSelector: {
        enterDeviceCodePrompt: 'Enter the code printed on your jewelry',
        errorAddingDevice: 'Please enter a valid code',
    },
    generic: {
        idPrefix: '#',
        signOut: 'Sign Out',
        confirm: 'Yeah',
        cancel: 'Cancel',
    },
    home: {
        bluetoothDisabledWarning: 'Turn bluetooth on in your phone settings',
        cancelActiveFlare: 'Cancel Flare',
        chooseLanguage: 'Choose language',
        contactsButtonLabelAdd: 'Choose Your Crew',
        contactsButtonLabelEdit: 'Edit Your Crew',
        lastBeacon: {
            absent: 'Waiting for beacons',
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
        remove: 'Remove from account',
        removeConfirm: {
            cancelLabel: 'No, keep it',
            confirmLabel: 'Yes, remove it',
            promptBegin: 'After you remove the jewelry with label ',
            promptEnd:
                ", pressing its button won't do anything. " +
                ' You will not get calls and your crew will not receive alerts.\n\n' +
                'Are you sure you want to remove it?',
        },
    },
    leftDrawer: {
        ambassador: 'Become an ambassador',
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
        title: 'Reminder',
        events: {
            flare: {
                defaultMessage: 'Get that thing done',
            },
        },
    },
    onboarding: {
        skipConfirmPrompt: "Are you sure you want to skip onboarding? The app basically won't work",
        welcome: {
            title: 'Welcome!',
            subtitle: "We're so excited that you're using Flare.",
            alwaysAllow: 'Always allow',
        },
        location: {
            subtitle: 'Flare needs permission to\naccess your location.',
        },
        noBluetooth: {
            title: 'Enable Bluetooth',
            subtitle: 'Please enable Bluetooth before using your jewelry.',
        },
        shortPress: {
            title: 'Short Press',
            subtitle:
                'Press the button on your jewelry\nbriefly a few times in a row. Your phone will ring. Take the call, then press Next.',
            singleDevice: {
                title: 'Short Press',
                subtitleStart: 'Great. Now hold the button down for 3 seconds and then let go.',
            },
        },
        longPress: {
            waiting: {
                title: 'Long Press',
                subtitle: 'Now hold the button down for longer, about 3 seconds, and let go.',
            },
            success: {
                title: 'Sweet!',
                subtitle:
                    "Normally we'd reach out to your\nfriends now. They'd know where you\nare and how to reach you.",
            },
        },
        longPressCancel: {
            initial: {
                subtitle: "Choose the pin code that you'll enter when canceling Flares in the future.",
                buttonLabel: 'Save Secret',
            },
            hasSetPin: {
                title: 'Nice.',
                subtitle: "You canceled your Flare, so your\nfriends know that you're safe.",
            },
            pinPlaceholder: 'Secret code',
            pinConfirmPlaceholder: 'Confirm secret code',
        },
        notifications: {
            subtitle: 'We need permission to send you\nnotifications when you hold the button\non your jewelry.',
            buttonLabel: 'Allow',
        },
        flareExample: {
            story: {
                flareName: 'Flare: ',
                first: 'This is what you see when you’ve held the button down to start a Flare.',
                second:
                    'We reach out to your selected contacts by text message. When they respond, we show their messages here.',
                third: 'Press the Cancel button below to end this Flare.',
            },
            buttonLabel: 'Cancel Flare',
        },
        contacts: {
            hasCrew: {
                buttonLabel: "Let's Go",
                subtitle: "You're ready to use Flare.",
                title: 'All set!',
            },
            hasPermission: {
                chooseCrewLabel: 'Choose Crew',
                subtitle: 'Press the button below to choose the contacts you want to reach with Flare.',
                title: 'Choose Your Crew',
            },
            initial: {
                buttonLabel: 'Give Access',
                subtitle:
                    "Please give us permission to access your contacts. You'll choose which contacts we reach " +
                    'out to when you hold the button.',
                title: 'Contacts',
            },
            overlay: {
                instructions: 'Click on the name of a contact to\nadd them to your crew.',
                title: 'Choose up to 5 contacts.',
                closeButtonLabel: 'Save Crew',
            },
        },
    },
    permissions: {
        coarseLocation: {
            message:
                'Please give Flare permission to use your location. We only share your ' +
                'location with your selected contacts when you need backup.',
            title: 'Flare wants your general location',
        },
        contacts: {
            message:
                'Please give Flare permission to read your contacts. We display your ' +
                'contacts so that you can choose your crew.',
            title: 'Flare wants to read your contacts',
        },
        fineLocation: {
            message:
                'Please give Flare permission to use your location. We only share ' +
                'your location with your selected contacts when you need backup.',
            title: 'Flare wants your precise location',
        },
    },
    pin: {
        failure: 'Invalid PIN',
        prompt: 'Enter your Flare PIN',
        title: 'Cancel Flare',
    },
    settings: {
        call: {
            details: 'Choose what you hear when you press the jewelry button and we call you.',
            title: 'Phone call script',
            saveButtonLabel: 'Use script',
            scripts: {
                roomMate: 'Roommate needs help',
                littleSisterKitchen: 'Younger sister in kitchen',
            },
        },
        config: {
            title: 'Support info',
        },
        sections: {
            account: {
                title: 'Account',
                links: {
                    privacy: 'Privacy',
                    notifications: 'Notifications',
                    call: 'Phone call script',
                },
            },
            diagnostics: {
                title: 'Diagnostics',
                links: {
                    config: 'Support info',
                },
            },
        },
        notifications: {
            customOption: 'Custom',
            customPromptPlaceholder: 'Your custom popup text',
            defaultMessage: 'Reminder: 8am appt tomorrow',
            defaultOption: 'Default',
            promptSelectionBody:
                "You'll see this notification when you press and hold the button on your jewelry. " +
                'When it pops up you know that we reached out to your crew.',
            promptSelectionTitle: 'Custom popup message',
            saveButtonLabel: 'Save popup',
            title: 'Notifications',
        },
        privacy: {
            title: 'Privacy',
            analytics: {
                prompt: 'Send analytics data to Flare',
                details:
                    'Cupcake ipsum dolor sit amet. Cookie powder caramels powder apple pie. Chocolate macaroon ' +
                    'sesame snaps tiramisu jujubes brownie tootsie roll. Tootsie roll wafer biscuit lollipop topping ' +
                    'danish jelly chupa chups candy.',
            },
        },
        title: 'Settings',
        titlePrefix: 'Settings: ',
    },
    register: {
        instructions:
            'Hey, congrats on getting your Flare! Fill this out to create your account. You need the code written on the sticker we put on your jewelry.',
        phonePrompt: 'Phone number – no dashes',
        emailPrompt: 'Email – you@domain.com',
        confirmPasswordPrompt: 'Confirm Password',
        serialNumber: 'Jewelry Serial Number – XXXYYYZZZ',
        needToBuy: 'I need to buy jewelry',
        submitLabel: 'Create New Account',
        errors: {
            allFieldsRequired: 'All fields are required.',
            invalidSerialNumber: 'Please enter a valid serial number.',
            serverError: 'Something went wrong. Please try again later.',
        },
    },
    register2: {
        instructions: 'Almost done! Please set your name and password so you can start using your jewelry.',
        firstNamePrompt: 'First name',
        lastNamePrompt: 'Last name',
        passwordPrompt: 'Password',
        submitLabel: "Let's do this!",
        errors: {
            invalidPassword: 'Passwords need to be 8 characters or more. Use letters, numbers, and punctuation.',
        },
    },
    signin: {
        forgotPassword: 'Forgot Password?',
        invalid: 'Please enter a valid username and password.',
        passwordPrompt: 'Password',
        register: 'Create New Account',
        signInLabel: 'Sign In',
        usernamePrompt: 'Email',
        warning: 'You need to sign in so Flare can work! 🔥',
    },
};

export default Strings;
