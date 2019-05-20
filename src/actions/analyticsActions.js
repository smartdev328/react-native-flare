import { API_URL } from '../constants/';
import ProtectedAPICall from '../bits/ProtectedAPICall';
import * as types from './actionTypes';

export default function sendEvents(token, events) {
    return async function send(dispatch) {
        dispatch({
            type: types.ANALYTICS_SEND_EVENTS_REQUEST,
        });
        ProtectedAPICall(
            token,
            API_URL,
            '/ua/events', {
                method: 'POST',
                data: {
                    events,
                },
            },
        ).then(() => {
            dispatch({
                type: types.ANALYTICS_SEND_EVENTS_SUCCESS,
            });
        }).catch((status) => {
            dispatch({
                type: types.ANALYTICS_SEND_EVENTS_FAILURE,
                status,
            });
        });
    };
}
