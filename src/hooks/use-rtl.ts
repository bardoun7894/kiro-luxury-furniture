'use client';

import { useLocale } from 'next-intl';

export function useRTL() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return {
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
  };
}
