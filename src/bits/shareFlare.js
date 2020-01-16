import { Share } from 'react-native';

const message =
    "Here's $50 off your first Flare bracelet to celebrate the company's launch! Use my link to purchase and join the movement.";

const shareFlare = async referralKey => {
    const url =
        typeof referralKey === 'string' && referralKey.length > 0
            ? `http://getflare.com/discount/${referralKey}`
            : 'https://getflare.com/';

    try {
        await Share.share({ message, url });
    } catch (e) {
        console.error(e);
    }
};

export default shareFlare;
