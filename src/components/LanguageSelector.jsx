import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { SUPPORTED_LANGS, getBasePathForLang } from '../i18n/supportedLanguages.js';

const LANGUAGE_FLAGS = {
  ro: '🇷🇴',
  en: '🇺🇸',
  de: '🇩🇪',
  fr: '🇫🇷',
  it: '🇮🇹',
  es: '🇪🇸',
  ar: '🇸🇦',
};

const LANGUAGE_NAMES = {
  ro: 'Română',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  ar: 'العربية',
};

function LanguageSelector() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLanguageChange = (newLang) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;
    const currentHash = location.hash;

    // Remove current language prefix if it exists
    const pathWithoutLang = currentPath.replace(/^\/(en|de|fr|it|es|ar)/, '') || '/';

    // Add new language prefix if not Romanian
    const newPath = getBasePathForLang(newLang) + pathWithoutLang;

    // Navigate to new path
    navigate(newPath + currentSearch + currentHash, { replace: true });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="language-selector">
      <button
        className="language-selector-button"
        onClick={toggleDropdown}
        aria-label="Select language"
        title="Change language"
      >
        <span className="language-flag">{LANGUAGE_FLAGS[lang]}</span>
        <span className="language-code">{lang.toUpperCase()}</span>
        <span className="language-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {SUPPORTED_LANGS.map((langCode) => (
            <button
              key={langCode}
              className={`language-option ${langCode === lang ? 'active' : ''}`}
              onClick={() => handleLanguageChange(langCode)}
              title={LANGUAGE_NAMES[langCode]}
            >
              <span className="language-flag">{LANGUAGE_FLAGS[langCode]}</span>
              <span className="language-name">{LANGUAGE_NAMES[langCode]}</span>
              <span className="language-code-small">({langCode.toUpperCase()})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;