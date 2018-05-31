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
}

export default BleUtils;
