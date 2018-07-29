import { Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import * as types from './actionTypes';

import { API_URL } from '../constants/';
import ProtectedAPICall from '../bits/ProtectedAPICall';

// export async function checkAndroidPermissions() {
//     return async function requestPermissions(dispatch) {
//         const permissions = [
//             PermissionsAndroid.ACCESS_COARSE_LOCATION,
//             PermissionsAndroid.ACCESS_FINE_LOCATION,
//             PermissionsAndroid.READ_CONTACTS,
//         ];

//         dispatch({ type: types.PERMISSIONS_REQUEST });

//         try {
//             PermissionsAndroid.requestMultiple(permissions).then((granted) => {
//                 dispatch({
//                     type: types.PERMISSIONS_SUCCESS,
//                     granted,
//                 });
//                 this.nextAction();
//             });
//         } catch (err) {
//             console.warn(err);
//             dispatch({
//                 type: types.PERMISSIONS_FAILURE,
//                 err,
//             });
//         }

//     };
// }

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
