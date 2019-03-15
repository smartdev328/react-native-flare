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
        confirm: 'Yeah',
        cancel: 'Cancel',
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
        remove: 'Remove',
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
            title: 'Location',
            subtitle:
                'To let your jewelry work, Flare needs permission to access your location ' +
                "even when it's running in the background.",
        },
        noBluetooth: {
            title: 'Enable Bluetooth',
            subtitle: 'Please enable Bluetooth before using your jewelry.',
        },
        shortPress: {
            title: 'Short Press',
            subtitle: 'Press the button on your jewelry briefly a few times in a row.',
            multipleDevices: {
                title: 'Wait a sec',
                subtitle: "It's noisy in here. Wait a sec and try again, or maybe move to a different room.",
            },
            singleDevice: {
                title: 'Short Press',
                subtitleStart: 'OMG we heard something! Look at the label on your jewelry. Does it start with this?',
                buttonLabel: "That's Mine",
            },
            chosenDevice: {
                title: 'Confirm Jewelry',
                subtitle: 'Check the label on your jewelry. Enter the last 3 characters in the code.',
            },
            deviceClaimed: {
                title: 'All Yours',
                subtitle:
                    "Your new piece of jewelry is connected to your account. Next we'll show you another " +
                    'type of button press.',
            },
        },
        longPress: {
            waiting: {
                title: 'Long Press',
                subtitle: 'Now hold the button down for longer, about 3 seconds, and let go',
            },
            success: {
                title: 'Long Press 😎🎉✨',
                subtitle:
                    'After a long press, we reach out to a group of your contacts that you choose. ' +
                    'They receive a text message telling them where you are and how to reach you. ' +
                    'You can see their group messages in the app. Press Next to learn how to cancel ' +
                    "your flare and tell your crew that you're okay.",
            },
        },
        longPressCancel: {
            initial: {
                title: 'Cancel your Flare',
                subtitle:
                    "Cancel your Flare to tell your contacts that you're okay. " +
                    'Choose a secret pin code so only you can cancel your Flares:',
                buttonLabel: 'Save Secret',
            },
            hasSetPin: {
                title: 'Good to Go',
                subtitle:
                    "Great! Next you'll choose the people who we'll reach out to " +
                    'when you really need it.',
            },
            pinPlaceholder: 'Secret code',
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
                instructions: 'Choose up to 5 contacts by pressing on their names, then press the back button.',
                title: 'Last step: choose your crew!',
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
            }
        },
        title: 'Settings',
        titlePrefix: 'Settings: ',
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
