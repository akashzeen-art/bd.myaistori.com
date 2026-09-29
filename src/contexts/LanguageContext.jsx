import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const SUPPORTED_LANGUAGES = ['EN', 'BN'];
const DEFAULT_LANGUAGE = 'BN';
const STORAGE_KEY = 'siteLanguage';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED_LANGUAGES.includes(savedLang)) return savedLang;
    } catch (e) {
      // localStorage not available
    }
    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const changeLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguage(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        // localStorage not available
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
