# Admin Dashboard - Complete Guide

The admin dashboard is a comprehensive management interface built with Next.js that connects to your NestJS backend API.

## Quick Start

### 1. Setup Frontend Environment

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

### 2. Configure Backend URL

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Start the Dashboard

```bash
npm run dev
```

The admin dashboard will be available at: **http://localhost:3001/admin**

## Default Login Credentials

After creating your first admin user, you can login with:

```
Email: admin@example.com
Password: SecurePassword123!
```

## Dashboard Features

### 1. Dashboard Home (`/admin/dashboard`)
- **System Overview**: View key statistics at a glance
- **Quick Stats**: Total users, blogs, pages, media files, and views
- **Quick Actions**: Fast links to create new content
- **System Information**: Check environment and API status

### 2. Users Management (`/admin/users`)
- **View All Users**: See complete user list with status
- **Search Users**: Filter by email, name, or role
- **Add New User**: Create new admin or regular users
- **Edit Users**: Modify user details and permissions
- **Delete Users**: Remove users from the system
- **User Status**: Toggle user active/inactive status

### 3. Blog Management (`/admin/blogs`)
- **Create Blog Posts**: Write and publish blog content
- **Blog List**: View all blog posts with status
- **Search Posts**: Filter blogs by title or content
- **Edit Posts**: Modify existing blog content
- **Delete Posts**: Remove blog posts
- **Status Control**: Switch between draft and published
- **View Counter**: Track blog post views

### 4. Pages Management (`/admin/pages`)
- **Create Pages**: Build static pages for your site
- **Page List**: View all pages with hierarchy
- **Search Pages**: Find pages quickly
- **Edit Pages**: Modify page content and meta
- **Delete Pages**: Remove pages from site
- **Publishing**: Control page visibility

### 5. Categories Management (`/admin/categories`)
- **Create Categories**: Add new blog categories
- **Category List**: View all categories
- **Posts Per Category**: See how many posts in each
- **Bulk Actions**: Manage multiple categories
- **Delete Categories**: Remove unused categories

### 6. Tags Management (`/admin/tags`)
- **Create Tags**: Add content tags
- **Tag List**: View all tags with usage
- **Search Tags**: Find tags quickly
- **Delete Tags**: Remove unused tags

### 7. Media Library (`/admin/media`)
- **Upload Files**: Drag & drop or click to upload
- **Media Gallery**: Browse all media files
- **File Preview**: View images in grid
- **File Details**: See file size and type
- **Delete Files**: Remove unwanted media
- **Supported Formats**: JPG, PNG, GIF, PDF, DOC

### 8. AI Tools (`/admin/ai-tools`)
- **Blog Generator**: Generate blog posts with AI
  - Input: Topic/Title
  - Output: Full blog content with keywords
  
- **Meta Generator**: Generate SEO meta tags
  - Input: Page title
  - Output: Meta description, keywords, schema
  
- **Copy to Clipboard**: One-click copy of generated content
- **Use Content**: Directly insert AI-generated content

### 9. Settings (`/admin/settings`)
- **Roles Management**: View and manage user roles
  - Admin: Full system access
  - Editor: Content creation/editing
  - Viewer: Read-only access
  
- **Permissions Management**: Manage granular permissions
  - Create/Edit/Delete posts
  - Manage users
  - Access settings
  - And more...

- **RBAC System**: Role-Based Access Control

## Architecture

### Project Structure

```
frontend/
├── app/
│   ├── admin/              # Admin dashboard routes
│   │   ├── layout.tsx      # Admin layout wrapper
│   │   ├── login/          # Login page
│   │   ├── dashboard/      # Dashboard home
│   │   ├── users/          # User management
│   │   ├── blogs/          # Blog management
│   │   ├── pages/          # Page management
│   │   ├── categories/     # Category management
│   │   ├── tags/           # Tag management
│   │   ├── media/          # Media library
│   │   ├── ai-tools/       # AI content tools
│   │   └── settings/       # System settings
│   ├── layout.tsx          # Main app layout
│   └── globals.css         # Global styles
├── components/
│   └── admin/              # Shared admin components
│       ├── admin-layout.tsx    # Main admin sidebar/header
│       └── data-table.tsx      # Reusable data table
├── context/
│   └── auth-context.tsx    # Authentication state
├── lib/
│   └── api-client.ts       # API HTTP client
└── services/               # API service layer (future)
```

### API Integration

The dashboard connects to your NestJS backend via REST APIs:

#### Authentication
```
POST /auth/login - Sign in user
POST /auth/register - Create new user
GET /auth/me - Get current user
```

