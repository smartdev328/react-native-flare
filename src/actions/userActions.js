import { PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import * as types from './actionTypes';

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

export function checkContactsPermission() {
    return async function checkPerms()   {
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

export function fetchContacts() {
    return function startFetchingContacts(dispatch) {
        dispatch({
            type: types.CONTACTS_REQUEST,
        });
        Contacts.getAll((err, contacts) => {
            if (err) {
                console.warn('Fuckkkkkk');
                dispatch({ type: types.CONTACTS_FAILURE });
            } else {
                console.debug(`Got ${contacts.length} mf contacts`);
                dispatch({
                    type: types.CONTACTS_SUCCESS,
                    contacts,
                });
            }
        });
    };
}
