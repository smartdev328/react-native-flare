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

export const summary = [
    { key: 'API', value: API_URL },
    { key: 'Logging / Redux', value: REDUX_LOGGING.toString() },
    { key: 'Logging / BLE', value: BLUETOOTH_BEACON_LOGGING.toString() },
    { key: 'Bluetooth', value: BLUETOOTH_LISTENING.toString() },
    { key: 'Account Sync', value: ACCOUNT_SYNC_INTERVAL },
];
