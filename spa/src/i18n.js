import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationENG from './locales/en/translation.json';
import translationSP from './locales/sp/translation.json';
import translationPTBR from './locales/pt_BR/translation.json';

const resources = {
  pt_BR: {
    translation: translationPTBR,
  },
  sp: {
    translation: translationSP,
  },
  eng: {
    translation: translationENG,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt_BR',
    fallbackLng: 'pt_BR',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
