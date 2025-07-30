# Internationalization Setup Guide

This document outlines the complete internationalization (i18n) setup for the Kiro Luxury Furniture website.

## Overview

The website supports 4 languages:
- **English** (en) - Default language
- **Arabic** (ar) - Right-to-left (RTL) support
- **French** (fr) - French translations
- **Darija** (dz) - Algerian Arabic dialect

## Technology Stack

- **next-intl**: Next.js internationalization library
- **tailwindcss-rtl**: RTL support for Tailwind CSS
- **lucide-react**: Icons library

## File Structure

```
src/
├── i18n/
│   ├── config.ts          # Language and path configuration
│   ├── middleware.ts      # Next.js middleware for routing
│   ├── request.ts         # Request configuration for translations
│   └── navigation.ts      # Navigation utilities
├── locales/
│   ├── en.json           # English translations
│   ├── ar.json           # Arabic translations
│   ├── fr.json           # French translations
│   └── dz.json           # Darija translations
└── components/
    └── ui/
        └── language-switcher.tsx  # Language selector component
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install next-intl
npm install tailwindcss-rtl
npm install lucide-react
```

### 2. Configure Next.js

The `next.config.ts` file has been updated to include next-intl plugin configuration.

### 3. Middleware Setup

The middleware in `src/middleware.ts` handles locale-based routing automatically.

### 4. Translation Files

All translation files are located in `src/locales/` and include:
- Common UI elements
- Navigation labels
- Page-specific content
- Form labels and messages

## Usage Examples

### Using Translations in Components

```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('save')}</button>
    </div>
  );
}
```

### Navigation with Locale Support

```typescript
import { Link, useRouter } from '@/i18n/navigation';

export function Navigation() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  );
}
```

### Language Switcher

The `LanguageSwitcher` component provides a dropdown to switch between languages.

## RTL Support

Arabic language automatically enables RTL layout:
- Text direction changes to right-to-left
- Layout elements are mirrored
- Navigation and spacing adjust accordingly

## URL Structure

- English: `/en/about`
- Arabic: `/ar/من-نحن`
- French: `/fr/a-propos`
- Darija: `/dz/a-propos`

## Adding New Languages

1. Add the language code to `src/i18n/config.ts`
2. Create a new translation file in `src/locales/`
3. Add localized pathnames in `src/i18n/config.ts`
4. Update the language switcher component

## Translation Management

- Use descriptive keys for translations
- Group related translations under logical namespaces
- Maintain consistency across all language files
- Test RTL layout for Arabic content

## Development Tips

- Use the language switcher to test all languages
- Check responsive design for RTL layouts
- Verify all links work correctly with locale prefixes
- Test form submissions in all languages
