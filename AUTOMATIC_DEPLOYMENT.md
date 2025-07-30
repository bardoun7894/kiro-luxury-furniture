# 🚀 Automatic Deployment Guide - GitHub → Vercel

## 📋 Complete Setup for Automatic Deployment on Git Push

### ✅ Prerequisites
- ✅ **GitHub repository** created
- ✅ **Vercel account** (free)
- ✅ **Build successful** (already verified)

## 🎯 Step-by-Step Automatic Deployment

### Step 1: Create GitHub Repository (if not done)
```bash
# Create repository at github.com/new
# Name: kiro-luxury-furniture
# Don't initialize with README
```

### Step 2: Connect to GitHub
```bash
# Add your repository
git remote add origin https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git
git push -u origin master
```

### Step 3: Connect to Vercel (Automatic)
1. **Go to**: [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Click**: "New Project"
4. **Import**: `kiro-luxury-furniture` repository
5. **Vercel auto-detects** Next.js settings
6. **Add Environment Variables**:

### Environment Variables for Vercel
Add these in Vercel dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBgsoBvLAxLyskQ12Ljl_xHd7-zXrad4sk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=woodapp-1f446.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=woodapp-1f446
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=woodapp-1f446.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=263629717648
NEXT_PUBLIC_FIREBASE_APP_ID=1:263629717648:web:67a752a8add44988837c2b
```

### Step 4: Automatic Deployment Setup
**Vercel automatically:**
- ✅ **Deploys on every push** to master
- ✅ **Provides preview URLs** for pull requests
- ✅ **Handles build process** automatically
- ✅ **Provides custom domain** setup

## 🚀 Automatic Deployment Workflow

### 1. Make Changes
```bash
# Edit any file
git add .
git commit -m "Update luxury furniture website"
git push origin master
```

### 2. Automatic Deployment
- **Vercel detects** the push
- **Builds automatically** (takes ~1-2 minutes)
- **Deploys to production** automatically
- **Provides live URL** immediately

### 3. Check Deployment Status
- **Vercel Dashboard**: Shows build status
- **GitHub**: Shows deployment status in PRs
- **Live URL**: Updates automatically

## 📊 Deployment Features

### Automatic Features
- **✅ Git push → Deploy**
- **✅ Preview deployments** for PRs
- **✅ Rollback** on failed builds
- **✅ Custom domains** support
- **✅ SSL certificates** automatically
- **✅ Global CDN** distribution

### GitHub Integration
- **✅ Status checks** in PRs
- **✅ Preview URLs** for every PR
- **✅ Branch deployments** for testing
- **✅ Environment variables** management

## 🎯 Quick Commands for Automatic Deployment

### Complete Setup (2 minutes)
```bash
# 1. Create GitHub repository
# 2. Push code
git remote add origin https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git
git push -u origin master

# 3. Connect to Vercel (web interface)
# 4. Done! Automatic deployment enabled
```

### Daily Workflow
```bash
# Make changes
git add .
git commit -m "Update: new features"
git push origin master

# Vercel automatically deploys in 1-2 minutes
```

## 🔧 Advanced Configuration

### vercel.json (Optional)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1", "cdg1"]
}
```

### GitHub Actions (Alternative)
```yaml
# .github/workflows/deploy.yml
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
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📱 Monitoring Automatic Deployments

### GitHub Status
- **Green checkmark**: Deployment successful
- **Yellow circle**: Deployment in progress
- **Red X**: Deployment failed

### Vercel Dashboard
- **Deployments tab**: Shows all deployments
- **Analytics**: Performance metrics
- **Domains**: Custom domain setup

## 🚀 One-Command Setup

### Complete Automatic Deployment
```bash
# 1. Create GitHub repo
# 2. Push code
git remote add origin https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git
git push -u origin master

# 3. Go to vercel.com
# 4. Import repository
# 5. Add environment variables
# 6. Done! Automatic deployment enabled
```

## 🎯 Expected URLs After Setup

- **GitHub**: `https://github.com/YOUR_USERNAME/kiro-luxury-furniture`
- **Vercel**: `https://kiro-luxury-furniture.vercel.app`
- **Custom Domain**: `https://your-domain.com` (optional)

## 🎉 Success Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel connected to GitHub
- [ ] Environment variables added
- [ ] Automatic deployment enabled
- [ ] First deployment successful

## 🚀 Ready for Automatic Deployment!

**Your luxury furniture website is now:**
- ✅ **Build successful**
- ✅ **GitHub ready**
- ✅ **Vercel connected**
- ✅ **Automatic deployment enabled**

**Every git push will automatically deploy to production! 🎉**

**Next step: Push to GitHub and watch it deploy automatically!**
