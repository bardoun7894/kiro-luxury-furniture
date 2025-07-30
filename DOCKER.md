# 🐳 Docker Deployment Guide - Kiro Luxury Furniture

## 🚀 Quick Start with Docker

### Prerequisites
- Docker & Docker Compose installed
- Firebase project configured (see .env.local)

### 1. One-Command Setup

```bash
# Clone and setup
git clone <your-repo>
cd kiro-luxury-furniture

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your Firebase configuration

# Build and run with Docker Compose
docker-compose up --build
```

### 2. Access Your Application
- **Main App**: http://localhost:3000
- **With Nginx**: http://localhost (port 80)

### 3. Production Deployment

#### Option A: Docker Compose (Recommended)
```bash
# Production build
docker-compose -f docker-compose.yml up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Option B: Docker Only
```bash
# Build image
docker build -t kiro-luxury-furniture .

# Run container
docker run -p 3000:3000 --env-file .env.local kiro-luxury-furniture
```

#### Option C: Docker Swarm
```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml kiro-luxury

# Check services
docker service ls
```

## 🔧 Docker Commands Reference

### Build Commands
```bash
# Build with cache
docker build -t kiro-luxury-furniture .

# Build without cache
docker build --no-cache -t kiro-luxury-furniture .

# Multi-stage build (optimized)
docker build --target runner -t kiro-luxury-furniture:prod .
```

### Run Commands
```bash
# Development with hot reload
docker run -p 3000:3000 -v $(pwd):/app kiro-luxury-furniture

# Production with environment
docker run -p 3000:3000 --env-file .env.local kiro-luxury-furniture

# With custom name
docker run --name kiro-app -p 3000:3000 kiro-luxury-furniture
```

### Management Commands
```bash
# View running containers
docker ps

# View logs
docker logs kiro-luxury-furniture

# Stop container
docker stop kiro-luxury-furniture

# Remove container
docker rm kiro-luxury-furniture

# Remove image
docker rmi kiro-luxury-furniture
```

## 🌐 Cloud Deployment

### DigitalOcean
```bash
# Install doctl
# Deploy to App Platform
doctl apps create --spec .do/app.yaml
```

### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
docker build -t kiro-luxury-furniture .
docker tag kiro-luxury-furniture:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/kiro-luxury-furniture:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/kiro-luxury-furniture:latest
```

### Google Cloud Run
```bash
# Build and deploy
gcloud run deploy kiro-luxury-furniture \
  --image gcr.io/PROJECT-ID/kiro-luxury-furniture \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🔧 Environment Variables

Create `.env.local` file:
```bash
# Copy example
cp .env.local.example .env.local

# Edit with your Firebase config
nano .env.local
```

## 📊 Monitoring & Health Checks

### Health Check Endpoint
The app includes a health check at `/health`

### Docker Health Check
```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' kiro-luxury-furniture

# View health logs
docker inspect --format='{{.State.Health.Log}}' kiro-luxury-furniture
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Docker)
```yaml
# .github/workflows/docker.yml
name: Docker Build & Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: yourusername/kiro-luxury-furniture:latest
```

## 🛠️ Development with Docker

### Hot Reload Development
```bash
# Development with volume mounting
docker run -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.next \
  --env-file .env.local \
  kiro-luxury-furniture:dev
```

### Debug Mode
```bash
# Run with debugging
docker run -p 3000:3000 -p 9229:9229 \
  --env-file .env.local \
  kiro-luxury-furniture \
  node --inspect=0.0.0.0:9229 server.js
```

## 📦 Docker Image Optimization

### Multi-stage Build Benefits
- **Smaller image size** (~200MB vs 1GB+)
- **Faster deployment**
- **Better security** (non-root user)
- **Optimized caching**

### Image Size Comparison
- **Development**: ~1.2GB
- **Production**: ~200MB
- **Alpine-based**: ~150MB

## 🚨 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

**Build fails:**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t kiro-luxury-furniture .
```

**Memory issues:**
```bash
# Increase Docker memory
# Docker Desktop → Settings → Resources → Memory
```

## 🌟 Production Best Practices

### Security
- Non-root user in container
- Security headers via Nginx
- Environment variables for secrets
- Health checks enabled

### Performance
- Gzip compression
- Static asset caching
- Image optimization
- CDN-ready configuration

### Monitoring
- Health check endpoints
- Docker logs integration
- Resource usage monitoring

## 🎯 Quick Commands Summary

```bash
# Complete setup
docker-compose up -d

# View logs
docker-compose logs -f

# Scale horizontally
docker-compose up -d --scale kiro-luxury-furniture=3

# Update with zero downtime
docker-compose up -d --build

# Backup data
docker exec kiro-luxury-furniture tar czf /tmp/backup.tar.gz /app/data
```

## 🚀 Ready for Production!

Your luxury furniture website is now **Docker-ready** with:
- ✅ **Complete Docker setup**
- ✅ **Production-optimized images**
- ✅ **Nginx reverse proxy**
- ✅ **SSL-ready configuration**
- ✅ **Health monitoring**
- ✅ **CI/CD ready**

**Deploy with confidence using Docker! 🐳**
