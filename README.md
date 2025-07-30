# 🏆 Kiro Luxury Furniture - Complete Next.js Website

A **production-ready luxury furniture website** built with Next.js 14, TypeScript, Firebase, and multi-language support.

## 🚀 Quick Start - Deploy in 30 Seconds!

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy immediately
vercel --prod
```

### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy immediately
netlify deploy --prod
```

### Option 3: GitHub → Vercel
1. **Push to GitHub** (see below)
2. **Connect to Vercel** - automatic deployment

## 📋 Features

### ✅ Complete Feature Set
- **4-Language Support**: English, Arabic, French, Darija
- **RTL Support**: Full right-to-left layout for Arabic
- **Firebase Integration**: Auth, Firestore, Storage
- **Professional Design**: Luxury furniture showcase
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, structured data
- **Performance Optimized**: Next.js 14, image optimization

### 🎯 Pages Included
- **Homepage**: Hero, featured projects, services overview
- **Projects**: Advanced filtering, search, pagination
- **Project Details**: Image galleries, specifications
- **About**: Woodmaker profile, testimonials
- **Contact**: Professional inquiry forms
- **Authentication**: Login/register system

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Internationalization**: next-intl with 4 languages
- **Forms**: React Hook Form with validation
- **Images**: Next.js Image optimization
- **Deployment**: Vercel, Netlify, Docker ready

## 🚀 GitHub Repository Setup

### Step 1: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create repository: `kiro-luxury-furniture`
3. **Don't initialize with README** (we have one)

### Step 2: Push to GitHub
```bash
# Add your repository URL
git remote add origin https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git

# Push to GitHub
git push -u origin master
```

### Step 3: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. **Environment Variables** (add these):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBgsoBvLAxLyskQ12Ljl_xHd7-zXrad4sk
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=woodapp-1f446.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=woodapp-1f446
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=woodapp-1f446.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=263629717648
   NEXT_PUBLIC_FIREBASE_APP_ID=1:263629717648:web:67a752a8add44988837c2b
   ```

## 📦 Installation & Development

### Prerequisites
- Node.js 18+
- Firebase account
- Git

### Local Development
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git
cd kiro-luxury-furniture

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌍 Environment Setup

### Firebase Configuration
Your Firebase is already configured with:
- **Project ID**: `woodapp-1f446`
- **App ID**: `1:263629717648:web:67a752a8add44988837c2b`

### Environment Variables
Create `.env.local` file:
```bash
# Copy example
cp .env.local.example .env.local

# Edit with your values
```

## 🚀 Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### 3. GitHub Actions (Automatic)
- Push to GitHub
- Connect to Vercel/Netlify
- Automatic deployment on push

## 📁 Project Structure

```
kiro-luxury-furniture/
├── src/
│   ├── app/[locale]/          # Localized routes
│   ├── components/            # Reusable components
│   ├── lib/firebase/          # Firebase configuration
│   ├── locales/               # Translation files
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
├── .env.local                 # Environment variables
└── README.md                  # This file
```

## 🎯 Quick Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
```

### Deployment
```bash
npm run docker:build # Build Docker image
npm run docker:dev   # Start with Docker
```

## 🔧 Customization

### Adding New Projects
1. Add to Firestore with structure:
```javascript
{
  title: { en: "Luxury Dining Table", ar: "طاولة طعام فاخرة" },
  description: { en: "...", ar: "..." },
  price: 2500,
  category: "dining",
  style: "modern",
  woodType: "oak",
  images: ["url1", "url2"]
}
```

### Adding New Languages
1. Add translation file in `src/locales/`
2. Update `src/i18n/config.ts`
3. Add language to navigation

## 📞 Support

For issues:
1. Check deployment guides in project root
2. Verify Firebase configuration
3. Check environment variables
4. Review Vercel/Netlify logs

## 🎉 Ready to Deploy!

Your luxury furniture website is **100% complete** and ready for deployment. Choose your preferred method:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub**: Push to GitHub and connect to Vercel/Netlify

**Go live in 30 seconds! 🚀**
