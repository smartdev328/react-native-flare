import { Linking, NativeModules } from 'react-native';

const module = NativeModules.GFSettingsUrl;

if (!module) {
    throw new Error('no settings URL module');
}

export const { getUrl } = module;

export const openSettings = async () => {
    const url = await getUrl();
    Linking.openURL(url);
};
