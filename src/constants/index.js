import Config from 'react-native-config';

export const { API_URL, BLUETOOTH_BEACON_LOGGING } = Config;
export const REDUX_LOGGING = Config.REDUX_LOGGING === 'enabled';
export const BLUETOOTH_LISTENING = Config.BLUETOOTH_LISTENING === 'enabled';

export const summary = {
    api: API_URL,
    logging: {
        redux: REDUX_LOGGING,
        ble: BLUETOOTH_BEACON_LOGGING,
    },
    bluetooth: BLUETOOTH_LISTENING,
};
