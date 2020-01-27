import axios from 'axios';

import { changeAppRoot } from './navActions';
import { API_URL, MANUFACTURING_MODE_ENABLED } from '../constants/Config';
import * as types from './actionTypes';
import Roles from '../constants/Roles';
import ProtectedAPICall from '../bits/ProtectedAPICall';

export const signIn = (email, password) => async dispatch => {
    try {
        dispatch({
            type: types.AUTH_REQUEST,
        });
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
        });

        const viewedTutorial = !!response.data.viewed_tutorial;

        dispatch({
            type: types.AUTH_SUCCESS,
            data: response.data,
            viewedTutorial,
        });
        if (
            MANUFACTURING_MODE_ENABLED &&
            response.data.role === Roles.Manufacturing
        ) {
            dispatch(changeAppRoot('secure-manufacturing'));
        } else if (viewedTutorial) {
            dispatch(changeAppRoot('secure'));
        }
    } catch (res) {
        dispatch({
            type: types.AUTH_FAILURE,
            res,
        });
    }
};

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
    } catch (error) {
        dispatch({
            type: types.REGISTER_USER_FAILURE,
            error,
            response: error.response,
        });
    }
};

export const resetAuth = () => ({
    type: types.AUTH_RESET,
});

export const signOut = () => async dispatch => {
    await dispatch({ type: types.USER_RESET });
    return dispatch(changeAppRoot('insecure'));
};
