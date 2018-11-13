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
                // Request permission for each service that is not authorized.
                const permissionsToRequest = Object.keys(checkResponse).filter(p => checkResponse[p] !== 'authorized');
                permissionsToRequest.forEach((permission) => {
                    const options = permissions[permission];
                    Permissions.request(permission, options).then((reqResponse) => {
                        dispatch({
                            type: types.PERMISSIONS_SUCCESS,
                            permission,
                            granted: reqResponse === 'authorized',
                        });
                    });
                });

                // Ensure that the redux store knows about services that are already authorized.
                const permissionsAlreadyGranted =
                    Object.keys(checkResponse).filter(p => checkResponse[p] === 'authorized');
                permissionsAlreadyGranted.forEach((permission) => {
                    dispatch({
                        type: types.PERMISSIONS_SUCCESS,
                        permission,
                        granted: true,
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
                data: {
                    members,
                },
            },
        ).then((response) => {
            dispatch({
                type: types.CREW_SET_SUCCESS,
                crew: response.data.data.crew,
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

export function syncAccountDetails(args) {
    return function startSyncingAccountDetails(dispatch) {
        dispatch({
            type: types.ACCOUNT_DETAILS_REQUEST,
        });

        const status = { args };
        let requestOptions = null;
        if (status) {
            requestOptions = {
                method: 'POST',
                data: {
                    status: args.status,
                },
            };
        }

        ProtectedAPICall(
            args.token,
            API_URL,
            '/auth/status',
            requestOptions,
        ).then((response) => {
            dispatch({
                type: types.ACCOUNT_DETAILS_SUCCESS,
                data: response.data.data,
            });
        }).catch((error) => {
            dispatch({
                type: types.ACCOUNT_DETAILS_FAILURE,
                status: error,
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

export function getCrewEventTimeline(token, eventID) {
    return function getTimeline(dispatch) {
        dispatch({
            type: types.GET_FLARE_TIMELINE_REQUEST,
        });
        ProtectedAPICall(
            token,
            API_URL,
            `/sos/flare/${eventID}`, {
                method: 'GET',
            },
        ).then((response) => {
            dispatch({
                type: types.GET_FLARE_TIMELINE_SUCCESS,
                data: response.data.data,
            });
        }).catch((error) => {
            dispatch({
                type: types.GET_FLARE_TIMELINE_FAILURE,
                error,
            });
        });
    };
}
