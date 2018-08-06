import { Platform } from 'react-native';
import * as types from './actionTypes';
import moment from 'moment';
import { API_URL } from '../constants/';
import ProtectedAPICall from '../bits/ProtectedAPICall';

export function call(token, beacon, position) {
    return async function doCall(dispatch) {
        ProtectedAPICall(
            token,
            API_URL,
            '/sos/call', {
                method: 'POST',
                body: JSON.stringify({
                    device_id: beacon.deviceID,
                    nonce: beacon.nonce,
                    timestamp: moment(beacon.timestamp).toISOString(),
                    position,
                }),
            },
        ).then(() => {
            dispatch({
                type: types.BEACON_SHORT_PRESS,
                beacon,
                position,
            });
        }).catch((status) => {
            dispatch({
                type: types.BEACON_HANDLING_FAILED,
                beacon,
                position,
                status,
            });
        });
    };
}

export function flare(token, beacon, position) {
    return async function doFlare(dispatch) {
        ProtectedAPICall(
            token,
            API_URL,
            '/sos/flare', {
                method: 'POST',
                body: JSON.stringify({
                    device_id: beacon.deviceID,
                    nonce: beacon.nonce,
                    timestamp: moment(beacon.timestamp).toISOString(),
                    position,
                }),
            },
        ).then((response) => {
            console.debug(`Flare response ${JSON.stringify(response)}`);
            dispatch({
                type: types.BEACON_LONG_PRESS,
                beacon,
                position,
                crewEvents: response.crew_events,
            });
        }).catch((status) => {
            dispatch({
                type: types.BEACON_HANDLING_FAILED,
                beacon,
                position,
                status,
            });
        });
    };
}

export function cancelActiveFlare(token, pin) {
    return async function doCancelFlare(dispatch) {
        dispatch({
            type: types.CANCEL_ACTIVE_FLARE_REQUEST,
        });
        ProtectedAPICall(
            token,
            API_URL,
            '/sos/flare/cancel', {
                method: 'POST',
                body: JSON.stringify({
                    pin,
                }),
            },
        ).then((response) => {
            dispatch({
                type: types.CANCEL_ACTIVE_FLARE_SUCCESS,
                crewEvents: response.crew_events,
            });
        }).catch((status) => {
            dispatch({
                type: types.CANCEL_ACTIVE_FLARE_FAILURE,
                status,
            });
        });
    };
}

export function checkin(token, beacon, position) {
    return async function doCheckin(dispatch) {
        ProtectedAPICall(
            token,
            API_URL,
            '/sos/checkin', {
                method: 'POST',
                body: JSON.stringify({
                    device_id: beacon.deviceID,
                    timestamp: moment(beacon.timestamp).toISOString(),
                    position,
                    details: {
                        proximity: beacon.proximity,
                        distance: beacon.distance,
                        rssi: beacon.rssi,
                        major: beacon.major,
                        minor: beacon.minor,
                        uuid: beacon.uuid,
                    },
                }),
            },
        ).then(() => {
            dispatch({
                type: types.BEACON_CHECKIN,
                beacon,
            });
        }).catch((status) => {
            dispatch({
                type: types.BEACON_HANDLING_FAILED,
                beacon,
                status,
            });
        });
    };
}
