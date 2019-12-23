import * as types from '../actions/actionTypes';
import { initialState } from './initialState';

// eslint-disable-next-line import/prefer-default-export
export function hardware(state = initialState.hardware, action = {}) {
    switch (action.type) {
        case types.BLUETOOTH_STATE_CHANGED:
            return state.merge({
                bluetooth: action.bluetooth,
            });

        case types.BLUETOOTH_START_REQUEST:
            return state.merge({
                bleListeningChange: 'requested',
                bleListeningChangeDir: 'up',
                bleListening: false,
            });

        case types.BLUETOOTH_START_FAILURE:
            return state.merge({
                bleListeningChange: 'failed',
                bleListeningChangeDir: 'up',
                bleListening: false,
            });

        case types.BLUETOOTH_START_SUCCESS:
            return state.merge({
                bleListeningChange: 'succeeded',
                bleListeningChangeDir: 'up',
                bleListening: true,
            });

        case types.BLUETOOTH_STOP_REQUEST:
            return state.merge({
                bleListeningChange: 'requested',
                bleListeningChangeDir: 'down',
                bleListening: false,
            });

        case types.BLUETOOTH_STOP_FAILURE:
            return state.merge({
                bleListeningChange: 'failed',
                bleListeningChangeDir: 'down',
                bleListening: false,
            });

        case types.BLUETOOTH_STOP_SUCCESS:
            return state.merge({
                bleListeningChange: 'stopped',
                bleListeningChangeDir: 'down',
                bleListening: false,
            });

        case types.CALL_STATUS_CHANGED:
            return state.set('callStatus', action.status);

        default:
            return state;
    }
}
