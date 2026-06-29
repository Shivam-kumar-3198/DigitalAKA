# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
cd /vercel/share/v0-project
npm install --legacy-peer-deps
```

### 2. Configure Environment
Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017
MONGO_DATABASE_NAME=digitalaka
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRATION=7d
API_PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Start Development Server
```bash
npm run dev
```

Your backend is running at: **http://localhost:3000**

---

## Available Commands

```bash
npm run dev              # Start development server with hot reload
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run test            # Run Jest tests
npm run test:watch     # Run tests in watch mode
```

---

## Key API Endpoints

### Authentication
```bash
# Register
POST /auth/register
{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}

# Login
POST /auth/login
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

### Admin Dashboard (requires admin role)
```bash
GET /admin/dashboard/stats
GET /admin/users
GET /admin/dashboard/content-stats
```

### Blog Management
```bash
GET  /blogs                    # List all published blogs
POST /blogs                    # Create new blog (admin/editor only)
GET  /blogs/slug/:slug         # Get blog by slug
PUT  /blogs/:id                # Update blog
DELETE /blogs/:id              # Delete blog
```

### Pages Management
```bash
GET  /pages                    # List all pages
POST /pages                    # Create page (admin/editor only)
GET  /pages/home               # Get home page
GET  /pages/slug/:slug         # Get page by slug
```

### Media Management
```bash
POST /media/upload             # Upload file (admin/editor only)
GET  /media                    # List all media
GET  /media/:id                # Get media details
DELETE /media/:id              # Delete media
```

### AI Content Generation
```bash
POST /ai/generate-blog         # Generate blog content
POST /ai/generate-blog-titles  # Generate title suggestions
POST /ai/generate-meta         # Generate meta description
GET  /ai/pending               # Get pending content (admin only)
PATCH /ai/:id/approve          # Approve content (admin only)
```

### SEO Management
```bash
GET  /seo/sitemap.xml          # XML sitemap
GET  /seo/sitemap.json         # JSON sitemap
POST /seo/redirects            # Create redirect (admin only)
```

---

## Testing the API

### Using cURL

**1. Register a user:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

**3. Get dashboard stats (with token):**
```bash
curl -X GET http://localhost:3000/admin/dashboard/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the Swagger docs from: `http://localhost:3000/api/docs`
2. Create a collection
3. Use the bearer token from login response for authenticated requests

---

## Default Admin Setup

The system includes an initial seed service that creates:
- Admin role
- Editor role
- Viewer role
- Essential permissions
- Default super admin permissions

**Note:** You'll need to manually create your first admin user via the API or database.

---

## Database Collections

The system automatically creates these MongoDB collections:
- users
- roles
- permissions
- blogs
- pages
- categories
- tags
- media
- comments
- leads
- analytics
- aicontents
- seos
- redirects

All with appropriate indexes for performance.

---

## Common Tasks

### Create a Blog Post
```bash
POST /blogs
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the blog content",
  "excerpt": "Brief description",
  "category": "category_id",
  "tags": ["tag_id_1", "tag_id_2"],
  "seo": {
    "metaTitle": "My First Blog - Best Guide",
    "metaDescription": "Learn about my first blog post",
    "keywords": ["blog", "first", "guide"]
  }
}
```

### Publish a Blog
```bash
PATCH /blogs/:id/publish
Authorization: Bearer YOUR_TOKEN
```

### Generate AI Blog Content
```bash
POST /ai/generate-blog
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "prompt": "Write about sustainable living practices",
  "tone": "professional",
  "length": "long"
}
```

### Approve AI Content
```bash
PATCH /ai/:content_id/approve
Authorization: Bearer YOUR_TOKEN
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or change API_PORT in .env
```

### MongoDB Connection Error
- Check MongoDB is running
- Verify MONGODB_URI in .env
- Check network connectivity

### Redis Connection Error
- Check Redis is running
- Verify REDIS_HOST and REDIS_PORT
- Check Redis credentials if needed

### JWT Token Issues
- Ensure JWT_SECRET is set
- Check token hasn't expired
- Verify token format in Authorization header

### CORS Issues
- Check FRONTEND_URL in .env
- Verify CORS headers are correct
- Check request origin matches

---

## Next Steps

1. **Read the Full Documentation**
   - See `FINAL_SUMMARY.md` for complete overview
   - Check `API_DOCUMENTATION.md` for all endpoints
   - Review `DEVELOPER_GUIDE.md` for patterns

2. **Setup Your Frontend**
   - Configure API base URL: `http://localhost:3000/api`
   - Setup authentication flow
   - Integrate blog, page, and media endpoints

3. **Production Deployment**
   - See `DEPLOYMENT_GUIDE.md`
   - Setup environment variables
   - Configure MongoDB Atlas
   - Deploy to hosting platform

4. **Extend the System**
   - Add new modules in `src/modules/`
   - Create new schemas in `src/database/schemas/`
   - Add API endpoints as needed
   - Follow existing patterns for consistency

---

## Support

For detailed information about:
- API Endpoints: See `API_DOCUMENTATION.md`
- Database Schema: See `DATABASE_SCHEMA.md`
- Architecture: See `ARCHITECTURE.md`
- Development: See `DEVELOPER_GUIDE.md`
- Deployment: See `DEPLOYMENT_GUIDE.md`

---

**Happy Building! 🚀**
