import { NativeEventEmitter, NativeModules } from 'react-native';

import { callStatusChanged } from '../actions/hardwareActions';
import * as types from '../actions/actionTypes';

const { GFCallManager, GFPermissionWatcher } = NativeModules;
const callManagerEmitter = new NativeEventEmitter(GFCallManager);
const permissionEmitter = new NativeEventEmitter(GFPermissionWatcher);

export const registerCallDetection = dispatch => {
    const subscription = callManagerEmitter.addListener(
        'CallStatus',
        status => {
            dispatch(callStatusChanged(status));
        }
    );
    return () => subscription.remove();
};

export const registerPermissionDetection = dispatch => {
    const subscription = permissionEmitter.addListener(
        'PermissionStatus',
        ({ status }) => {
            if (typeof status === 'string') {
                dispatch({
                    type: types.PERMISSIONS_SUCCESS,
                    permission: 'location',
                    granted: status === 'authorized_always',
                });
            }
        }
    );

    return () => subscription.remove();
};
