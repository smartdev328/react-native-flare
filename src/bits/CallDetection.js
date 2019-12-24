import { NativeEventEmitter, NativeModules } from 'react-native';
import { callStatusChanged } from '../actions/hardwareActions';

const { GFCallManager } = NativeModules;
const callManagerEmitter = new NativeEventEmitter(GFCallManager);

export const registerCallDetection = dispatch => {
    const subscription = callManagerEmitter.addListener(
        'CallStatus',
        status => {
            dispatch(callStatusChanged(status));
        }
    );
    return () => subscription.remove();
};
