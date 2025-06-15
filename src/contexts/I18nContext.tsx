
import React, { createContext, useContext, useEffect, useState } from 'react';
import enTranslations from '../i18n/locales/en.json';
import hiTranslations from '../i18n/locales/hi.json';

type Language = 'en' | 'hi' | 'ja' | 'zh' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, any> = {
  en: enTranslations,
  hi: hiTranslations,
  ja: {}, // Placeholder for future implementation
  zh: {}, // Placeholder for future implementation
  es: {}  // Placeholder for future implementation
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Fallback to English if translation not found
    if (!value && language !== 'en') {
      let fallbackValue = translations.en;
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
      }
      return fallbackValue || key;
    }
    
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
