import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

// eslint-disable-next-line import/prefer-default-export
export function beacon(state = initialState.beacons, action = {}) {
    switch (action.type) {
    case types.BEACON_RECEIVED:
        return state.merge({
            latest: action.data.beacon,
        });

    default:
        return state;
    }
}
