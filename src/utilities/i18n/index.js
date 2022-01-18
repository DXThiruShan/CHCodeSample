import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';


import en from './locales/en';
import fr from './locales/fr';

const locales = RNLocalize.getLocales();
if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.translations = {
  default: en,
  'en-US': en,
  en,
  fr
};

I18n.fallbacks = true;
export default I18n;
