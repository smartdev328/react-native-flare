import * as types from '../actions/actionTypes';
import { initialState } from './initialState';
import { filterContacts } from '../helpers/contacts';

function getContactsCrewLookup(crew) {
    const memberKeys = crew.members.map(member => member.key);
    const contactsCrewLookup = {};
    memberKeys.forEach((key) => {
        // @TODO: eventually the values in this object should be arrays of crew IDs.
        contactsCrewLookup[key] = crew.id;
    });
    return contactsCrewLookup;
}

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
    case types.AUTH_SUCCESS: {
        const firstCrew = action.crews && action.crews.length ? action.crews[0] : { id: 0, members: [] };
        return state.merge({
            token: action.data.data.auth_token,
            profile: action.data.data.profile,
            crews: action.data.data.crews,
            devices: action.data.data.devices,
            authState: 'succeeded',
            contactsCrewLookup: getContactsCrewLookup(firstCrew),
        });
    }

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
     * CREWS
     */
    case types.CREW_SET_REQUEST:
        return state.merge({
            crewUpdateState: 'requested',
        });

    case types.CREW_SET_FAILURE:
        return state.merge({
            crewUpdateState: 'failed',
        });

    case types.CREW_SET_SUCCESS: {
        return state.merge({
            crewUpdateState: 'succeeded',
            crews: [action.crew],
            contactsCrewLookup: getContactsCrewLookup(action.crew),
        });
    }

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

    /**
     * DEVICES
     */
    case types.DEVICE_CLAIM_REQUEST:
        return state.merge({
            claimingDevice: true,
            claimingDeviceFailure: null,
        });

    case types.DEVICE_CLAIM_SUCCESS:
        return state.merge({
            claimingDevice: false,
            claimingDeviceFailure: null,
            devices: action.devices,
        });

    case types.DEVICE_CLAIM_FAILURE:
        return state.merge({
            claimingDevice: false,
            claimingDeviceFailure: action.message,
        });

    default:
        return state;
    }
}
