'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Star, MapPin, Clock, Mail, Phone } from 'lucide-react';
import { WoodmakerProfile as WoodmakerProfileType } from '@/types';
import { woodmakerProfileService } from '@/lib/firebase/collections';

export function WoodmakerProfile() {
  const t = useTranslations('about');
  const [profile, setProfile] = useState<WoodmakerProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profileData = await woodmakerProfileService.getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('profileNotFound')}</p>
      </div>
    );
  }

  const getLocalizedContent = (content: any) => {
    return content.en; // Simplified for demo - would use locale
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getLocalizedContent(profile.name)}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {getLocalizedContent(profile.bio)}
          </p>

          <div className="prose prose-lg text-gray-700 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('philosophy')}
            </h2>
            <p>{getLocalizedContent(profile.philosophy)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('experience')}
              </h3>
              <p className="text-gray-600">
                {profile.experience} {t('yearsExperience')}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('specialties')}
              </h3>
              <ul className="space-y-1">
                {profile.specialties?.map((specialty, index) => (
                  <li key={index} className="text-gray-600">
                    • {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t('certifications')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.certifications?.map((cert, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Workshop */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('contactInfo')}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-amber-600 mr-3" />
                <span className="text-gray-700">{profile.contact.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-amber-600 mr-3" />
                <span className="text-gray-700">{profile.contact.phone}</span>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
                <span className="text-gray-700">
                  {getLocalizedContent(profile.contact.address)}
                </span>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
                <span className="text-gray-700">
                  {getLocalizedContent(profile.contact.workingHours)}
                </span>
              </div>
            </div>
          </div>

          {/* Workshop Images */}
          {profile.workshopImages && profile.workshopImages.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('workshop')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {profile.workshopImages.map((image, index) => (
                  <div key={index} className="aspect-square relative rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`Workshop ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Testimonials */}
      {profile.testimonials && profile.testimonials.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('testimonials')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4">
                  {getLocalizedContent(testimonial.content)}
                </p>
                
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.clientName}</p>
                  {testimonial.project && (
                    <p className="text-sm text-gray-600">{testimonial.project}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
