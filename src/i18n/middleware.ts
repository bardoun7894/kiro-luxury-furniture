import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix, pathnames } from './config';

export default createMiddleware({
  locales,
  localePrefix,
  pathnames,
  defaultLocale: 'en',
});

export const config = {
  matcher: [
    '/',
    '/(en|ar|fr|dz)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
