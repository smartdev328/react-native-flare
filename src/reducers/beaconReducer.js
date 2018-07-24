import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

// eslint-disable-next-line import/prefer-default-export
export function nav(state = initialState.beacons, action = {}) {
    switch (action.type) {
    case types.BEACON_RECEIVED:
        return state.merge({
            latest: action.beacon,
        });

    default:
        return state;
    }
}
