# Digital AKA Backend - Deployment Guide

Complete guide for deploying the NestJS backend to production environments.

## Pre-Deployment Checklist

### Security
- [ ] Generate strong JWT_SECRET: `openssl rand -base64 32`
- [ ] Set JWT_REFRESH_SECRET differently
- [ ] Configure HTTPS/SSL certificates
- [ ] Enable CORS only for frontend domain
- [ ] Set NODE_ENV=production
- [ ] Configure secure cookies
- [ ] Setup rate limiting thresholds
- [ ] Enable CSRF protection (if needed)
- [ ] Configure security headers (Helmet)
- [ ] Setup authentication middleware

### Database
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Setup MongoDB backups
- [ ] Create read-only replica for analytics
- [ ] Configure connection pooling
- [ ] Test database indexes
- [ ] Setup monitoring alerts
- [ ] Plan sharding strategy for scale

### Infrastructure
- [ ] Setup Redis cluster (not standalone)
- [ ] Configure Redis persistence
- [ ] Setup monitoring for Redis
- [ ] Configure log aggregation
- [ ] Setup error tracking (Sentry)
- [ ] Configure CDN for assets
- [ ] Setup reverse proxy/load balancer

### Application
- [ ] Run all tests
- [ ] Build production bundle: `npm run build`
- [ ] Test on staging environment
- [ ] Verify all environment variables
- [ ] Setup health checks
- [ ] Configure proper timeouts
- [ ] Setup request ID tracking
- [ ] Configure proper logging levels

## Docker Deployment

### Dockerfile
Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/v1/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "dist/main.js"]
```

### Docker Compose
Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: digitalaka-api
    restart: always
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      MONGODB_URI: ${MONGODB_URI}
      REDIS_URL: ${REDIS_URL}
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
    depends_on:
      - redis
    networks:
      - digitalaka-network
    volumes:
      - ./logs:/app/logs

  redis:
    image: redis:7-alpine
    container_name: digitalaka-redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - digitalaka-network
    command: redis-server --appendonly yes

volumes:
  redis-data:

networks:
  digitalaka-network:
    driver: bridge
```

### Build and Run Docker
```bash
# Build image
docker build -t digitalaka-api:1.0.0 .

# Run container
docker run -d \
  --name digitalaka-api \
  -p 3000:3000 \
  --env-file .env.production \
  digitalaka-api:1.0.0

# Using Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## Environment Configuration

### Production .env.production
```
NODE_ENV=production
PORT=3000
API_VERSION=v1

# Database - Use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digitalaka?retryWrites=true&w=majority
MONGO_DATABASE_NAME=digitalaka

# Redis - Use managed Redis service
REDIS_HOST=redis-prod.example.com
REDIS_PORT=6379
REDIS_PASSWORD=strong-redis-password

# JWT - Generate strong secrets
JWT_SECRET=your-super-secret-jwt-key-generated-with-openssl
JWT_EXPIRY=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRY=30d

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=sendgrid-api-key
SMTP_FROM=noreply@digitalaka.com

# Cloudinary
CLOUDINARY_NAME=your-production-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Security
CORS_ORIGIN=https://www.digitalaka.com
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FILE=/app/logs/application.log

# Monitoring
SENTRY_DSN=your-sentry-dsn-url
```

## Cloud Deployment Options

### Option 1: Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create digitalaka-api

# Set environment variables
heroku config:set NODE_ENV=production -a digitalaka-api
heroku config:set MONGODB_URI=mongodb+srv://... -a digitalaka-api
heroku config:set JWT_SECRET=... -a digitalaka-api
# ... set other variables

# Create Procfile
echo "web: npm run start" > Procfile

# Deploy
git push heroku main
```

### Option 2: AWS EC2

```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node.js and npm
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Clone repository
git clone https://github.com/Shivam-kumar-3198/DigitalAKA.git
cd DigitalAKA

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start dist/main.js --name "digitalaka-api"
pm2 save
pm2 startup

# Setup Nginx reverse proxy
# (See Nginx configuration section below)
```

### Option 3: Google Cloud Run

```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/your-project/digitalaka-api:latest

# Deploy to Cloud Run
gcloud run deploy digitalaka-api \
  --image gcr.io/your-project/digitalaka-api:latest \
  --platform managed \
  --region us-central1 \
  --set-env-vars NODE_ENV=production,MONGODB_URI=...,JWT_SECRET=...
```

### Option 4: Digital Ocean App Platform

```bash
# Create app.yaml
name: digitalaka-api
services:
  - name: api
    github:
      repo: Shivam-kumar-3198/DigitalAKA
      branch: main
    build_command: npm run build
    run_command: npm start
    envs:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        value: ${MONGODB_URI}
      - key: JWT_SECRET
        value: ${JWT_SECRET}
    http_port: 3000
    resources:
      memory_mb: 512

# Deploy via Digital Ocean CLI
doctl apps create --spec app.yaml
```

