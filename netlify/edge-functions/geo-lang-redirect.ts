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

export default async (request: Request, context: EdgeContext) => {
  const url = new URL(request.url);
  const { pathname } = url;

  // If user is already on a language-prefixed path, do nothing.
  if (hasLangPrefix(pathname)) return context.next();
  // Don't redirect static assets / Netlify internals.
  if (isStaticAsset(pathname)) return context.next();

  const country = context.geo?.country?.code;
  if (!country) return context.next();

  const lang = mapCountryToLang(country);
  if (lang === 'ro') return context.next();

  const target = new URL(request.url);
  target.pathname = pathname === '/' ? `/${lang}` : `/${lang}${pathname}`;
  return Response.redirect(target.toString(), 302);
};

