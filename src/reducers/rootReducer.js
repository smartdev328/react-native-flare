import Immutable from 'seamless-immutable';
import * as types from '../actions/actionTypes';

const initialState = Immutable({
    root: undefined, // 'login' / 'after-login',
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

// eslint-disable-next-line import/prefer-default-export
export function root(state = initialState, action = {}) {
    switch (action.type) {
    case types.ROOT_CHANGED:
        return state.merge({
            root: action.root,
        });

    default:
        return state;
    }
}
