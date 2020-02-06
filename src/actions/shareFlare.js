import { Share } from 'react-native';
import { USER_DID_SHARE, USER_WILL_SHARE } from './actionTypes';

const message =
    "Here's $50 off your first Flare bracelet to celebrate the company's launch! Use my link to purchase and join the movement.";

export const shareFlare = referralKey => async dispatch => {
    const url =
        typeof referralKey === 'string' && referralKey.length > 0
            ? `http://getflare.com/discount/${referralKey}`
            : 'https://getflare.com/';

    try {
        dispatch({ type: USER_WILL_SHARE });
        const result = await Share.share({ message, url });
        dispatch({ type: USER_DID_SHARE, result });
    } catch (e) {
        console.error(e);
    }
};
