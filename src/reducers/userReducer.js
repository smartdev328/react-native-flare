import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

// eslint-disable-next-line import/prefer-default-export
export function user(state = initialState.user, action = {}) {
    switch (action.type) {
    case types.AUTH_FAILURE:
        return state.merge({
            token: null,
            authState: 'failed',
        });    
    case types.AUTH_REQUEST:
        return state.merge({
            token: null,
            authState: 'requested',
        });
    case types.AUTH_SUCCESS:
        return state.merge({
            token: action.data.data.auth_token,
            profile: action.data.data.profile,
            crews: action.data.data.crews,
            devices: action.data.data.devices,
        });

    default:
        return state;
    }
}
