import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/langs/en.json';
import pt from '@/locales/langs/pt.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: {
      en,
      pt
    },
    debug: false,
    lng: 'pt',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;