#### Users
```
GET /users - List all users
GET /users/:id - Get user details
POST /users - Create new user
PATCH /users/:id - Update user
DELETE /users/:id - Delete user
```

#### Content
```
GET /blogs - List all blogs
POST /blogs - Create blog
PATCH /blogs/:id - Update blog
DELETE /blogs/:id - Delete blog
GET /pages - List all pages
POST /pages - Create page
GET /categories - List categories
POST /categories - Create category
GET /tags - List tags
POST /tags - Create tag
```

#### Media
```
GET /media - List media files
POST /media/upload - Upload file
DELETE /media/:id - Delete file
```

#### AI Tools
```
POST /ai/generate-blog - Generate blog content
POST /ai/generate-meta - Generate meta tags
```

#### Admin
```
GET /admin/dashboard - Dashboard statistics
GET /admin/stats - System stats
```

## Key Components

### AuthContext (`context/auth-context.tsx`)
Manages authentication state globally:
- Login/Logout
- User data
- JWT token management
- Protected route access

### ApiClient (`lib/api-client.ts`)
HTTP client for API communication:
- JWT token injection
- Automatic error handling
- Request/response interceptors
- File upload support

### AdminLayout (`components/admin/admin-layout.tsx`)
Main dashboard layout with:
- Sidebar navigation
- Header with date
- User profile section
- Logout button
- Responsive design

### DataTable (`components/admin/data-table.tsx`)
Reusable table component with:
- Sortable columns
- Search/filter support
- CRUD action buttons
- Loading states
- Empty states

## Styling

The dashboard uses **Tailwind CSS** with a professional dark-mode color scheme:

- **Background**: Dark slate (`slate-900`)
- **Primary**: Blue (`blue-600`)
- **Accents**: Green, purple, orange, pink
- **Text**: Dark slate on white
- **Borders**: Slate 200/300

### Global Styles
- Responsive mobile-first design
- Accessible color contrast
- Smooth transitions
- Hover states

## Security Features

1. **JWT Authentication**: Secure token-based auth
2. **Protected Routes**: Admin pages require login
3. **API Guards**: Backend enforces permissions
4. **RBAC**: Role-based access control
5. **Secure Storage**: Tokens stored in localStorage
6. **Automatic Redirect**: Expired sessions redirect to login

## Common Tasks

### Create a Blog Post
1. Go to `/admin/blogs`
2. Click "New Post"
3. Fill in title, content, and metadata
4. Select category and tags
5. Click "Publish" or "Save as Draft"

### Upload Media
1. Go to `/admin/media`
2. Drag files into upload area or click to select
3. Files are automatically organized
4. Delete by clicking trash icon

### Generate Blog Content with AI
1. Go to `/admin/ai-tools`
2. Select "Blog Generator" tab
3. Enter blog topic
4. Click "Generate Blog"
5. Review and copy content to clipboard

### Manage Users
1. Go to `/admin/users`
2. View list of all users
3. Click "Edit" to modify permissions
4. Click "Delete" to remove user
5. Click "Add User" to create new user

## Troubleshooting

### Login Issues
- Check that backend is running on port 3000
- Verify credentials are correct
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`

### API Connection Errors
- Ensure backend server is running: `npm run dev` in root directory
- Check network tab in browser DevTools
- Verify CORS is enabled on backend

### Page Not Loading
- Check browser console for errors
- Verify authentication token is valid
- Clear browser cache and try again

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check that globals.css is imported
- Verify no conflicting CSS

## Extending the Dashboard

### Add New Page
1. Create new folder in `app/admin/[feature]/`
2. Create `page.tsx` component
3. Add menu item in `admin-layout.tsx`
4. Create API service functions

### Add New Component
1. Create component in `components/admin/`
2. Use Tailwind CSS for styling
3. Accept props for reusability
4. Add TypeScript interfaces

### Add New API Integration
1. Add function to API client
2. Create service layer if needed
3. Use `useEffect` to fetch data
4. Handle loading/error states

## Performance Optimization

- **Lazy Loading**: Pages load on demand
- **Caching**: API responses cached with axios
- **Pagination**: Large datasets paginated
- **Search**: Client-side filtering for speed
- **Image Optimization**: Media files optimized

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Same as main project.

## Support

For issues or questions:
1. Check the [Main README](./README.md)
2. Review [API Documentation](./API_DOCUMENTATION.md)
3. Check backend logs: `npm run dev` in root
4. Contact development team

---

**Admin Dashboard v1.0** - Fully functional and production-ready!
