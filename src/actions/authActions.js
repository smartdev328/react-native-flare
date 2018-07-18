import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import { changeAppRoot } from './navActions';
import { API_URL } from '../constants/index';

console.debug(`Got api url ${API_URL}`);

export function signIn(email, password) {
    return async function doSignIn(dispatch) {
        return axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        }).then((data) => {
            dispatch({
                type: types.AUTH_SUCCESS,
                data,
            });
            dispatch(changeAppRoot('secure'));
        })
            .catch(res => dispatch({
                type: types.AUTH_FAILURE,
                res,
            }));
    };
}

export function resetAuth() {
    return async function doReset() {
        await AsyncStorage.removeItem('userToken');
        return {
            type: types.AUTH_RESET,
        };
    };
}

export function signOut() {
    return async function doSignOut(dispatch) {
        dispatch(resetAuth()).then(() => dispatch(changeAppRoot('insecure')));
    };
}
