'use client';

import { useTranslations } from 'next-intl';
import { Palette, Hammer, Truck } from 'lucide-react';

const services = [
  {
    icon: Palette,
    titleKey: 'design.title',
    descriptionKey: 'design.description',
  },
  {
    icon: Hammer,
    titleKey: 'manufacturing.title',
    descriptionKey: 'manufacturing.description',
  },
  {
    icon: Truck,
    titleKey: 'installation.title',
    descriptionKey: 'installation.description',
  },
];

export function ServicesOverview() {
  const t = useTranslations('services');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(service.titleKey)}
              </h3>
              <p className="text-gray-600">
                {t(service.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
