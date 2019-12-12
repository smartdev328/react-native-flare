import * as types from './actionTypes';

export function setBluetoothState(state) {
    return {
        type: types.BLUETOOTH_STATE_CHANGED,
        bluetooth: state,
    };
}

export function startBleListening() {
    return {
        type: types.BLUETOOTH_START_REQUEST,
    };
}

export function stopBleListening() {
    return {
        type: types.BLUETOOTH_STOP_REQUEST,
    };
}

export default {
    setBluetoothState,
    startBleListening,
    stopBleListening,
};

export const beaconCountsReset = () => ({
    type: types.BEACON_COUNTS_RESET,
});
