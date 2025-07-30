# 🚀 Vercel Deployment Guide - Kiro Luxury Furniture

## 📋 Prerequisites
- Vercel account (free)
- GitHub/GitLab/Bitbucket repository
- Firebase project configured

## 🚀 Quick Vercel Deployment

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
cd kiro-luxury-furniture
vercel --prod
```

### Method 2: GitHub Integration
1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/kiro-luxury-furniture.git
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel will auto-detect Next.js and deploy

### Method 3: Manual Upload
```bash
# Build locally
npm run build

# Deploy build folder
vercel --prod
```

## 🔧 Environment Variables Setup

### In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
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
1. In Vercel Dashboard → Settings → Domains
2. Add your domain: `kiroluxury.com`
3. Update DNS records:
   - A record: `76.76.19.61`
   - CNAME: `cname.vercel-dns.com`

### SSL Certificate
- Vercel provides automatic SSL certificates
- No additional configuration needed

## 📊 Performance Optimization

### Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1", "cdg1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

## 🔄 CI/CD with GitHub Actions

### Automatic Deployment
```yaml
# .github/workflows/vercel.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
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
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Deploy to Vercel
vercel --prod

# 4. Set environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
```

## 📈 Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Real-time traffic analytics
- Error tracking

### Custom Analytics
```bash
# Add Vercel Analytics
npm install @vercel/analytics
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

# Test with Vercel CLI
vercel dev
```

## 🎯 Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] Custom domain configured (optional)
- [ ] Firebase Storage rules updated
- [ ] Analytics configured
- [ ] SSL certificate active

## 🌟 Vercel Features

- **Automatic HTTPS** - SSL certificates
- **Global CDN** - Fast worldwide delivery
- **Edge Functions** - Serverless API routes
- **Preview Deployments** - Every PR gets a preview
- **Analytics** - Built-in performance monitoring

**Your luxury furniture website is now ready for Vercel deployment! 🚀**
