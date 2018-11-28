import Immutable from 'seamless-immutable';
import Strings from '../locales/en';

// eslint-disable-next-line
export const initialState = Immutable({
    nav: {
        root: 'insecure', // 'insecure' / 'secure',
    },
    user: {
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
        token: null,
        settings: {
            promptType: Strings.settings.notifications.defaultOption,
            promptMessage: Strings.settings.notifications.defaultMessage,
        },
    },
    beacons: {
        latest: null,
        recent: [],
        problems: [],
    },
    hardware: {
        bluetooth: 'on',
    },
});
