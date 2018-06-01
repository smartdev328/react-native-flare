import { BeaconTypes } from './BleConstants';

/**
 * JavaScript bit handling is weak. We treat the major bits that the firmware sent as a string.
 * This leads to a bunch of string comparisons and manipulations that will probably offend
 * competent firmware developers.
 */
class BleUtils {
    static getBeaconTypeFromMajorBits(majorBits) {
        const typeBits = majorBits.substring(6, 8);
        const beaconType = Object.keys(BeaconTypes).find(type => BeaconTypes[type].bits === typeBits);
        return beaconType;
    }

    static getDeviceIDFromMajorBits(majorBits) {
        const typeBits = majorBits.substring(8);
        const deviceID = parseInt(typeBits, 2);
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

        const majorBits = major.toString(2).padStart(16, '0');
        const type = BleUtils.getBeaconTypeFromMajorBits(majorBits);
        const deviceID = BleUtils.getDeviceIDFromMajorBits(majorBits);

        const minorBits = minor.toString(2);
        const nonce = BleUtils.getNonceFromMinorBits(minorBits);

        return {
            uuid,
            nonce,
            type,
            deviceID,
            rssi,
            proximity,
            accuracy,
            timestamp: Date.now(),
        };
    }
}

export default BleUtils;
