import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import en from './locales/en.json';
import de from './locales/de.json';
import es from './locales/es.json';
import zhTW from './locales/zh-TW.json';

const resources = {
  en: {
    translation: en
  },
  de: {
    translation: de
  },
  es: {
    translation: es
  },
  'zh-TW': {
    translation: zhTW
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    // Language detection configuration
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      key: 'dao-yu-lang'
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
