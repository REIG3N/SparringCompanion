import { I18n } from 'i18n-js';
import * as ExpoLocalization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';

// Import translation JSON (will be created below)
// FR
import frCommon from '../locales/fr/common.json';
import frDashboard from '../locales/fr/dashboard.json';
import frSession from '../locales/fr/session.json';
import frSettings from '../locales/fr/settings.json';
import frAbout from '../locales/fr/about.json';
import frAuth from '../locales/fr/auth.json';
// EN
import enCommon from '../locales/en/common.json';
import enDashboard from '../locales/en/dashboard.json';
import enSession from '../locales/en/session.json';
import enSettings from '../locales/en/settings.json';
import enAbout from '../locales/en/about.json';
import enAuth from '../locales/en/auth.json';

const i18n = new I18n({
  fr: { common: frCommon, dashboard: frDashboard, session: frSession, settings: frSettings, about: frAbout, auth: frAuth },
  en: { common: enCommon, dashboard: enDashboard, session: enSession, settings: enSettings, about: enAbout, auth: enAuth },
});

i18n.enableFallback = true;
i18n.locale = (ExpoLocalization.getLocales && ExpoLocalization.getLocales()[0]?.languageTag) || (ExpoLocalization as any).locale || 'en';

export const initI18n = async () => {
  try {
    const saved = await AsyncStorage.getItem('@language');
    if (saved) {
      i18n.locale = saved;
      return;
    }
    const deviceTag = (ExpoLocalization.getLocales && ExpoLocalization.getLocales()[0]?.languageTag) || (ExpoLocalization as any).locale || 'en';
    const deviceLang = deviceTag.split('-')[0];
    i18n.locale = ['fr', 'en'].includes(deviceLang) ? deviceLang : 'en';
  } catch (e) {
    // fallback
    i18n.locale = 'en';
  }
};

export const changeLanguage = async (language: 'fr' | 'en') => {
  i18n.locale = language;
  try {
    await AsyncStorage.setItem('@language', language);
  } catch {}
};

export const getCurrentLanguage = () => (i18n.locale || 'en').split('-')[0];

export default i18n;

// Lightweight language context to force global re-render on language change

type LanguageContextValue = {
  language: string;
  updateLanguage: (lang: 'fr' | 'en') => Promise<void>;
};

const LanguageContext = React.createContext<LanguageContextValue>({
  language: getCurrentLanguage(),
  updateLanguage: async () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>(getCurrentLanguage());

  const updateLanguage = React.useCallback(async (lang: 'fr' | 'en') => {
    await changeLanguage(lang);
    setLanguage(lang);
  }, []);

  return React.createElement(LanguageContext.Provider, { value: { language, updateLanguage } }, children);
};

export const useLanguage = () => React.useContext(LanguageContext);


