import axios from 'axios';

import { changeAppRoot } from './navActions';
import {
    API_URL,
    MANUFACTURING_MODE_ENABLED,
    ONBOARDING_ENABLED,
} from '../constants/Config';
import * as types from './actionTypes';
import Roles from '../constants/Roles';
import ProtectedAPICall from '../bits/ProtectedAPICall';

export function signIn(email, password) {
    return async function doSignIn(dispatch) {
        dispatch({
            type: types.AUTH_REQUEST,
        });
        return axios
            .post(`${API_URL}/auth/login`, {
                email,
                password,
            })
            .then(response => {
                dispatch({
                    type: types.AUTH_SUCCESS,
                    data: response.data,
                });
                if (
                    MANUFACTURING_MODE_ENABLED &&
                    response.data.role === Roles.Manufacturing
                ) {
                    dispatch(changeAppRoot('secure-manufacturing'));
                } else if (
                    ONBOARDING_ENABLED &&
                    !response.data.viewed_tutorial
                ) {
                    dispatch(changeAppRoot('secure-onboarding'));
                } else {
                    dispatch(changeAppRoot('secure'));
                }
            })
            .catch(res =>
                dispatch({
                    type: types.AUTH_FAILURE,
                    res,
                })
            );
    };
}

export const registerNewAccount = ({
    email,
    phone,
    serial = undefined,
    firstName,
    lastName,
    password,
}) => async dispatch => {
    dispatch({
        type: types.REGISTER_USER_REQUEST,
    });
    try {
        const registerResponse = await axios.post(`${API_URL}/auth/register`, {
            email,
            phone,
            serial,
        });
        const token = registerResponse.data.auth_token;
        const detailsResponse = await ProtectedAPICall(
            token,
            API_URL,
            '/auth/register/details',
            {
                method: 'PUT',
                data: {
                    first: firstName,
                    last: lastName,
                    password,
                },
            }
        );
        dispatch({
            type: types.REGISTER_USER_SUCCESS,
            registerData: registerResponse.data,
            detailsData: detailsResponse.data,
        });
    } catch (res) {
        dispatch({
            type: types.REGISTER_USER_FAILURE,
            res,
        });
    }
};

export function resetAuth() {
    return async function doReset(dispatch) {
        dispatch({
            type: types.AUTH_RESET,
        });
    };
}

export function signOut() {
    return async function doSignOut(dispatch) {
        dispatch(resetAuth()).then(() => dispatch(changeAppRoot('insecure')));
    };
}
