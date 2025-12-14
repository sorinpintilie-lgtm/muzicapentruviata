export const SUPPORTED_LANGS = ['ro', 'en', 'de', 'fr', 'it', 'es', 'ar'];

// Languages that appear as URL prefixes.
// Romanian (ro) is the default site without a prefix.
export const URL_LANGS = ['en', 'de', 'fr', 'it', 'es', 'ar'];

export function isUrlLang(maybeLang) {
  return URL_LANGS.includes(maybeLang);
}

export function normalizeLang(maybeLang) {
  if (SUPPORTED_LANGS.includes(maybeLang)) return maybeLang;
  return 'ro';
}

export function getLangFromPathname(pathname) {
  const seg = (pathname || '').split('/').filter(Boolean)[0];
  if (isUrlLang(seg)) return seg;
  return 'ro';
}

export function getBasePathForLang(lang) {
  const normalized = normalizeLang(lang);
  return normalized === 'ro' ? '' : `/${normalized}`;
}

export function withLangBase(lang, to) {
  const base = getBasePathForLang(lang);
  if (typeof to === 'string') {
    if (!to.startsWith('/')) return to;
    if (base && to.startsWith(base + '/')) return to;
    if (base && to === base) return to;
    return base + to;
  }

  // Object form: { pathname, search, hash }
  if (to && typeof to === 'object') {
    const pathname = to.pathname || '/';
    return {
      ...to,
      pathname: withLangBase(lang, pathname),
    };
  }

  return to;
}

