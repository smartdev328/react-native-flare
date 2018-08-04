import { Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import Permissions from 'react-native-permissions';

import * as types from './actionTypes';
import { API_URL } from '../constants/';
import ProtectedAPICall from '../bits/ProtectedAPICall';

export function checkPermissions() {
    return async function doCheck(dispatch) {
        const permissions = {
            contacts: null,
            location: {
                type: 'always',
            },
        };

        if (Platform.OS === 'ios') {
            permissions.bluetooth = null;
            permissions.notification = {
                type: [
                    'alert',
                    'badge',
                ],
            };
        }

        Permissions
            .checkMultiple(Object.keys(permissions))
            .then((checkResponse) => {
                const permissionsToRequest = Object.keys(checkResponse).filter(p => checkResponse[p] !== 'authorized');
                permissionsToRequest.forEach((permission) => {
                    const options = permissions[permission];
                    console.debug(`Requesting permission ${permission} with options ${options}`);
                    Permissions.request(permission, options).then((reqResponse) => {
                        dispatch({
                            type: types.PERMISSIONS_SUCCESS,
                            permission,
                            granted: reqResponse === 'authorized',
                        });
                    });
                });
            });
    };
}

export function setCrewMembers(token, crewId, members) {
    return async function setCrew(dispatch) {
        dispatch({
            type: types.CREW_SET_REQUEST,
        });
        ProtectedAPICall(
            token,
            API_URL,
            `/crews/${crewId}`, {
                method: 'POST',
                body: JSON.stringify({
                    members,
                }),
            },
        ).then((response) => {
            dispatch({
                type: types.CREW_SET_SUCCESS,
                crew: response.data.crew,
            });
        }).catch((status) => {
            dispatch({
                type: types.CREW_SET_FAILURE,
                status,
            });
        });
    };
}

export function checkContactsPermission() {
    return async function checkPerms() {
        if (Platform.OS === 'ios') {
            Contacts.checkPermission((checkErr, permission) => {
                if (permission !== 'authorized') {
                    Contacts.requestPermission((reqErr) => {
                        if (reqErr) throw reqErr;
                    });
                }
            });
        }
    };
}

export function fetchAccountDetails(token) {
    return function startFetchingAccountDetails(dispatch) {
        dispatch({
            type: types.ACCOUNT_DETAILS_REQUEST,
        });
        ProtectedAPICall(
            token,
            API_URL,
            '/auth/status',
        ).then((response) => {
            dispatch({
                type: types.ACCOUNT_DETAILS_SUCCESS,
                data: response.data,
            });
        }).catch((status) => {
            dispatch({
                type: types.ACCOUNT_DETAILS_FAILURE,
                status,
            });
        });
    };
}

export function fetchContacts() {
    return function startFetchingContacts(dispatch) {
        dispatch({
            type: types.CONTACTS_REQUEST,
        });
        Contacts.getAll((err, contacts) => {
            if (err) {
                dispatch({ type: types.CONTACTS_FAILURE });
            } else {
                dispatch({
                    type: types.CONTACTS_SUCCESS,
                    contacts,
                });
            }
        });
    };
}
