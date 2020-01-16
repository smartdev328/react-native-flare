import { Linking, NativeModules } from 'react-native';

const module = NativeModules.GFSettingsUrl;

if (!module) {
    throw new Error('no settings URL module');
}

export const { getUrl, getContactsOrder } = module;

export const openSettings = async () => {
    const url = await getUrl();
    return Linking.openURL(url);
};
