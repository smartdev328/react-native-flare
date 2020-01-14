import { Share } from 'react-native';

const shareFlare = async () => {
    try {
        await Share.share({
            message: 'Get Flare, it’s great!',
            url: 'https://getflare.com/',
        });
    } catch (e) {
        console.error(e);
    }
};

export default shareFlare;