## Nginx Configuration

### Reverse Proxy Setup
Create `/etc/nginx/sites-available/digitalaka-api`:

```nginx
upstream digitalaka_api {
    server localhost:3000;
}

server {
    listen 80;
    server_name api.digitalaka.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.digitalaka.com;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Logging
    access_log /var/log/nginx/digitalaka-access.log;
    error_log /var/log/nginx/digitalaka-error.log;

    # Client limits
    client_max_body_size 50M;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # Proxy settings
    location / {
        proxy_pass http://digitalaka_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://digitalaka_api/api/v1/health;
        access_log off;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/digitalaka-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL/TLS Setup

### Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot certonly --nginx -d api.digitalaka.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

## Monitoring & Logging

### PM2 Monitoring
```bash
# Setup PM2 monitoring
pm2 install pm2-auto-pull
pm2 install pm2-logrotate

# View logs
pm2 logs digitalaka-api

# Monitor processes
pm2 monit
```

### Log Aggregation (ELK Stack)
```bash
# Install Elasticsearch
docker run -d -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:8.0.0

# Install Kibana
docker run -d -p 5601:5601 docker.elastic.co/kibana/kibana:8.0.0

# Configure Winston to send logs to Elasticsearch
npm install winston-elasticsearch
```

### Application Performance Monitoring
```bash
# Sentry integration for error tracking
npm install @sentry/node @sentry/tracing

# Configure in main.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## Database Backups

### MongoDB Atlas Automated Backups
1. Login to MongoDB Atlas
2. Go to Cluster → Backup
3. Enable automated backups
4. Set backup frequency (daily recommended)
5. Retain backups for 30+ days

### Manual Backup
```bash
# Backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/digitalaka" \
  --out ./backups

# Restore
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/digitalaka" \
  ./backups
```

## Performance Tuning

### Application Level
```bash
# Enable clustering for multi-core usage
npm install cluster

# Monitor memory usage
pm2 start dist/main.js --max-memory-restart 500M

# Configure connection pooling
MONGODB_POOL_SIZE=20
```

### Database Level
- Add indexes to frequently queried fields
- Use aggregation pipelines for complex queries
- Enable read preference for replica sets
- Configure appropriate cache TTLs

### Infrastructure Level
- Use CDN for static assets
- Configure load balancer
- Setup auto-scaling policies
- Monitor resource utilization

## Continuous Integration/Deployment

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build application
        run: npm run build

      - name: Deploy to production
        run: |
          # Add your deployment script here
          # Example: docker push, heroku deploy, etc.
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

## Post-Deployment

### Verification Checklist
- [ ] Health check endpoint returns 200
- [ ] API documentation accessible at /api/docs
- [ ] Authentication flow working
- [ ] Database connectivity verified
- [ ] Redis cache working
- [ ] All endpoints tested
- [ ] SSL certificate valid
- [ ] Logging configured and working
- [ ] Monitoring dashboards setup
- [ ] Backup procedures verified

### Rollback Procedure
```bash
# If using Docker
docker pull digitalaka-api:previous-version
docker stop digitalaka-api
docker run -d --name digitalaka-api digitalaka-api:previous-version

# If using PM2
pm2 revert

# If using Git
git revert <commit-hash>
npm run build
pm2 restart all
```

## Security Hardening

### Production Security Checklist
- [ ] Disable debug mode
- [ ] Enable all security headers
- [ ] Configure CORS properly
- [ ] Setup rate limiting
- [ ] Enable HTTPS only
- [ ] Rotate JWT secrets regularly
- [ ] Monitor failed login attempts
- [ ] Setup intrusion detection
- [ ] Regular security audits
- [ ] Keep dependencies updated

### Dependency Updates
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies safely
npm update
npm outdated
```

## Disaster Recovery

### Backup Strategy
- Daily automated MongoDB backups
- Weekly Redis snapshot backups
- Monthly full application backups
- Off-site backup storage

### Recovery Procedure
1. Restore database from backup
2. Restore Redis cache
3. Rebuild application
4. Run migrations if needed
5. Verify data integrity
6. Resume services

## Scaling Strategy

### Horizontal Scaling
- Run multiple instances behind load balancer
- Configure sticky sessions if needed
- Share Redis cache across instances
- Use MongoDB replica sets

### Vertical Scaling
- Increase server memory
- Use more CPU cores
- Upgrade database tier
- Increase Redis memory

## Support & Monitoring

### 24/7 Monitoring
- Setup health checks
- Configure alerting
- Monitor resource usage
- Track error rates
- Monitor response times

### On-Call Runbook
- Document common issues
- Setup escalation procedures
- Maintain runbooks
- Regular drill exercises

---

**Last Updated**: June 2024
**Environment**: Production
**Version**: 1.0.0
