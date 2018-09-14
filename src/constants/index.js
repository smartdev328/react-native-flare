import Config from 'react-native-config';

export const { API_URL, BLUETOOTH_BEACON_LOGGING } = Config;
export const REDUX_LOGGING = Config.REDUX_LOGGING === 'enabled';
export const BLUETOOTH_LISTENING = Config.BLUETOOTH_LISTENING === 'enabled';
export const ACCOUNT_SYNC_INTERVAL = parseInt(Config.ACCOUNT_SYNC_INTERVAL, 10);

export const summary = {
    api: API_URL,
    logging: {
        redux: REDUX_LOGGING,
        ble: BLUETOOTH_BEACON_LOGGING,
    },
    bluetooth: BLUETOOTH_LISTENING,
    accountSyncInterval: ACCOUNT_SYNC_INTERVAL,
};
