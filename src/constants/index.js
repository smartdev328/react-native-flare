import Config from 'react-native-config';

export const { API_URL } = Config;
export const { BLUETOOTH_BEACON_LOGGING, AMBASSADOR_SIGNUP_URL } = Config;
export const SHOW_ALL_BEACONS_IN_HOME_SCREEN = Config.SHOW_ALL_BEACONS_IN_HOME_SCREEN === 'true';
export const REDUX_LOGGING = Config.REDUX_LOGGING === 'enabled';
export const BLUETOOTH_LISTENING = Config.BLUETOOTH_LISTENING === 'enabled';
export const ACCOUNT_SYNC_INTERVAL = parseInt(Config.ACCOUNT_SYNC_INTERVAL, 10);
export const ACCOUNT_SYNC_INTERVAL_FLARE = parseInt(Config.ACCOUNT_SYNC_INTERVAL_FLARE, 10);
export const ACCOUNT_SYNC_INTERVAL_DEV = parseInt(Config.ACCOUNT_SYNC_INTERVAL_DEV, 10);
export const FLARE_TIMELINE_REFRESH_INTERVAL = parseInt(Config.FLARE_TIMELINE_REFRESH_INTERVAL, 10);
export const BEACON_CACHE_PRUNE_INTERVAL_IN_MS = parseInt(Config.BEACON_CACHE_PRUNE_INTERVAL_IN_MS, 10);
export const UNIQUE_BEACON_TIMING_IN_MS = parseInt(Config.UNIQUE_BEACON_TIMING_IN_MS, 10);
export const BEACON_CACHE_MAX_AGE_IN_MINS = parseInt(Config.BEACON_CACHE_MAX_AGE_IN_MINS, 10);
export const DEVICE_ID_LABEL_LENGTH = parseInt(Config.DEVICE_ID_LABEL_LENGTH, 10);
export const DEVICE_TWO_FACTOR_LABEL_LENGTH = parseInt(Config.DEVICE_TWO_FACTOR_LABEL_LENGTH, 10);
export const MAX_DEVICE_ID = parseInt(Config.MAX_DEVICE_ID, 10);
export const DEVICE_ADDITION_THREE_PRESS_MAX_TIME = parseInt(Config.DEVICE_ADDITION_THREE_PRESS_MAX_TIME, 10);
export const DEVICE_ADDITION_MIN_PRESS_COUNT = parseInt(Config.DEVICE_ADDITION_MIN_PRESS_COUNT, 10);
export const MANUFACTURING_MODE_ENABLED = Config.MANUFACTURING_MODE_ENABLED === 'true';
export const ONBOARDING_ENABLED = Config.ONBOARDING_ENABLED === 'true';
export const LONG_PRESS_CANCEL_PIN_LENGTH = parseInt(Config.LONG_PRESS_CANCEL_PIN_LENGTH, 10);
export const LEFT_NAVIGATION_WIDTH = parseInt(Config.LEFT_NAVIGATION_WIDTH, 10);
export const USERS_CAN_ADD_JEWELRY = Config.USERS_CAN_ADD_JEWELRY === 'true';

export const summary = [
    { key: 'API', value: API_URL },
    { key: 'Logging / Redux', value: REDUX_LOGGING.toString() },
    { key: 'Logging / BLE', value: BLUETOOTH_BEACON_LOGGING.toString() },
    { key: 'Bluetooth', value: BLUETOOTH_LISTENING.toString() },
    { key: 'Account Sync', value: ACCOUNT_SYNC_INTERVAL },
];
