import I18n, { getLanguages } from 'react-native-i18n';

import de from '../locales/de';
import en from '../locales/en';
import jp from '../locales/jp';

I18n.fallbacks = false;
I18n.translations = {
    'en': de,
    'en': en,
    'jp': jp
};
I18n.defaultLocale = 'en';

export default I18n;