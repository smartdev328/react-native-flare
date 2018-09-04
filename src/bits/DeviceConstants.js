import Strings from '../locales/en';

const imageCuffV1 = require('../assets/cuff_v1.png');

export const DeviceImages = {
    cuffV1: imageCuffV1,
};

export const DeviceTypes = [
    {
        name: Strings.jewelry.cuffV1.name,
        image: DeviceImages.cuffV1,
    },
    {
        name: Strings.jewelry.cuffV2.name,
        image: DeviceImages.cuffV1,
    },
];
