import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { Regions } from './BleConstants';
import BleUtils from './BleUtils';

export default class BleManager {
    constructor(options) {
        this.beaconsDidRange = null;
        this.regionDidEnterEvent = null;
        if (options) {
            this.onBeaconDetected = options.onBeaconDetected;
        }
    }

    static startListening(options) {
        Beacons.detectIBeacons();

        Regions.forEach((region) => {
            Beacons.startMonitoringForRegion(region);
            Beacons.startRangingBeaconsInRegion(region);
        });

        this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
            const numBeacons = data.beacons.length;
            if (numBeacons > 0) {
                const lastBeacon = data.beacons[numBeacons - 1];
                const uuid = lastBeacon.uuid.substring(0, 7);
                const { major, minor, rssi, proximity, accuracy } = lastBeacon;

                const majorBits = major.toString(2).padStart(16, '0');
                const beaconType = BleUtils.getBeaconTypeFromMajorBits(majorBits);
                const deviceID = BleUtils.getDeviceIDFromMajorBits(majorBits);

                const minorBits = minor.toString(2);
                const nonce = BleUtils.getNonceFromMinorBits(minorBits);

                console.log(`Beacon type ${beaconType} from device ${deviceID} with nonce ${nonce}`);

                if (options && options.onBeaconDetected) {
                    options.onBeaconDetected({
                        uuid,
                        nonce,
                        type: beaconType,
                        deviceID,
                        rssi,
                        proximity,
                        accuracy,
                        timestamp: Date.now(),
                    });
                }
            }
        });

        this.regionDidEnterEvent = DeviceEventEmitter.addListener(
            'regionDidEnter',
            (data) => {
                console.log('monitoring - regionDidEnter data: ', data);
            },
        );
    }
}
