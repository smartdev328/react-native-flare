import * as types from './actionTypes';

export const regStart = () => ({
    type: types.USER_REG_START,
});

export const regSetName = value => ({ type: types.USER_REG_SET_NAME, value });
export const regSetEmail = value => ({ type: types.USER_REG_SET_EMAIL, value });
export const regSetPhone = value => ({ type: types.USER_REG_SET_PHONE, value });
export const regSetPassword = value => ({
    type: types.USER_REG_SET_PASSWORD,
    value,
});

export const setPreferredPairingMethod = value => ({
    type: types.USER_REG_SET_PAIRING,
    value,
});

export const setFoundDevice = value => ({
    type: types.USER_REG_SET_FOUND_DEVICE,
    value,
});

export const setScenarioScreen = value => ({
    type: types.USER_SCENARIO_SET_SCREEN,
    value,
});

export const scenarioDidCall = () => ({
    type: types.USER_SCENARIO_DID_CALL,
});

export const scenarioDidText = () => ({
    type: types.USER_SCENARIO_DID_TEXT,
});

export const awaitLongPress = () => ({
    type: types.USER_SCENARIO_AWAIT_LONG_PRESS,
});

export const gotLongPress = () => ({
    type: types.USER_SCENARIO_GOT_LONG_PRESS,
});
