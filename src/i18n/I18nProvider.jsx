import React from 'react';
import { useLocation } from 'react-router-dom';
import { getLangFromPathname, getBasePathForLang, normalizeLang, withLangBase } from './supportedLanguages.js';
import { ui } from './uiTranslations.js';

const I18nContext = React.createContext(null);

function createT(lang) {
  const normalized = normalizeLang(lang);
  const dict = ui[normalized] || ui.ro;
  const fallback = ui.ro;
  return (key) => dict[key] ?? fallback[key] ?? key;
}

export function I18nProvider({ children }) {
  const location = useLocation();
  const lang = getLangFromPathname(location.pathname);
  const basePath = getBasePathForLang(lang);

  const t = React.useMemo(() => createT(lang), [lang]);

  React.useEffect(() => {
    // <html lang=".." dir="..">
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = React.useMemo(
    () => ({
      lang,
      basePath,
      t,
      withBase: (to) => withLangBase(lang, to),
    }),
    [lang, basePath, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

