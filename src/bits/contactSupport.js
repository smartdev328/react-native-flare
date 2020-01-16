import { Linking } from 'react-native';
import { stringify } from 'qs';

import FlareDeviceID from './FlareDeviceID';

const deviceIds = devices => {
    if (Array.isArray(devices) && devices.length > 0) {
        return devices
            .map(({ id }) => FlareDeviceID.getJewelryLabelFromDeviceID(id))
            .join(',');
    } else {
        return undefined;
    }
};

const contactSupport = (devices = []) => {
    const deviceIdString = deviceIds(devices);
    const body =
        typeof deviceIdString === 'string'
            ? `Device ID: ${deviceIdString}`
            : '';

    const args = {
        // subject: 'Subject',
        body,
    };
    return Linking.openURL(`mailto:hello@getflare.com?${stringify(args)}`);
};

export default contactSupport;
