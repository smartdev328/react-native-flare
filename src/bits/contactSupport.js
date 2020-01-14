import { Linking } from 'react-native';
import { stringify } from 'qs';

const contactSupport = () => {
    const args = {
        // subject: 'Subject',
        // body: 'This is the prefilled body.',
    };
    Linking.openURL(`mailto:hello@getflare.com?${stringify(args)}`);
};

export default contactSupport;
