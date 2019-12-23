import * as types from './actionTypes';

export const setBluetoothState = state => ({
    type: types.BLUETOOTH_STATE_CHANGED,
    bluetooth: state,
});

export const startBleListening = () => ({
    type: types.BLUETOOTH_START_REQUEST,
});

export const stopBleListening = () => ({
    type: types.BLUETOOTH_STOP_REQUEST,
});

export const beaconCountsReset = () => ({
    type: types.BEACON_COUNTS_RESET,
});

export const callStatusChanged = status => ({
    type: types.CALL_STATUS_CHANGED,
    status,
});
