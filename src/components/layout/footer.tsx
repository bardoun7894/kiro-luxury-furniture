'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('navigation');

  const quickLinks = [
    { href: '/', label: nav('home') },
    { href: '/about', label: nav('about') },
    { href: '/projects', label: nav('projects') },
    { href: '/contact', label: nav('contact') },
  ];

  const services = [
    'Custom Design',
    'Traditional Craftsmanship',
    'Modern Manufacturing',
    'Restoration Services',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kiro Luxury Furniture</h3>
            <p className="text-gray-300 text-sm mb-4">{t('description')}</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/kiroluxury"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/kiro_luxury"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-gray-300 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail size={16} className="text-gray-400 mt-0.5" />
                <span className="text-gray-300 text-sm">contact@kiro-luxury.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={16} className="text-gray-400 mt-0.5" />
                <span className="text-gray-300 text-sm">+212 600 000 000</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-gray-400 mt-0.5" />
                <span className="text-gray-300 text-sm">123 Artisan Street, Marrakech</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock size={16} className="text-gray-400 mt-0.5" />
                <span className="text-gray-300 text-sm">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Kiro Luxury Furniture. {t('rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
