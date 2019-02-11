import Immutable from 'seamless-immutable';
import moment from 'moment';

import { API_URL } from '../constants/';
import * as types from './actionTypes';
import ProtectedAPICall from '../bits/ProtectedAPICall';

export function call(token, beacon, position, forCurrentUser) {
    return async function doCall(dispatch) {
        ProtectedAPICall(
            token,
            API_URL,
            '/sos/call', {
                method: 'POST',
                data: {
                    device_id: beacon.deviceID,
                    nonce: beacon.nonce,
                    timestamp: moment(beacon.timestamp).toISOString(),
                    position,
                },
            },
        ).then(() => {
            if (forCurrentUser) {
                dispatch({
                    type: types.BEACON_SHORT_PRESS,
                    beacon,
                    position,
                });
            }
        }).catch((status) => {
            if (forCurrentUser) {
                dispatch({
                    type: types.BEACON_HANDLING_FAILED,
                    beacon,
                    position,
                    status,
                });
            }
        });
    };
}

export function flare(token, beacon, position, forCurrentUser) {
    return async function doFlare(dispatch) {
        if (forCurrentUser) {
            dispatch({
                type: types.BEACON_LONG_PRESS,
            });
            dispatch({
                type: types.ACTIVATE_FLARE_REQUEST,
            });
        }
        ProtectedAPICall(
            token,
            API_URL,
            '/sos/flare', {
                method: 'POST',
                data: {
                    device_id: beacon.deviceID,
                    nonce: beacon.nonce,
                    timestamp: moment(beacon.timestamp).toISOString(),
                    position,
                },
            },
        ).then((response) => {
            if (forCurrentUser) {
                dispatch({
                    type: types.ACTIVATE_FLARE_SUCCESS,
                    data: {
                        beacon,
                        position,
                        crewEvents: response.data.crew_events,
                    },
                });
            }
        }).catch((status) => {
            if (forCurrentUser) {
                dispatch({
                    type: types.ACTIVATE_FLARE_FAILURE,
                    data: {
                        beacon,
                        position,
                        status,
                    },
                });
                dispatch({
                    type: types.BEACON_HANDLING_FAILED,
                    beacon,
                    position,
                    status,
                });
            }
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
                data: {
                    pin,
                },
            },
        ).then(() => {
            dispatch({
                type: types.CANCEL_ACTIVE_FLARE_SUCCESS,
                data: {
                    crewEvents: [],
                },
            });
        }).catch((status) => {
            dispatch({
                type: types.CANCEL_ACTIVE_FLARE_FAILURE,
                status,
            });
        });
    };
}

export function checkin(token, beacon, position, forCurrentUser) {
    return async function doCheckin(dispatch) {
        ProtectedAPICall(
            token,
            API_URL,
            '/sos/checkin', {
                method: 'POST',
                data: {
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
                },
            },
        ).then(() => {
            if (forCurrentUser) {
                dispatch({
                    type: types.BEACON_CHECKIN,
                    beacon,
                });
            }
        }).catch((status) => {
            if (forCurrentUser) {
                dispatch({
                    type: types.BEACON_HANDLING_FAILED,
                    beacon,
                    position,
                    status,
                });
            }
        });
    };
}

/**
 * Attempt to recover tokens that we tried and failed to submit in the past. For example, let's say that a user has
 * a spotty network connection. They might receive a beacon just when the network is unavailable. When that happens,
 * we keep a copy of the beacon and position data in the redux store. At some point, we call this method to try again.
  *
 * @param {func} handleBeacon method to call for each beacon that we tried and failed to submit
 * @param {*} token auth token
 * @param {Array} problemBeacons list of beacons that we tried and failed to submit before
 */
export function processQueuedBeacons(handleBeacon, token, problemBeacons) {
    return async function doProcessQueuedBeacons(dispatch) {
        const beaconsToClear = [];
        problemBeacons.forEach((problem) => {
            // increment the retry counter
            let retry = Immutable.getIn(problem.beacon, ['retry']);
            if (typeof retry === 'undefined') {
                retry = 1;
            } else {
                retry += 1;
            }
            const updatedBeacon = Immutable.setIn(problem.beacon, ['retry'], retry);

            // resubmit the beacon with the incremented retry counter
            handleBeacon(dispatch, token, updatedBeacon, problem.position);

            // clear any beacons with the same uuid and timestamp but older retry numbers
            beaconsToClear.push({
                uuid: updatedBeacon.uuid,
                timestamp: updatedBeacon.timestamp,
                retry: retry - 1,
            });
        });

        dispatch({
            type: types.CLEAR_PROBLEM_BEACONS,
            beaconsToClear,
        });
    };
}
