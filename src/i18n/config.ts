export const locales = ['en', 'ar', 'fr', 'dz'] as const;
export type Locale = typeof locales[number];

export const localePrefix = 'always';

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    ar: '/من-نحن',
    fr: '/a-propos',
    dz: '/a-propos',
  },
  '/projects': {
    en: '/projects',
    ar: '/المشاريع',
    fr: '/projets',
    dz: '/projets',
  },
  '/contact': {
    en: '/contact',
    ar: '/اتصل-بنا',
    fr: '/contact',
    dz: '/contact',
  },
  '/dashboard': {
    en: '/dashboard',
    ar: '/لوحة-التحكم',
    fr: '/tableau-de-bord',
    dz: '/tableau-de-bord',
  },
} as const;
