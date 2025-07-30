# 🚀 Netlify Deployment Guide - Kiro Luxury Furniture

## 📋 Prerequisites
- Netlify account (free)
- GitHub/GitLab/Bitbucket repository
- Firebase project configured

## 🚀 Quick Netlify Deployment

### Method 1: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy from project directory
cd kiro-luxury-furniture
netlify deploy --prod
```

### Method 2: GitHub Integration (Recommended)
1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/kiro-luxury-furniture.git
git push -u origin main
```

2. **Connect to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "New site from Git"
- Connect your GitHub repository
- Netlify will auto-detect Next.js and deploy

### Method 3: Drag & Drop
1. Build locally: `npm run build`
2. Drag the `.next` folder to Netlify

## 🔧 Environment Variables Setup

### In Netlify Dashboard:
1. Go to Site Settings → Environment Variables
2. Add these variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBgsoBvLAxLyskQ12Ljl_xHd7-zXrad4sk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=woodapp-1f446.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=woodapp-1f446
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=woodapp-1f446.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=263629717648
NEXT_PUBLIC_FIREBASE_APP_ID=1:263629717648:web:67a752a8add44988837c2b
```

## 🌐 Custom Domain Setup

### Add Custom Domain
1. In Netlify Dashboard → Domain Management
2. Add your domain: `kiroluxury.com`
3. Update DNS records:
   - A record: `75.2.60.5`
   - CNAME: `your-site-name.netlify.app`

### SSL Certificate
- Netlify provides automatic SSL certificates
- No additional configuration needed

## 📊 Netlify Configuration

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[context.production.environment]
  NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyBgsoBvLAxLyskQ12Ljl_xHd7-zXrad4sk"
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "woodapp-1f446.firebaseapp.com"
  NEXT_PUBLIC_FIREBASE_PROJECT_ID = "woodapp-1f446"
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "woodapp-1f446.appspot.com"
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "263629717648"
  NEXT_PUBLIC_FIREBASE_APP_ID = "1:263629717648:web:67a752a8add44988837c2b"
```

## 🔄 CI/CD with GitHub Actions

### Automatic Deployment
```yaml
# .github/workflows/netlify.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=.next
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🚀 Quick Start Commands

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Deploy to Netlify
netlify deploy --prod

# 4. Set environment variables
netlify env:set NEXT_PUBLIC_FIREBASE_API_KEY AIzaSyBgsoBvLAxLyskQ12Ljl_xHd7-zXrad4sk
```

## 📈 Performance Optimization

### Netlify Features
- **Edge Functions** - Serverless functions at edge
- **Image Optimization** - Automatic image optimization
- **Forms** - Built-in form handling
- **Split Testing** - A/B testing capabilities

### Next.js Plugin
```bash
# Install Netlify Next.js plugin
npm install --save-dev @netlify/plugin-nextjs
```

## 🛠️ Troubleshooting

### Common Issues
1. **Build fails**: Check environment variables
2. **Images not loading**: Verify Firebase Storage rules
3. **Locale issues**: Ensure i18n configuration

### Debug Commands
```bash
# Check build locally
npm run build

# Test with Netlify CLI
netlify dev
```

## 🎯 Production Checklist

- [ ] Environment variables configured in Netlify
- [ ] Custom domain configured (optional)
- [ ] Firebase Storage rules updated
- [ ] Analytics configured
- [ ] SSL certificate active

## 🌟 Netlify Features

- **Automatic HTTPS** - SSL certificates
- **Global CDN** - Fast worldwide delivery
- **Forms** - Built-in form handling
- **Split Testing** - A/B testing
- **Edge Functions** - Serverless functions
- **Analytics** - Built-in performance monitoring

## 🚀 Deploy with Netlify Button

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/kiro-luxury-furniture)

**Your luxury furniture website is now ready for Netlify deployment! 🚀**
