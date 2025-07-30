import { WoodmakerProfile } from '@/components/about/woodmaker-profile';
import { InquiryForm } from '@/components/inquiry/inquiry-form';
import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <div>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 text-center mt-4 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
      </div>

      <WoodmakerProfile />
      
      <div className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t('contactUs')}
          </h2>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
