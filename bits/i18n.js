import i18n from 'i18next';
import Expo from 'expo';

import de from '../i18n/de';
import en from '../i18n/en';
import jp from '../i18n/jp';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
    type: 'languageDetector',
    async: true, // async detection
    detect: (cb) => {
        return Expo.Util.getCurrentLocaleAsync()
            .then(lng => { cb(lng); })
    },
    init: () => { },
    cacheUserLanguage: () => {}
};

i18n
    .use(languageDetector)
    .init({
        fallbackLng: 'en',
        // TODO: move to webpack
        resources: {
            en: en,
            de: de,
            jp: jp,
            // have a initial namespace
            ns: ['common', 'translation'],
            defaultNS: 'translation',
            interpolation: {
                escapeValue: false // not needed for react
            }
        }
    });

export default i18n;