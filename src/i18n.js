import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// importar os arquivos de tradução
import en from './locales/en.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import zh from './locales/zh.json';

const supportedLanguages = ['en', 'pt', 'fr', 'es',"ja","ko","zh"];
const STORAGE_KEY = 'lang';

// order: saved choice, then browser language, then English
function readSavedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return supportedLanguages.includes(saved) ? saved : null;
  } catch {
    return null; // storage blocked (private mode, etc.)
  }
}

const browserLang = navigator.language.slice(0, 2);
const initialLang =
  readSavedLang() ?? (supportedLanguages.includes(browserLang) ? browserLang : 'en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      fr: { translation: fr },
      es: { translation: es },
      ja: { translation: ja },
      ko: { translation: ko },
      zh: { translation: zh },
    },
    lng: initialLang, // idioma padrão
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// keep <html lang> in sync with the UI language (screen readers, translation prompts, SEO)
document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// call this for a user-picked language: switches the UI and remembers the choice.
// (Not done in the languageChanged event, so an auto-detected language is never saved as a "choice".)
export function chooseLanguage(lng) {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore: choice just won't persist
  }
  return i18n.changeLanguage(lng);
}

export default i18n;