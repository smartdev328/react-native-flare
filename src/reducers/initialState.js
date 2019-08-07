import Immutable from 'seamless-immutable';
import Strings from '../locales/en';
import CallScripts from '../constants/CallScripts';

// eslint-disable-next-line
export const initialState = Immutable({
    nav: {
        root: 'insecure', // 'insecure' / 'secure',
    },
    user: {
        callSript: CallScripts.Default,
        contacts: [],
        contactsCrewLookup: {},
        crewEvents: [],
        crews: [],
        devices: [],
        hasActiveFlare: false,
        permissions: {
            bluetooth: false,
            contacts: false,
            location: false,
            notification: false,
        },
        profile: {},
        authToken: null,
        radioToken: null,
        settings: {
            promptType: Strings.settings.notifications.defaultOption,
            promptMessage: Strings.settings.notifications.defaultMessage,
            analyticsEnabled: true,
        },
    },
    beacons: {
        latest: null,
        recent: [],
        recentShortPressCounts: [],
        problems: [],
        deviceCounts: {
            // must match keys of Strings.manufacting.stages
            new: 0,
            added: 0,
            burnIn: 0,
            ready: 0,
        },
    },
    hardware: {
        bluetooth: 'on',
        bleListening: false,
        bleListeningChange: 'succeeded',
        bleListeningChangeDir: 'down',
    },
    manufacturing: {},
});
