type EdgeContext = {
  geo?: {
    country?: { code?: string };
  };
  next: () => Response | Promise<Response>;
};

const LANG_PREFIXES = ['en', 'de', 'fr', 'it', 'es', 'ar'] as const;

// Broad MENA list (adjust anytime).
const AR_COUNTRIES = new Set([
  'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'YE',
  'JO', 'LB', 'SY', 'IQ', 'IR', 'IL', 'PS',
  'TR', 'EG',
]);

// Very simple region-to-currency mapping.
// - RO  -> RON
// - EU* -> EUR
// - rest of world -> USD
// (*approximate list of European countries; can be adjusted anytime.)
const EU_COUNTRIES = new Set([
  'AT','BE','BG','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB','GR','HR','HU',
  'IE','IS','IT','LI','LT','LU','LV','MT','NL','NO','PL','PT','RO','SE','SI','SK'
]);

function hasLangPrefix(pathname: string) {
  return LANG_PREFIXES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

function isStaticAsset(pathname: string) {
  if (pathname.startsWith('/.netlify/')) return true;
  if (pathname.startsWith('/assets/')) return true;
  if (pathname.startsWith('/favicon')) return true;
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') return true;
  // Any file with an extension at the end (png, jpg, js, css, etc)
  return /\.[a-z0-9]+$/i.test(pathname);
}

function mapCountryToLang(countryCode: string) {
  const cc = (countryCode || '').toUpperCase();

  if (cc === 'RO') return 'ro';
  if (cc === 'DE' || cc === 'AT') return 'de';
  if (cc === 'FR') return 'fr';
  if (cc === 'IT') return 'it';
  if (cc === 'ES') return 'es';
  if (AR_COUNTRIES.has(cc)) return 'ar';
  return 'en';
}

function mapCountryToCurrency(countryCode: string | undefined) {
  const cc = (countryCode || '').toUpperCase();
  if (!cc) return undefined;
  if (cc === 'RO') return 'RON';
  if (EU_COUNTRIES.has(cc)) return 'EUR';
  return 'USD';
}

function appendCurrencyCookie(response: Response, currency: string | undefined) {
  if (!currency) return response;
  const cookieValue = `mpv_currency=${currency}; Path=/; Max-Age=604800; SameSite=Lax`;
  const existing = response.headers.get('set-cookie');
  if (existing) {
    response.headers.set('set-cookie', `${existing}, ${cookieValue}`);
  } else {
    response.headers.set('set-cookie', cookieValue);
  }
  return response;
}

export default async (request: Request, context: EdgeContext) => {
  const url = new URL(request.url);
  const { pathname } = url;

   // Don't redirect static assets / Netlify internals.
  if (isStaticAsset(pathname)) {
    return context.next();
  }

  const country = context.geo?.country?.code;
  const currency = mapCountryToCurrency(country);

  // If we don't know the country, just continue.
  if (!country) {
    const res = await context.next();
    return appendCurrencyCookie(res, undefined);
  }

  const lang = mapCountryToLang(country);

  // If user is already on a language-prefixed path, or is in RO (default lang),
  // don't redirect but still attach the currency cookie.
  if (hasLangPrefix(pathname) || lang === 'ro') {
    const res = await context.next();
    return appendCurrencyCookie(res, currency);
  }

  const target = new URL(request.url);
  target.pathname = pathname === '/' ? `/${lang}` : `/${lang}${pathname}`;
  const redirect = Response.redirect(target.toString(), 302);
  return appendCurrencyCookie(redirect, currency);
};

