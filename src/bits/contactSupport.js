import { Linking } from 'react-native';
import { stringify } from 'qs';

import FlareDeviceID from './FlareDeviceID';

const FLARE_EMAIL = 'help@getflare.com';

const deviceIds = devices => {
    if (Array.isArray(devices) && devices.length > 0) {
        return devices
            .map(({ id }) => FlareDeviceID.getJewelryLabelFromDeviceID(id))
            .join(', ');
    } else {
        return undefined;
    }
};

const contactSupport = async (devices = []) => {
    const deviceIdString = deviceIds(devices);
    const body =
        typeof deviceIdString === 'string'
            ? `Device ID: ${deviceIdString}`
            : '';

    const args = {
        // subject: 'Subject',
        body,
    };
    const gmailUrl = `googlegmail://co?${stringify({
        ...args,
        to: FLARE_EMAIL,
    })}`;
    const canGmail = await Linking.canOpenURL(gmailUrl);
    return Linking.openURL(
        canGmail ? gmailUrl : `mailto:${FLARE_EMAIL}?${stringify(args)}`
    );
};

export default contactSupport;
