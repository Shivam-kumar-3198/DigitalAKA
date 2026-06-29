# ✨ Start Here - Admin Dashboard Quick Start

## 30-Second Setup

### Terminal 1: Start Backend

```bash
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```

**Expected Output:**
```
[Nest] 12345  - 06/29/2026, 10:30:00 AM     LOG [NestFactory] Nest application successfully started
```

✅ Backend ready at: `http://localhost:3000`

### Terminal 2: Start Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

**Expected Output:**
```
- ready started server on 0.0.0.0:3001, url: http://localhost:3001
```

✅ Frontend ready at: `http://localhost:3001`

## 🎯 Access Admin Dashboard

Open in browser:
```
http://localhost:3001/admin
```

You will see the **Login Page** ✅

## 🔑 Login Credentials

```
Email:    admin@example.com
Password: AdminPass123!
```

**Need to create first user?** Run this in a new terminal:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPass123!",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

Then login with those credentials.

## 📊 You Now Have Access To:

✅ **Dashboard** - System overview & stats
✅ **Users** - Manage all system users
✅ **Blogs** - Create & manage blog posts
✅ **Pages** - Static page management
✅ **Categories** - Blog categories
✅ **Tags** - Content tags
✅ **Media** - Upload & manage files
✅ **AI Tools** - Generate content with AI
✅ **Settings** - Roles & permissions

## 🎨 Try These Actions:

1. **See Stats**: Go to Dashboard → View system stats
2. **Create User**: Go to Users → Click "Add User"
3. **Create Blog**: Go to Blogs → Click "New Post"
4. **Upload Media**: Go to Media → Drag & drop images
5. **Generate Content**: Go to AI Tools → Enter a topic

## 📚 Full Documentation

- **[ADMIN_DASHBOARD_README.md](./ADMIN_DASHBOARD_README.md)** - Complete guide
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - All API endpoints
- **[ADMIN_DASHBOARD_SUMMARY.md](./ADMIN_DASHBOARD_SUMMARY.md)** - What was built

## ❓ Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Or try different port
PORT=3001 npm run dev
```

### Can't connect to backend
- Verify `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:3000`
- Check backend is actually running
- Clear browser cache

### MongoDB error
- Install MongoDB locally: `brew install mongodb-community`
- Start it: `brew services start mongodb-community`
- Or use MongoDB Atlas connection string in `.env`

### Login fails
- Make sure user is created (run curl command above)
- Try with exact credentials shown
- Check backend console for errors

## 🚀 Next Steps

1. ✅ **Backend is running** ← You're here
2. ✅ **Frontend is running** ← You're here  
3. **Customize your branding** - Edit logos & colors
4. **Add your content** - Create users, blogs, pages
5. **Deploy to production** - Deploy to Vercel

## 📝 File Locations

- **Backend code**: `/src` directory
- **Frontend code**: `/frontend/app` directory
- **Admin pages**: `/frontend/app/admin`
- **Shared components**: `/frontend/components/admin`

## 💡 Pro Tips

- Both servers auto-reload on file changes
- Browser DevTools Network tab shows API calls
- Check `/api/docs` for Swagger API documentation
- Use Postman/cURL to test APIs directly

## ✨ You're All Set!

Everything is configured and ready to go. Start creating content! 🎉

---

**Questions?** Check the documentation files listed above.

**Found an issue?** Check the troubleshooting section or review terminal logs.

**Want to extend?** Follow the existing patterns to add new features.

Happy building! 🚀
