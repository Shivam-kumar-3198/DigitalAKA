# Command Reference

## Development Commands

### Install & Setup
```bash
# Install dependencies (use --legacy-peer-deps for compatibility)
npm install --legacy-peer-deps

# Setup environment
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application
```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Watch mode for development
npm run build -- --watch
```

### Code Quality
```bash
# Lint all TypeScript files
npm run lint

# Format code with Prettier
npm run format

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Test coverage report
npm run test:cov
```

---

## Database Commands

### MongoDB Connection
```bash
# Connect to local MongoDB
mongosh

# List all databases
show databases

# Use specific database
use digitalaka

# Show collections
show collections
```

### Database Operations
```bash
# Check user collection
db.users.find().pretty()

# Count documents
db.blogs.countDocuments()

# Find specific document
db.users.findOne({ email: "admin@example.com" })

# Update document
db.users.updateOne({ _id: ObjectId("...") }, { $set: { isActive: true } })

# Delete document
db.blogs.deleteOne({ _id: ObjectId("...") })

# Drop collection
db.blogs.drop()

# Create index
db.blogs.createIndex({ "slug": 1 })

# List indexes
db.blogs.getIndexes()
```

---

## API Testing Commands

### Using cURL

#### Authentication
```bash
# Register new user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login and get token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!"
  }'

# Refresh token
curl -X POST http://localhost:3000/auth/refresh \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Blogs
```bash
# Get all blogs
curl http://localhost:3000/blogs

# Get single blog by slug
curl http://localhost:3000/blogs/slug/my-first-blog

# Create blog (requires auth)
curl -X POST http://localhost:3000/blogs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "content": "Blog content here",
    "excerpt": "Brief description"
  }'

# Update blog
curl -X PUT http://localhost:3000/blogs/BLOG_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'

# Delete blog
curl -X DELETE http://localhost:3000/blogs/BLOG_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Publish blog
curl -X PATCH http://localhost:3000/blogs/BLOG_ID/publish \
  -H "Authorization: Bearer YOUR_TOKEN"

# Like a blog
curl -X POST http://localhost:3000/blogs/BLOG_ID/like \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Pages
```bash
# List pages
curl http://localhost:3000/pages

# Get home page
curl http://localhost:3000/pages/home

# Get page by slug
curl http://localhost:3000/pages/slug/about-us

# Create page
curl -X POST http://localhost:3000/pages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "About Us",
    "content": "Page content",
    "showInMenu": true
  }'
```

#### Categories
```bash
# List categories
curl http://localhost:3000/categories

# Create category (admin only)
curl -X POST http://localhost:3000/categories \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Technology",
    "description": "Technology posts"
  }'
```

#### Tags
```bash
# List tags
curl http://localhost:3000/tags

# Create tag
curl -X POST http://localhost:3000/tags \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "JavaScript"
  }'
```

#### Admin Dashboard
```bash
# Get system stats
curl http://localhost:3000/admin/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get content stats
curl http://localhost:3000/admin/dashboard/content-stats \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get users list
curl http://localhost:3000/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get user details
curl http://localhost:3000/admin/users/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"

# Export users as CSV
curl http://localhost:3000/admin/users/export/csv \
  -H "Authorization: Bearer YOUR_TOKEN" \
  > users.csv

# Export users as JSON
curl http://localhost:3000/admin/users/export/json \
  -H "Authorization: Bearer YOUR_TOKEN" \
  > users.json
```

#### SEO Management
```bash
# Get XML sitemap
curl http://localhost:3000/seo/sitemap.xml

# Get JSON sitemap
curl http://localhost:3000/seo/sitemap.json

# Create redirect
curl -X POST http://localhost:3000/seo/redirects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fromUrl": "/old-blog",
    "toUrl": "/blog/new-url",
    "statusCode": 301
  }'

# Get redirect stats
curl http://localhost:3000/seo/redirects-stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Media Management
```bash
# Upload file
curl -X POST http://localhost:3000/media/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@image.jpg"

# List media
curl http://localhost:3000/media

# Get media details
curl http://localhost:3000/media/MEDIA_ID

# Add tag to media
curl -X POST http://localhost:3000/media/MEDIA_ID/tag \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tag": "product-image"}'

# Remove tag from media
curl -X DELETE http://localhost:3000/media/MEDIA_ID/tag/product-image \
  -H "Authorization: Bearer YOUR_TOKEN"

# Delete media
curl -X DELETE http://localhost:3000/media/MEDIA_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### AI Content Generation
```bash
# Generate blog content
curl -X POST http://localhost:3000/ai/generate-blog \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write about sustainable living",
    "tone": "professional",
    "length": "long"
  }'

