import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en';
import ru from './locales/ru';

const resources = {
  ru: { translation: ru },
  en: { translation: en }
};


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources,

    interpolation: {
      escapeValue: false,
    }
  });


export default i18n;