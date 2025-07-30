'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone } from 'lucide-react';

export function CTASection() {
  const t = useTranslations('contact');

  return (
    <section className="py-16 bg-amber-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Mail className="mr-2" size={20} />
            {t('form.submit')}
          </Link>
          
          <a
            href="tel:+212600000000"
            className="inline-flex items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
          >
            <Phone className="mr-2" size={20} />
            +212 600 000 000
          </a>
        </div>
      </div>
    </section>
  );
}
