import Config from 'react-native-config';

export const { API_URL } = Config;
export const { BLUETOOTH_BEACON_LOGGING } = Config;
export const SHOW_ALL_BEACONS_IN_HOME_SCREEN = Config.SHOW_ALL_BEACONS_IN_HOME_SCREEN === 'true';
export const REDUX_LOGGING = Config.REDUX_LOGGING === 'enabled';
export const BLUETOOTH_LISTENING = Config.BLUETOOTH_LISTENING === 'enabled';
export const ACCOUNT_SYNC_INTERVAL = parseInt(Config.ACCOUNT_SYNC_INTERVAL, 10);
export const ACCOUNT_SYNC_INTERVAL_FLARE = parseInt(Config.ACCOUNT_SYNC_INTERVAL_FLARE, 10);
export const ACCOUNT_SYNC_INTERVAL_DEV = parseInt(Config.ACCOUNT_SYNC_INTERVAL_DEV, 10);
export const FLARE_TIMELINE_REFRESH_INTERVAL = parseInt(Config.FLARE_TIMELINE_REFRESH_INTERVAL, 10);

export const summary = {
    api: API_URL,
    logging: {
        redux: REDUX_LOGGING,
        ble: BLUETOOTH_BEACON_LOGGING,
    },
    bluetooth: BLUETOOTH_LISTENING,
    accountSyncInterval: ACCOUNT_SYNC_INTERVAL,
};
