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
            console.debug(`Claim device response ${JSON.stringify(response)}`);
            dispatch({
                type: types.DEVICE_CLAIM_SUCCESS,
                devices: response.devices,
            });
        }).catch((status) => {
            console.debug(`Claim device error ${JSON.stringify(status)}`);
            dispatch({
                type: types.DEVICE_CLAIM_FAILURE,
                status,
            });
        });
    };
}