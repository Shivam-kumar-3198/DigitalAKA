# Full Stack Setup Guide - Backend + Admin Dashboard

Complete guide to setting up and running the entire system.

## Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** running locally or Atlas cloud connection
- **Redis** (optional, for caching)
- Port 3000 (backend) and 3001 (frontend) available

## 1. Backend Setup

### Step 1: Install Dependencies

```bash
# From project root
npm install --legacy-peer-deps
```

### Step 2: Configure Environment

Create `.env` file in root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/digitalaka

# Redis (optional)
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# API
PORT=3000
NODE_ENV=development

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Step 3: Start Backend

```bash
npm run dev
```

Backend will be available at: **http://localhost:3000**

You should see:
```
[Nest] 12345  - 06/29/2026, 10:30:00 AM     LOG [NestFactory] Nest application successfully started +123ms
```

### Step 4: Verify Backend

Check API is working:

```bash
curl http://localhost:3000
# Response: {"message":"API is running"}
```

## 2. Frontend Setup

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Configure Environment

```bash
cp .env.local.example .env.local
```

Your `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 3: Start Frontend

```bash
npm run dev
```

Frontend will be available at: **http://localhost:3001**

## 3. Access Admin Dashboard

Open in browser: **http://localhost:3001/admin**

### Create Admin User

Since backend is fresh, create your first admin user via API:

```bash
# Register new admin user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPass123!",
    "firstName": "Admin",
    "lastName": "User"
  }'

# Response:
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin"
  }
}
```

### Login to Dashboard

1. Go to http://localhost:3001/admin
2. Use credentials:
   - **Email**: admin@example.com
   - **Password**: AdminPass123!
3. Click "Sign In"

You're now logged into the admin dashboard!

## Complete System Architecture

```
┌─────────────────────────────────────────────────────┐
│         Admin Dashboard (Next.js)                   │
│         http://localhost:3001/admin                 │
│                                                      │
│  ┌──────────────────────────────────────────┐      │
│  │  Dashboard │ Users │ Blogs │ Media │... │      │
│  └──────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────┘
                       │
                API Calls (Axios)
                       │
┌─────────────────────────────────────────────────────┐
│       NestJS Backend API (REST)                     │
│       http://localhost:3000                         │
│                                                      │
│  ┌──────────────────────────────────────────┐      │
│  │ Auth │ Users │ Blogs │ Media │ AI │...  │      │
│  └──────────────────────────────────────────┘      │
│                                                      │
│  JWT Authentication │ RBAC │ Data Validation       │
└─────────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   MongoDB         Redis          External APIs
   (Database)    (Cache)         (Cloudinary, OpenAI)
```

## Development Workflow

### Terminal 1: Backend
```bash
# Root directory
npm run dev
```

### Terminal 2: Frontend
```bash
# frontend directory
cd frontend
npm run dev
```

### Terminal 3: MongoDB (if local)
```bash
mongod
```

Both services will restart on file changes thanks to development watch mode.

## Testing the System

### 1. Test Login
```bash
# Try logging in with admin credentials
```

### 2. Test User Management
- Go to Admin → Users
- Create new user
- Edit user details
- Delete test user

### 3. Test Content Creation
- Go to Admin → Blogs
- Click "New Post"
- Add title and content
- Click "Publish"

### 4. Test AI Tools
- Go to Admin → AI Tools
- Enter a blog topic
- Click "Generate Blog"
- See AI-generated content

### 5. Test Media Upload
- Go to Admin → Media
- Drag images into upload area
- See images appear in gallery

## Building for Production

### Backend Build

```bash
npm run build
npm start
```

### Frontend Build

```bash
cd frontend
npm run build
npm run start
```

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Try different port
PORT=3001 npm run dev
```

### MongoDB Connection Error
```bash
# Check MongoDB is running
mongosh

# If not, start MongoDB
mongod

# Or use Atlas cloud connection
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

### Frontend Can't Connect to Backend
- Check backend is running on port 3000
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check network tab in browser DevTools
- Look for CORS errors

### Login Fails
- Check credentials are correct
- Verify user exists in database
- Check backend logs for errors
- Clear browser cache

### Admin Pages Show Blank
- Check browser console for JS errors
- Verify authentication token exists
- Check API responses in Network tab
- Restart frontend dev server

## Common Commands

```bash
# Start backend
npm run dev

# Start frontend
cd frontend && npm run dev

# Build backend
npm run build

# Build frontend
cd frontend && npm run build

# Run tests (backend)
npm run test

# Check linting
npm run lint

# Format code
npm run format

# Database operations
# (Setup scripts in future)
```

## Next Steps

1. **Customize Styling**: Edit Tailwind colors in `frontend/globals.css`
2. **Add New Features**: Follow existing patterns for new pages/API endpoints
3. **Setup Deployment**: Deploy backend to Vercel/Railway, frontend to Vercel
4. **Configure Email**: Setup SMTP for password resets
5. **Add AI Integration**: Configure OpenAI API key
6. **Setup CDN**: Configure Cloudinary for media

## File Structure Reference

```
project/
├── src/                          # Backend source
│   ├── modules/                  # Feature modules
│   ├── database/                 # MongoDB schemas
│   ├── common/                   # Shared utilities
│   └── main.ts                   # Entry point
├── frontend/                     # Next.js frontend
│   ├── app/                      # Pages and routes
│   │   └── admin/                # Admin dashboard
│   ├── components/               # React components
│   ├── lib/                      # Utilities
│   └── context/                  # State management
├── .env.example                  # Backend config template
├── package.json                  # Backend dependencies
└── README.md                     # Main documentation
```

## Performance Tips

1. **Enable Redis**: Significantly speeds up queries
2. **Use Production Build**: Faster than dev mode
3. **Optimize Images**: Compress before uploading
4. **Enable Caching**: Set cache headers in API responses
5. **Database Indexing**: Index frequently queried fields

## Security Checklist

- [ ] Change JWT_SECRET to strong value
- [ ] Enable HTTPS in production
- [ ] Setup rate limiting
- [ ] Enable CORS for known domains only
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Setup firewall rules
- [ ] Enable user email verification
- [ ] Setup 2FA for admin accounts

## Getting Help

1. **Backend Issues**: Check `/api/docs` (Swagger docs)
2. **Frontend Issues**: Check browser DevTools Console
3. **Database Issues**: Check MongoDB Compass
4. **API Issues**: Test with Postman/cURL
5. **Check Logs**: Look at terminal output for errors

---

**You're all set!** Your complete admin system is now running. Happy building! 🚀
