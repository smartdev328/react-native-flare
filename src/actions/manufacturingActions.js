import * as types from './actionTypes';
import { API_URL } from '../constants/';
import ProtectedAPICall from '../bits/ProtectedAPICall';

export default function getDeviceCounts(token) {
    return async function doGet(dispatch) {
        dispatch({
            type: types.MANUFACTURING_GET_DEVICES_REQUEST,
        });
        ProtectedAPICall(
            token,
            API_URL,
            '/manufacturing/devices',
        ).then((response) => {
            dispatch({
                type: types.MANUFACTURING_GET_DEVICES_SUCCESS,
                deviceCounts: response.data.device_counts,
            });
        }).catch((status) => {
            dispatch({
                type: types.MANUFACTURING_GET_DEVICES_FAILURE,
                status,
            });
        });
    };
}
