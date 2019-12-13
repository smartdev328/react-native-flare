import { API_URL } from '../constants/Config';
import ProtectedAPICall from '../bits/ProtectedAPICall';
import * as types from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export function claimDevice(token, deviceID, secondFactor) {
    return async function claimDeviceForUser(dispatch) {
        dispatch({
            type: types.DEVICE_CLAIM_REQUEST,
        });
        ProtectedAPICall(token, API_URL, `/device/${deviceID}/claim`, {
            method: 'POST',
            data: {
                second_factor: secondFactor,
            },
        })
            .then(response => {
                dispatch({
                    type: types.DEVICE_CLAIM_SUCCESS,
                    devices: response.data.devices,
                    claimedDevice: deviceID,
                });
            })
            .catch(status => {
                dispatch({
                    type: types.DEVICE_CLAIM_FAILURE,
                    status,
                });
            });
    };
}

export const resetClaim = () => ({
    type: types.DEVICE_CLAIM_RESET,
});

export function disclaimDevice(token, deviceID) {
    return async function removeDeviceFromUser(dispatch) {
        dispatch({
            type: types.DEVICE_DISCLAIM_REQUEST,
        });
        ProtectedAPICall(token, API_URL, `/device/${deviceID}/disclaim`, {
            method: 'POST',
        })
            .then(response => {
                dispatch({
                    type: types.DEVICE_DISCLAIM_SUCCESS,
                    devices: response.data.devices,
                });
            })
            .catch(status => {
                dispatch({
                    type: types.DEVICE_DISCLAIM_FAILURE,
                    status,
                });
            });
    };
}
