import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

// eslint-disable-next-line import/prefer-default-export
export function manufacturing(state = initialState.manufacturing, action = {}) {
    switch (action.type) {
    case types.MANUFACTURING_GET_DEVICES_FAILURE:
        return state.merge({
            loading: false,
        });

    case types.MANUFACTURING_GET_DEVICES_REQUEST:
        return state.merge({
            loading: true,
        });

    case types.MANUFACTURING_GET_DEVICES_SUCCESS:
        return state.replace({
            deviceCounts: action.deviceCounts,
            loading: false,
        });

    default:
        return state;
    }
}