# Generate blog outline
curl -X POST http://localhost:3000/ai/generate-blog-outline \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Machine Learning",
    "tone": "informative"
  }'

# Generate blog titles
curl -X POST http://localhost:3000/ai/generate-blog-titles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Web Development",
    "count": 5
  }'

# Generate meta description
curl -X POST http://localhost:3000/ai/generate-meta \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your full blog content here",
    "type": "description"
  }'

# Get pending content (admin)
curl http://localhost:3000/ai/pending \
  -H "Authorization: Bearer YOUR_TOKEN"

# Approve content (admin)
curl -X PATCH http://localhost:3000/ai/CONTENT_ID/approve \
  -H "Authorization: Bearer YOUR_TOKEN"

# Reject content (admin)
curl -X PATCH http://localhost:3000/ai/CONTENT_ID/reject \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"feedback": "Content needs improvement"}'

# Get AI stats
curl http://localhost:3000/ai/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Using Postman

### Import API
1. Start dev server: `npm run dev`
2. Go to: http://localhost:3000/api/docs
3. Copy Swagger JSON
4. In Postman: File → Import → Paste JSON

### Setup Bearer Token
1. Register/Login to get token
2. In Postman, go to "Authorization" tab
3. Select "Bearer Token"
4. Paste your JWT token

### Example Collection

Create a collection with these requests:
- Register User
- Login
- Get Blogs
- Create Blog
- Update Blog
- Delete Blog
- Publish Blog

---

## System Administration

### View Logs
```bash
# View application logs in real-time
tail -f logs/app.log

# View error logs
tail -f logs/error.log

# Search logs for specific term
grep "error" logs/app.log
```

### Process Management
```bash
# Check if server is running
lsof -i :3000

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Run in background
npm run dev &

# Stop background process
fg
Ctrl+C
```

### Environment Variables
```bash
# View current env
cat .env

# Update env variable
# Edit .env file and restart server

# Common env vars to check:
# - MONGODB_URI
# - REDIS_HOST/PORT
# - JWT_SECRET
# - API_PORT
```

---

## Docker Commands (Optional)

### MongoDB Docker
```bash
# Run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo

# Stop MongoDB
docker stop mongodb

# View MongoDB logs
docker logs mongodb
```

### Redis Docker
```bash
# Run Redis container
docker run -d -p 6379:6379 --name redis redis

# Stop Redis
docker stop redis

# Connect to Redis CLI
docker exec -it redis redis-cli
```

### Full Stack Docker
```bash
# Using docker-compose (if configured)
docker-compose up

# Stop containers
docker-compose down

# View logs
docker-compose logs -f app
```

---

## Debugging Commands

### Enable Debug Mode
```bash
# Run with debug logging
DEBUG=* npm run dev

# Debug specific module
DEBUG=app:* npm run dev
```

### Database Debugging
```bash
# Connect to MongoDB shell
mongosh

# View query performance
db.blogs.find().explain("executionStats")

# Validate data
db.users.validate()
```

### API Debugging
```bash
# Test endpoint with verbose curl
curl -v http://localhost:3000/blogs

# Show request/response headers
curl -i http://localhost:3000/blogs

# Pretty print JSON response
curl http://localhost:3000/blogs | jq .
```

---

## Maintenance Commands

### Backup Database
```bash
# Backup MongoDB
mongodump --uri "mongodb://localhost:27017" -o backup/

# Restore MongoDB
mongorestore --uri "mongodb://localhost:27017" backup/
```

### Health Checks
```bash
# Check API health
curl http://localhost:3000/health

# Check database connection
curl http://localhost:3000/admin/dashboard/stats

# Check cache connection
# (Should not return error in logs)
```

### Performance Monitoring
```bash
# Monitor memory usage
top -p $(pgrep -f "npm run dev")

# Monitor network
netstat -an | grep 3000

# Check disk usage
df -h
```

---

## Troubleshooting Commands

### Fix Common Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Clear build cache
rm -rf dist/
npm run build

# Reset database
# Warning: This deletes all data!
mongosh --eval "db.dropDatabase()"

# Kill all node processes
killall node

# Check port availability
netstat -an | grep 3000
```

---

## Production Deployment Commands

```bash
# Build for production
npm run build

# Run production build
NODE_ENV=production npm start

# Monitor production
pm2 start dist/main.js --name "api"
pm2 status
pm2 logs
pm2 stop all
pm2 restart api
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Test | `npm run test` |
| Lint | `npm run lint` |
| Format | `npm run format` |
| Kill port 3000 | `lsof -ti:3000 \| xargs kill -9` |
| MongoDB shell | `mongosh` |
| API Docs | `http://localhost:3000/api/docs` |
| Health check | `curl http://localhost:3000/health` |

---

**Happy Building! 🚀**
