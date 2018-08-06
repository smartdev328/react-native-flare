import Immutable from 'seamless-immutable';

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
    },
    beacons: {
        latest: null,
        recent: [],
    },
});
