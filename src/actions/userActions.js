import { Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import Permissions from 'react-native-permissions';

import * as types from './actionTypes';
import { API_URL } from '../constants/';
import ProtectedAPICall from '../bits/ProtectedAPICall';

export function setCrewMembers(token, crewId, members) {
    return async function setCrew(dispatch) {
        dispatch({
            type: types.CREW_SET_REQUEST,
        });
        ProtectedAPICall(token, API_URL, `/crews/${crewId}`, {
            method: 'POST',
            data: {
                members,
            },
        })
            .then((response) => {
                dispatch({
                    type: types.CREW_SET_SUCCESS,
                    crew: response.data.data.crew,
                });
            })
            .catch((status) => {
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

export function checkLocationsPermission() {
    return async function checkPermsLoc(dispatch) {
        Permissions.check('location', { type: 'always' }).then((response) => {
            dispatch({
                type: types.PERMISSIONS_SUCCESS,
                permission: 'location',
                granted: response === 'authorized',
            });
        });
    };
}

export function syncAccountDetails(args) {
    return function startSyncingAccountDetails(dispatch) {
        dispatch({
            type: types.ACCOUNT_DETAILS_REQUEST,
        });

        const status = { args };
        const requestOptions = {
            method: 'POST',
        };
        if (status) {
            requestOptions.data = {
                status: args.status,
            };
        }

        ProtectedAPICall(args.analyticsToken, API_URL, '/auth/status', requestOptions)
            .then((response) => {
                dispatch({
                    type: types.ACCOUNT_DETAILS_SUCCESS,
                    data: response.data,
                });
            })
            .catch((error) => {
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
        Contacts.getAllWithoutPhotos((err, contacts) => {
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

export function getCrewEventTimeline(token) {
    return function getTimeline(dispatch) {
        dispatch({
            type: types.GET_FLARE_TIMELINE_REQUEST,
        });
        ProtectedAPICall(token, API_URL, '/crews/event', {
            method: 'GET',
        })
            .then((response) => {
                dispatch({
                    type: types.GET_FLARE_TIMELINE_SUCCESS,
                    data: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.GET_FLARE_TIMELINE_FAILURE,
                    error,
                });
            });
    };
}

export function getPermission(name, options) {
    return async function doCheck(dispatch) {
        Permissions.check(name, options).then((checkResponse) => {
            dispatch({
                type: types.PERMISSIONS_REQUEST,
                name,
            });
            if (checkResponse !== 'authorized') {
                Permissions.request(name, options).then((response) => {
                    dispatch({
                        type: types.PERMISSIONS_SUCCESS,
                        permission: name,
                        granted: response === 'authorized',
                    });
                });
            } else {
                dispatch({
                    type: types.PERMISSIONS_SUCCESS,
                    permission: name,
                    granted: true,
                });
            }
        });
    };
}

export function setNotificationMessage(token, message, custom) {
    return function setMessage(dispatch) {
        dispatch({
            type: types.SETTINGS_SET_POPUP_MESSAGE_REQUEST,
        });
        ProtectedAPICall(token, API_URL, '/users/notification', {
            method: 'POST',
            data: {
                message,
            },
        })
            .then((response) => {
                dispatch({
                    type: types.SETTINGS_SET_POPUP_MESSAGE_SUCCESS,
                    data: response.data.data,
                    custom,
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.SETTINGS_SET_POPUP_MESSAGE_FAILURE,
                    error,
                });
            });
    };
}

export function setCancelPIN(token, pin) {
    return function setPin(dispatch) {
        dispatch({
            type: types.USER_SET_PIN_REQUEST,
        });
        ProtectedAPICall(token, API_URL, '/users/pin', {
            method: 'PUT',
            data: {
                pin,
            },
        })
            .then(() => {
                dispatch({
                    type: types.USER_SET_PIN_SUCCESS,
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.USER_SET_PIN_FAILURE,
                    error,
                });
            });
    };
}

export function setOnboardingComplete(token) {
    return function setPin(dispatch) {
        dispatch({
            type: types.USER_SET_ONBOARDING_COMPLETE_REQUEST,
        });
        ProtectedAPICall(token, API_URL, '/users/onboarding/complete', {
            method: 'PUT',
        })
            .then(() => {
                dispatch({
                    type: types.USER_SET_ONBOARDING_COMPLETE_SUCCESS,
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.USER_SET_ONBOARDING_COMPLETE_FAILURE,
                    error,
                });
            });
    };
}

export function setUserDetails(token, firstName, lastName, password) {
    return async function doSetDetails(dispatch) {
        dispatch({
            type: types.SET_USER_DETAILS_REQUEST,
        });
        ProtectedAPICall(token, API_URL, '/auth/register/details', {
            method: 'PUT',
            data: {
                first: firstName,
                last: lastName,
                password,
            },
        })
            .then(() => {
                dispatch({
                    type: types.SET_USER_DETAILS_SUCCESS,
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.SET_USER_DETAILS_FAILURE,
                    error,
                });
            });
    };
}

export function setPrivacyConfig(token, config) {
    return function doSetPrivacyConfig(dispatch) {
        dispatch({
            type: types.USER_SET_PRIVACY_CONFIG_REQUEST,
        });
        const { analytics } = config;
        ProtectedAPICall(token, API_URL, '/users/privacy', {
            method: 'POST',
            data: {
                analytics,
            },
        })
            .then((response) => {
                dispatch({
                    type: types.USER_SET_PRIVACY_CONFIG_SUCCESS,
                    analyticsEnabled: response.data.privacy.analytics,
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.USER_SET_PRIVACY_CONFIG_FAILURE,
                    error,
                });
            });
    };
}

export function setCallScript(token, script) {
    return function setEnabled(dispatch) {
        dispatch({
            type: types.USER_SET_CALL_SCRIPT_REQUEST,
        });
        ProtectedAPICall(token, API_URL, '/users/call/script', {
            method: 'POST',
            data: {
                script,
            },
        })
            .then((response) => {
                dispatch({
                    type: types.USER_SET_CALL_SCRIPT_SUCCESS,
                    script: response.data.script,
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.USER_SET_CALL_SCRIPT_FAILURE,
                    error,
                });
            });
    };
}
