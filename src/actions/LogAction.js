import { Timber } from '@timberio/node';
import DeviceInfo from 'react-native-device-info';
import {
    check,
    checkNotifications,
    PERMISSIONS,
} from 'react-native-permissions';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {
    Permission,
    PermissionStatus,
} from 'react-native-permissions/src/types';
import NetInfo from '@react-native-community/netinfo';
import { BluetoothStatus } from 'react-native-bluetooth-status';

const apiKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS50aW1iZXIuaW8vIiwiZXhwIjpudWxsLCJpYXQiOjE1ODM4NTEzMjYsImlzcyI6Imh0dHBzOi8vYXBpLnRpbWJlci5pby9hcGlfa2V5cyIsInByb3ZpZGVyX2NsYWltcyI6eyJhcGlfa2V5X2lkIjo2ODUzLCJ1c2VyX2lkIjoiYXBpX2tleXw2ODUzIn0sInN1YiI6ImFwaV9rZXl8Njg1MyJ9.fZ3YCnCQ8v3_yTQvNe9WaT0DRkEfFxyY07Pe6YgjSII';
const sourceId = '34447';
let logger;
let usernameStr = '';

const generateMetaData = new Promise(resolve => {
    Promise.all([
        check(PERMISSIONS.IOS.CONTACTS),
        check(PERMISSIONS.IOS.LOCATION_ALWAYS),
        checkNotifications(),
        NetInfo.fetch('cellular'),
        NetInfo.fetch('wifi'),
        BluetoothStatus.state(),
    ]).then(
        ([
            contactsPermissionStatus,
            locationPermissionStatus,
            notificationStatus,
            cellularState,
            wifiState,
            bluetoothState,
        ]) => {
            resolve({
                phone_state: {
                    permissions: {
                        location: locationPermissionStatus,
                        contacts: contactsPermissionStatus,
                        notifications: notificationStatus.status,
                        bluetooth: bluetoothState ? 'enabled' : 'disabled',
                    },
                    connectivity: {
                        wifi: wifiState.isConnected
                            ? 'connected'
                            : 'disconnected',
                        cellular: cellularState.isConnected
                            ? 'connected'
                            : 'disconnected',
                        bluetooth: bluetoothState ? 'enabled' : 'disabled',
                    },
                },
                user_info: {
                    bracelet_serial_number: '',
                    user_id: usernameStr,
                },
                timestamp: new Date().toString(),
            });
        }
    );
});

export class FlareLogger {
    static async addCurrentUser(
        username,
        log: ITimberLog
    ): Promise<ITimberLog> {
        return {
            ...log,
            user: {
                name: username,
            },
        };
    }

    static initLogging() {
        logger = new Timber(apiKey, sourceId);
        async function addDeviceInfo(log: ITimberLog): Promise<ITimberLog> {
            return {
                ...log,
                user: {
                    deviceId: DeviceInfo.getDeviceId(),
                    model: DeviceInfo.getModel(),
                    appVersion: DeviceInfo.getReadableVersion(),
                    systemVersion: DeviceInfo.getSystemVersion(),
                    uniqueId: DeviceInfo.getUniqueId(),
                },
            };
        }
        logger.use(addDeviceInfo);
    }
    /*
    static generateMetaData() : String {

        Promise.all([
            check(PERMISSIONS.IOS.CONTACTS),
            check(PERMISSIONS.IOS.LOCATION_ALWAYS),
            checkNotifications(),
            NetInfo.fetch("cellular"),
            NetInfo.fetch('wifi'),
            BluetoothStatus.state(),
        ]).then(([contactsPermissionStatus, locationPermissionStatus, notificationStatus, cellularState, wifiState, bluetoothState]) => {
            return {
                phone_state: {
                    permissions: {
                        location: locationPermissionStatus,
                        contacts: contactsPermissionStatus,
                        notifications: notificationStatus.status,
                        bluetooth: (bluetoothState ? 'enabled' : 'disabled'),
                    },
                    connectivity: {
                        wifi: (wifiState.isConnected ? 'connected' : 'disconnected'),
                        cellular: (cellularState.isConnected ? 'connected' : 'disconnected'),
                        bluetooth: (bluetoothState ? 'enabled' : 'disabled'),
                    }
                },
                user_info: {
                    bracelet_serial_number: '',
                    user_id: usernameStr,
                },
                timestamp: new Date().toString(),
            };
        });
    }*/

    static setLoginInfo(username) {
        usernameStr = username;
        logger.use(FlareLogger.addCurrentUser(username));
    }

    static removeLoginInfo() {
        logger.remove(FlareLogger.addCurrentUser);
    }

    static error(logString) {
        generateMetaData.then(metaData => {
            console.debug('Metadata', metaData);
            logger.error(logString, metaData);
        });
    }

    static warn(logString) {
        generateMetaData.then(metaData => {
            console.debug('Metadata', metaData);
            logger.warn(logString, metaData);
        });
    }

    static debug(logString) {
        generateMetaData.then(metaData => {
            console.debug('Metadata', metaData);
            logger.debug(logString, metaData);
        });
    }

    static info(logString) {
        generateMetaData.then(metaData => {
            console.debug('Metadata', metaData);
            logger.info(logString, metaData);
        });
    }
}
