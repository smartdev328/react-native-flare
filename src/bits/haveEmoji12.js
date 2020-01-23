import { Platform } from 'react-native';

const haveEmoji12 = () => {
    switch (Platform.OS) {
        case 'ios': {
            const components = Platform.Version.split('.').map(v =>
                parseInt(v, 10)
            );
            return (
                components[0] > 13 ||
                (components[0] === 13 && components[1] >= 2)
            );
        }
        case 'android':
            return Platform.Version >= 29;
        default:
            return false;
    }
};

export default haveEmoji12;
