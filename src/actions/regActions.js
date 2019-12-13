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
