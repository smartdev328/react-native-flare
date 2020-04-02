import DeviceInfo from 'react-native-device-info';
import { NativeModules } from 'react-native';

import {
    check,
    checkNotifications,
    PERMISSIONS,
} from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import { BluetoothStatus } from 'react-native-bluetooth-status';
import FlareDeviceID from '../bits/FlareDeviceID';

let usernameStr = '';
const remoteHost = `logs6.papertrailapp.com`;
const remotePort = 14765;
const dgram = require('react-native-udp');
let socket;
let socketInitialized = true;
const dateOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
};
const timeOptions = {
    hour: `2-digit`,
    minute: `2-digit`,
    second: `2-digit`,
    hour12: false,
    timeZone: 'UTC',
};

function generateMetaData(deviceSerialNum): Promise {
    return new Promise(resolve => {
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
                        bracelet_serial_number: deviceSerialNum,
                        user_id: usernameStr,
                    },
                    device_info: {
                        deviceId: DeviceInfo.getDeviceId(),
                        model: DeviceInfo.getModel(),
                        appVersion: DeviceInfo.getReadableVersion(),
                        systemVersion: DeviceInfo.getSystemVersion(),
                        uniqueId: DeviceInfo.getUniqueId(),
                    },
                });
            }
        );
    });
}

export const FlareLoggerCategory = {
    wake: 'WAKE',
    button: 'BUTTON',
    sent: 'API_SENT',
    received: 'API_RECEIVED',
    soundDownloads: 'SOUND_RECEIVED',
};

export class FlareLogger {
    static initLogger() {
        socket = dgram.createSocket('udp4');
        socket.bind(FlareLogger.getPort());
        socket.once('listening', function() {
            socketInitialized = true;
        });
        socket.once('close', function() {
            socketInitialized = false;
            initLogger();
        });
    }

    static setLoginInfo(username) {
        usernameStr = username;
    }

    static removeLoginInfo() {
        usernameStr = '';
    }

    static toByteArray(obj) {
        var uint = new Uint8Array(obj.length);
        for (var i = 0, l = obj.length; i < l; i++) {
            uint[i] = obj.charCodeAt(i);
        }
        return new Uint8Array(uint);
    }

    static getPort() {
        return 60536; //(Math.random() * 60536) | (0 + 5000); // 60536-65536
    }

    static sendToLogManager(logObject, logType) {
        let logString;
        if (typeof logObject === 'object') {
            logString = JSON.stringify(logObject);
        } else {
            logString = logObject;
        }

        const today = new Date();
        const date = today.toLocaleString('en-US', dateOptions);
        const time = today.toLocaleString('en-US', timeOptions);
        const dateTime = `${date} ${time}`;
        const logNew = `<22>1 ${today.toISOString()} Mobile logger - - - [${dateTime}] ${logType}: ${logString}`;
        const buf = FlareLogger.toByteArray(logNew);
        socket.send(buf, 0, buf.length, remotePort, remoteHost, function(err) {
            if (err) {
                throw err;
            } else {
                console.log('message was sent');
            }
        });
    }

    static error(categoryStr, logString, optionalBraceletId) {
        const braceletId = optionalBraceletId
            ? FlareDeviceID.getJewelryLabelFromDeviceID(optionalBraceletId)
            : '';
        generateMetaData(braceletId).then(metaData => {
            const log = {
                category: categoryStr,
                log: logString,
                meta: metaData,
            };
            console.debug(log);
            FlareLogger.sendToLogManager(log, 'ERR');
        });
    }

    static warn(categoryStr, logString, optionalBraceletId) {
        const braceletId = optionalBraceletId
            ? FlareDeviceID.getJewelryLabelFromDeviceID(optionalBraceletId)
            : '';
        generateMetaData(braceletId).then(metaData => {
            const log = {
                category: categoryStr,
                log: logString,
                meta: metaData,
            };
            console.debug(log);
            FlareLogger.sendToLogManager(log, 'WARN');
        });
    }

    static debug(categoryStr, logString, optionalBraceletId) {
        const braceletId = optionalBraceletId
            ? FlareDeviceID.getJewelryLabelFromDeviceID(optionalBraceletId)
            : '';
        generateMetaData(braceletId).then(metaData => {
            const log = {
                category: categoryStr,
                log: logString,
                meta: metaData,
            };
            console.debug(log);
            FlareLogger.sendToLogManager(log, 'DEBUG');
        });
    }

    static info(categoryStr, logString, optionalBraceletId) {
        const braceletId = optionalBraceletId
            ? FlareDeviceID.getJewelryLabelFromDeviceID(optionalBraceletId)
            : '';
        generateMetaData(braceletId).then(metaData => {
            const log = {
                category: categoryStr,
                log: logString,
                meta: metaData,
            };
            console.debug(log);
            FlareLogger.sendToLogManager(log, 'INFO');
        });
    }
}
