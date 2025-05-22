import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// importar os arquivos de tradução
import en from './locales/en.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import es from './locales/es.json';


const supportedLanguages = ['en', 'pt', 'fr', 'es'];
const browserLang = navigator.language.slice(0, 2);
const initialLang = supportedLanguages.includes(browserLang) ? browserLang : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      fr: { translation: fr },
      es: { translation: es },
    },
    lng: initialLang, // idioma padrão
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;