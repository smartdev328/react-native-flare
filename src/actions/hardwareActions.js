import * as types from './actionTypes';

export function setBluetoothState(state) {
    return {
        type: types.BLUETOOTH_STATE_CHANGED,
        bluetooth: state,
    };
}

export default {
    setBluetoothState,
};
