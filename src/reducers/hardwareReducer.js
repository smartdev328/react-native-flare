import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

// eslint-disable-next-line import/prefer-default-export
export function hardware(state = initialState.hardware, action = {}) {
    switch (action.type) {
    case types.BLUETOOTH_STATE_CHANGED:
        return state.merge({
            bluetooth: action.bluetooth,
        });

    default:
        return state;
    }
}
