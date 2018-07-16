import { BeaconTypes } from './BleConstants';

/**
 * JavaScript bit handling is weak. We treat the major bits that the firmware sent as a string.
 * This leads to a bunch of string comparisons and manipulations that will probably offend
 * competent firmware developers.
 */
class BleUtils {
    static getDeviceVersionAndBeaconType(majorBits) {
        const typeBits = majorBits.substring(0, 8);
        const typeNumber = parseInt(typeBits, 2);
        const versionRangeSize = 10;
        const deviceVersion =
            (typeNumber + (versionRangeSize - (typeNumber % versionRangeSize))) / versionRangeSize;
        const beaconTypeNumber = typeNumber % versionRangeSize;
        const beaconType =
            Object.keys(BeaconTypes).find(type => BeaconTypes[type].value === beaconTypeNumber);
        return {
            deviceVersion,
            beaconType,
        };
    }

    static getDeviceID(majorBits, minorBits, deviceVersion) {
        // Legacy firmware used single byte for device ID
        if (deviceVersion === 1) {
            const bits = majorBits.substring(8);
            const deviceID = parseInt(bits, 2);
            return deviceID;
        }

        const numberOfBitsToPrepend = 16 - minorBits.length;
        const paddedMinorBits = `${'0'.repeat(numberOfBitsToPrepend)}${minorBits}`;
        const bits = majorBits.substring(8) + paddedMinorBits;
        const deviceID = parseInt(bits, 2);
        return deviceID;
    }

    static getNonceFromMinorBits(minorBits) {
        const nonceBits = minorBits.substring(0, 8);
        const nonce = parseInt(nonceBits, 2);
        return nonce;
    }

    static parseBeacon(beacon) {
        const {
            uuid,
            major,
            minor,
            rssi,
            proximity,
            accuracy,
        } = beacon;

        const majorBitsUnpadded = major.toString(2);
        const numberOfBitsToPrepend = 16 - majorBitsUnpadded.length;
        const majorBits = `${'0'.repeat(numberOfBitsToPrepend)}${majorBitsUnpadded}`;
        const minorBits = minor.toString(2);
        const { deviceVersion, beaconType } = BleUtils.getDeviceVersionAndBeaconType(majorBits);
        const deviceID = BleUtils.getDeviceID(majorBits, minorBits, deviceVersion);
        const nonce = deviceVersion === 1 ? BleUtils.getNonceFromMinorBits(minorBits) : null;

        return {
            uuid,
            nonce,
            type: beaconType,
            deviceID,
            deviceVersion,
            rssi,
            proximity,
            accuracy,
            timestamp: Date.now(),
        };
    }
}

export default BleUtils;
