import { API_URL } from '../constants/';
import ProtectedAPICall from '../bits/ProtectedAPICall';
import * as types from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export function claimDevice(token, deviceID) {
    return async function claimDeviceForUser(dispatch) {
        dispatch({
            type: types.DEVICE_CLAIM_REQUEST,
        });
        ProtectedAPICall(
            token,
            API_URL,
            `/device/${deviceID}/claim`, {
                method: 'POST',
            },
        ).then((response) => {
            dispatch({
                type: types.DEVICE_CLAIM_SUCCESS,
                devices: response.devices,
            });
        }).catch((status) => {
            dispatch({
                type: types.DEVICE_CLAIM_FAILURE,
                status,
            });
        });
    };
}
