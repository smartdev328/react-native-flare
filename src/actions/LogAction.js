import { Timber } from '@timberio/node';
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

const apiKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS50aW1iZXIuaW8vIiwiZXhwIjpudWxsLCJpYXQiOjE1ODM4NTEzMjYsImlzcyI6Imh0dHBzOi8vYXBpLnRpbWJlci5pby9hcGlfa2V5cyIsInByb3ZpZGVyX2NsYWltcyI6eyJhcGlfa2V5X2lkIjo2ODUzLCJ1c2VyX2lkIjoiYXBpX2tleXw2ODUzIn0sInN1YiI6ImFwaV9rZXl8Njg1MyJ9.fZ3YCnCQ8v3_yTQvNe9WaT0DRkEfFxyY07Pe6YgjSII';
const sourceId = '34447';
let logger;
let usernameStr = '';

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

    static randomPort() {
        return (Math.random() * 60536) | (0 + 5000); // 60536-65536
    }

    static sendToLogManager(logObject, logType) {
        let logString;
        if (typeof logObject === 'object') {
            logString = JSON.stringify(logObject);
        } else {
            logString = logObject;
        }

        var today = new Date();
        var dateOptions = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        };
        var timeOptions = {
            hour: `2-digit`,
            minute: `2-digit`,
            second: `2-digit`,
            hour12: false,
            timeZone: 'UTC',
        };
        const date = today.toLocaleString('en-US', dateOptions);
        const time = today.toLocaleString('en-US', timeOptions);
        const dateTime = `${date} ${time}`;
        const logNew = `<22>1 ${today.toISOString()} Mobile logger - - - [${dateTime}] ${logType}: ${logString}`;

        const remoteHost = `logs6.papertrailapp.com`;
        const remotePort = 14765;
        var dgram = require('react-native-udp');
        var socket = dgram.createSocket('udp4');
        socket.bind(FlareLogger.randomPort());
        socket.once('listening', function() {
            const buf = FlareLogger.toByteArray(logNew);
            socket.send(buf, 0, buf.length, remotePort, remoteHost, function(
                err
            ) {
                if (err) throw err;
                console.log('message was sent');
            });
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
            logger.error(log);
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
            logger.warn(log);
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
            logger.debug(log);
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
            logger.info(log);
            FlareLogger.sendToLogManager(log, 'INFO');
        });
    }
}
