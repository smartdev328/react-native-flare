import * as types from '../actions/actionTypes';
import { initialState } from './initialState';
import { filterContacts } from '../helpers/contacts';

// eslint-disable-next-line import/prefer-default-export
export function user(state = initialState.user, action = {}) {
    switch (action.type) {

    /**
     * AUTHENTICATION
     */
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
            authState: 'succeeded',
        });

    /**
     * CONTACTS
     */
    case types.CONTACTS_REQUEST:
        return state.merge({
            contactsState: 'requested',
        });

    case types.CONTACTS_FAILURE:
        return state.merge({
            contactsState: 'failed',
        });

    case types.CONTACTS_SUCCESS:
        return state.merge({
            contactsState: 'succeeded',
            contacts: filterContacts(action.contacts),
        });


    /**
     * PERMISSIONS
     */
    case types.PERMISSIONS_REQUEST:
        return state.merge({
            permissions: null,
        });
    case types.PERMISSIONS_FAILURE:
        return state.merge({
            permissions: null,
        });
    case types.PERMISSIONS_SUCCESS:
        return state.merge({
            permissions: action.permissions,
        });

    default:
        return state;
    }
}
