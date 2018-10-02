import Strings from '../locales/en';

const imageCuffV2 = require('../assets/cuff-v2.png');

export const DeviceImages = {
    cuffV2: imageCuffV2,
};

export const DeviceTypes = [
    {
        name: Strings.jewelry.cuffV1.name,
        image: DeviceImages.cuffV2,
    },
    {
        name: Strings.jewelry.cuffV2.name,
        image: DeviceImages.cuffV2,
    },
];
