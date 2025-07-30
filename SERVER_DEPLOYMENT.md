# 🚀 Server Deployment Guide - Kiro Luxury Furniture

## 📋 Deployment Options

### 1. Traditional Server (VPS/Dedicated)
### 2. Cloud Platforms (AWS, DigitalOcean, Google Cloud)
### 3. Shared Hosting with Node.js support

## 🚀 Quick Deployment Methods

### Option 1: DigitalOcean Droplet (Recommended)

#### Step 1: Create Droplet
```bash
# Create Ubuntu 22.04 droplet
# SSH into your server
ssh root@your-server-ip
```

#### Step 2: Server Setup
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Install Nginx
apt install nginx -y
```

#### Step 3: Deploy Application
```bash
# Clone repository
git clone https://github.com/yourusername/kiro-luxury-furniture.git
cd kiro-luxury-furniture

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "kiro-luxury" -- start
pm2 startup
pm2 save
```

#### Step 4: Nginx Configuration
```nginx
# /etc/nginx/sites-available/kiro-luxury
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        alias /var/www/kiro-luxury-furniture/.next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/kiro-luxury /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option 2: AWS EC2

#### Step 1: Launch EC2 Instance
```bash
# Launch Ubuntu 22.04 instance
# SSH into instance
ssh -i your-key.pem ubuntu@ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com
```

#### Step 2: Setup EC2
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### Step 3: Configure Security Groups
- **HTTP**: Port 80
- **HTTPS**: Port 443
- **SSH**: Port 22

### Option 3: Google Cloud Platform

#### Step 1: Create VM Instance
```bash
# Create instance with Ubuntu 22.04
gcloud compute instances create kiro-luxury \
  --zone=us-central1-a \
  --machine-type=e2-micro \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --tags=http-server,https-server
```

#### Step 2: Setup Instance
```bash
# SSH into instance
gcloud compute ssh kiro-luxury --zone=us-central1-a

# Follow Ubuntu setup steps above
```

### Option 4: Shared Hosting with Node.js

#### Requirements:
- Node.js 18+ support
- SSH access
- Git support

#### Deployment Steps:
```bash
# SSH into hosting
ssh username@your-host.com

# Navigate to public_html or app directory
cd ~/public_html

# Clone repository
git clone https://github.com/yourusername/kiro-luxury-furniture.git .

# Install dependencies
npm install

# Build application
npm run build

# Start application (using PM2 or similar)
npm start
```

## 🔧 Environment Setup

### Create Environment File
```bash
# Create .env file on server
cat > .env << EOF
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBgsoBvLAxLyskQ12Ljl_xHd7-zXrad4sk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=woodapp-1f446.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=woodapp-1f446
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=woodapp-1f446.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=263629717648
NEXT_PUBLIC_FIREBASE_APP_ID=1:263629717648:web:67a752a8add44988837c2b
EOF
```

## 🛡️ Security Setup

### SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Firewall Setup
```bash
# Configure UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 📊 Monitoring & Logging

### PM2 Monitoring
```bash
# Monitor application
pm2 monit

# View logs
pm2 logs kiro-luxury

# Restart on file changes
pm2 restart kiro-luxury
```

### System Monitoring
```bash
# Install monitoring tools
sudo apt install htop -y

# Check system resources
htop
```

## 🔄 Auto-Restart on Reboot

### PM2 Startup Script
```bash
# Generate startup script
pm2 startup systemd

# Save PM2 configuration
pm2 save
```

## 🚀 Deployment Scripts

### Automated Deployment Script
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Restart PM2
pm2 restart kiro-luxury

echo "✅ Deployment complete!"
```

### Make executable
```bash
chmod +x deploy.sh
```

## 📋 Server Requirements

### Minimum Requirements
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Debian 10+
- **RAM**: 2GB
- **Storage**: 10GB
- **Node.js**: 18.x
- **Nginx**: Latest

### Recommended Requirements
- **OS**: Ubuntu 22.04 LTS
- **RAM**: 4GB
- **Storage**: 20GB SSD
- **Node.js**: 18.x LTS
- **Nginx**: Latest

## 🔧 Server Configuration Files

### PM2 Ecosystem File
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'kiro-luxury',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### Systemd Service
```bash
# /etc/systemd/system/kiro-luxury.service
[Unit]
Description=Kiro Luxury Furniture
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/kiro-luxury-furniture
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

## 🚀 Quick Deployment Commands

### DigitalOcean One-Click
```bash
# Create droplet with Node.js
# SSH into server
# Run setup script
curl -fsSL https://raw.githubusercontent.com/yourusername/kiro-luxury-furniture/main/deploy.sh | bash
```

### AWS EC2 User Data
```bash
#!/bin/bash
# User data script for EC2

# Update system
yum update -y

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# Install PM2
npm install -g pm2

# Clone and deploy
git clone https://github.com/yourusername/kiro-luxury-furniture.git /var/www/kiro
cd /var/www/kiro
npm install
npm run build
pm2 start npm --name "kiro-luxury" -- start
pm2 startup
pm2 save
```

## 📊 Monitoring & Maintenance

### Health Check Endpoint
```bash
# Add to crontab for monitoring
*/5 * * * * curl -f http://localhost:3000/api/health || pm2 restart kiro-luxury
```

### Backup Script
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backup/kiro-luxury-$DATE.tar.gz /var/www/kiro-luxury-furniture
```

## 🎯 Production Checklist

- [ ] Server provisioned and secured
- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Auto-restart configured
- [ ] Custom domain configured

## 🚀 Multiple Deployment Options Summary

| Platform | Command | URL |
|----------|---------|-----|
| **Vercel** | `vercel --prod` | `https://kiro-luxury.vercel.app` |
| **Netlify** | `netlify deploy --prod` | `https://kiro-luxury.netlify.app` |
| **DigitalOcean** | `docker-compose up -d` | `http://your-server-ip` |
| **AWS EC2** | `pm2 start npm -- start` | `http://ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com` |
| **Traditional Server** | `npm start` | `http://your-domain.com` |

## 🚀 Quick Start - Choose Your Platform

### 1. **Vercel** (Recommended for Next.js)
```bash
npm i -g vercel
vercel --prod
```

### 2. **Netlify** (Great for static sites)
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### 3. **Docker** (Universal)
```bash
docker-compose up -d
```

### 4. **Traditional Server**
```bash
# On your server
git clone <repo>
npm install && npm run build
pm2 start npm --name "kiro-luxury" -- start
```

**Your luxury furniture website is ready for deployment on any platform! 🚀**
