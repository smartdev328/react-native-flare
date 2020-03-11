import { Timber } from '@timberio/node';
import DeviceInfo from 'react-native-device-info';

const apiKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS50aW1iZXIuaW8vIiwiZXhwIjpudWxsLCJpYXQiOjE1ODM4NTEzMjYsImlzcyI6Imh0dHBzOi8vYXBpLnRpbWJlci5pby9hcGlfa2V5cyIsInByb3ZpZGVyX2NsYWltcyI6eyJhcGlfa2V5X2lkIjo2ODUzLCJ1c2VyX2lkIjoiYXBpX2tleXw2ODUzIn0sInN1YiI6ImFwaV9rZXl8Njg1MyJ9.fZ3YCnCQ8v3_yTQvNe9WaT0DRkEfFxyY07Pe6YgjSII';
const sourceId = '34447';
let logger;

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

    static setLoginInfo(username) {
        logger.use(FlareLogger.addCurrentUser(username));
    }

    static removeLoginInfo() {
        logger.remove(FlareLogger.addCurrentUser);
    }

    static error(logString) {
        logger.error(logString);
    }

    static warn(logString) {
        logger.warn(logString);
    }

    static debug(logString) {
        logger.debug(logString);
    }

    static info(logString) {
        logger.info(logString);
    }
}
