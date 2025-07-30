# 🚀 GitHub Repository Setup Guide - Kiro Luxury Furniture

## 📋 Complete GitHub Setup for Vercel Deployment

### ✅ Current Status
- ✅ **Git initialized** in project directory
- ✅ **All files committed** to local repository
- ✅ **Ready to push to GitHub**

## 🚀 Step-by-Step GitHub Setup

### Step 1: Create GitHub Repository
1. **Go to**: [github.com/new](https://github.com/new)
2. **Repository name**: `kiro-luxury-furniture`
3. **Description**: "Complete luxury furniture website with Next.js, Firebase, and multi-language support"
4. **Visibility**: Public (recommended for Vercel)
5. **Don't initialize**: Leave README, .gitignore, and license unchecked
6. **Click**: "Create repository"

### Step 2: Connect to GitHub
Choose one of these methods:

#### Method A: HTTPS (Recommended)
```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git

# Push to GitHub
git push -u origin master
```

#### Method B: SSH (If you have SSH keys)
```bash
# Add remote repository
git remote add origin git@github.com:YOUR_USERNAME/kiro-luxury-furniture.git

# Push to GitHub
git push -u origin master
```

### Step 3: Verify GitHub Connection
```bash
# Check remote
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git (fetch)
# origin  https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git (push)
```

## 🚀 Vercel Deployment from GitHub

### Automatic Deployment (Recommended)
1. **Go to**: [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Click**: "New Project"
4. **Import**: Your `kiro-luxury-furniture` repository
5. **Vercel will auto-detect** Next.js settings
6. **Add Environment Variables**:

### Environment Variables for Vercel
Add these in Vercel dashboard → Settings → Environment Variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBgsoBvLAxLyskQ12Ljl_xHd7-zXrad4sk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=woodapp-1f446.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=woodapp-1f446
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=woodapp-1f446.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=263629717648
NEXT_PUBLIC_FIREBASE_APP_ID=1:263629717648:web:67a752a8add44988837c2b
```

## 🎯 Quick Commands Summary

### Complete Setup (2 minutes)
```bash
# 1. Create GitHub repository (web interface)
# 2. Connect and push
git remote add origin https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git
git push -u origin master

# 3. Deploy to Vercel
# Go to vercel.com and import your repository
```

## 📊 Repository Structure

Your repository is **perfectly organized** for Vercel:

```
kiro-luxury-furniture/
├── .gitignore                 # Git ignore rules
├── README.md                  # Project documentation
├── package.json              # Dependencies and scripts
├── next.config.ts            # Next.js configuration
├── src/                      # Source code
├── public/                   # Static assets
├── .env.local.example        # Environment template
└── [deployment guides]       # Complete documentation
```

## 🚀 One-Command Deployment

After GitHub setup, you can deploy with:

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option 2: GitHub → Vercel (Automatic)
- Push to GitHub
- Vercel auto-deploys on every push

### Option 3: Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 🔧 Troubleshooting

### Common Issues

**1. Git remote already exists**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git
```

**2. Authentication issues**
```bash
# Check GitHub credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**3. Push fails**
```bash
# Force push (careful - overwrites remote)
git push -f origin master
```

## 🎉 Ready to Deploy!

### Complete Setup Checklist
- [ ] GitHub repository created
- [ ] Repository connected to local
- [ ] Code pushed to GitHub
- [ ] Vercel connected to GitHub
- [ ] Environment variables added
- [ ] Website deployed successfully

### Expected URLs
- **GitHub**: `https://github.com/YOUR_USERNAME/kiro-luxury-furniture`
- **Vercel**: `https://kiro-luxury-furniture.vercel.app`

## 🚀 Final Commands

```bash
# Complete setup in 30 seconds
git remote add origin https://github.com/YOUR_USERNAME/kiro-luxury-furniture.git
git push -u origin master

# Then go to vercel.com and import your repository
```

**Your luxury furniture website is ready for GitHub and Vercel deployment! 🎉**
