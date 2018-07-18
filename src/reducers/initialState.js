import Immutable from 'seamless-immutable';

export const initialState = Immutable({
    root: undefined, // 'insecure' / 'secure',
    user: {
        token: null,
        profile: {},
        crews: [],
        devices: [],
    },
    beacons: {
        latest: null,
        recent: [],
    },
});
