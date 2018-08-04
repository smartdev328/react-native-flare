import Immutable from 'seamless-immutable';

// eslint-disable-next-line
export const initialState = Immutable({
    nav: {
        root: 'insecure', // 'insecure' / 'secure',
    },
    user: {
        token: null,
        profile: {},
        crews: [],
        devices: [],
        contacts: [],
        contactsCrewLookup: {},
        permissions: {
            bluetooth: false,
            contacts: false,
            location: false,
            notification: false,
        },
    },
    beacons: {
        latest: null,
        recent: [],
    },
});
