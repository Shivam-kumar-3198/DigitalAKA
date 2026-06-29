# Digital AKA - Database Schema Documentation

Complete MongoDB Atlas collection schema for enterprise Digital Marketing Platform.

## Collections Overview

```
digitalaka (database)
├── users
├── roles
├── permissions
├── blogs
├── categories
├── tags
├── pages
├── media
├── seo
├── keywords
├── backlinks
├── clients
├── projects
├── services
├── forms
├── contacts
├── newsletter
├── analytics
├── activities
├── notifications
├── settings
├── audit_logs
├── sessions
├── api_keys
├── invoices
├── payments
├── tasks
├── meetings
└── testimonials
```

## Core Collections Schema

### 1. Users Collection
Stores user accounts with authentication and profile data.

```javascript
{
  _id: ObjectId,
  email: String (unique, required, indexed),
  password: String (hashed, required),
  firstName: String (required),
  lastName: String (required),
  phone: String (optional),
  avatar: String (URL, optional),
  
  // Authentication
  role: ObjectId (ref: 'Role'),
  permissions: [ObjectId] (ref: 'Permission'),
  isActive: Boolean (default: true, indexed),
  emailVerified: Boolean (default: false),
  
  // Security
  lastLogin: Date (optional),
  loginAttempts: Number (default: 0),
  lockUntil: Date (optional),
  loginHistory: [String], // IP addresses
  deviceTokens: [String], // Firebase/Push tokens
  
  // 2FA
  twoFactorSecret: String (optional),
  twoFactorEnabled: Boolean (default: false),
  
  // Metadata
  metadata: {
    preferences: Object,
    customFields: Object
  },
  
  // Timestamps
  createdAt: Date (indexed),
  updatedAt: Date
}

// Indexes
{ email: 1 }
{ isActive: 1 }
{ createdAt: -1 }
{ role: 1 }
```

### 2. Roles Collection
Access control roles (admin, manager, user, client).

```javascript
{
  _id: ObjectId,
  name: String (unique, lowercase, required, indexed),
  description: String,
  permissions: [ObjectId] (ref: 'Permission'),
  isSystem: Boolean (default: false), // Protected roles
  isActive: Boolean (default: true, indexed),
  metadata: Object,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ name: 1 }
{ isActive: 1 }
```

### 3. Permissions Collection
Granular permission system (module.action format).

```javascript
{
  _id: ObjectId,
  name: String (unique, lowercase, required),
  description: String,
  module: String (required, indexed), // 'users', 'blogs', 'pages'
  action: String (required), // 'create', 'read', 'update', 'delete', 'publish'
  isSystem: Boolean (default: false), // Protected permissions
  isActive: Boolean (default: true, indexed),
  metadata: Object,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ name: 1 }
{ module: 1, action: 1 }
{ isActive: 1 }
```

### 4. Blogs Collection
Blog posts with CMS features.

```javascript
{
  _id: ObjectId,
  title: String (required, indexed),
  slug: String (unique, lowercase, required, indexed),
  content: String (required),
  excerpt: String,
  
  // Media
  featuredImage: String (URL),
  
  // Metadata
  author: ObjectId (ref: 'User', required),
  category: ObjectId (ref: 'Category', required, indexed),
  tags: [ObjectId] (ref: 'Tag'),
  
  // SEO
  seoMeta: {
    metaTitle: String,
    metaDescription: String,
    canonical: String,
    focusKeyword: String
  },
  openGraph: {
    title: String,
    description: String,
    image: String
  },
  
  // Status & Publish
  status: String (enum: ['draft', 'published', 'archived'], default: 'draft', indexed),
  publishedAt: Date (indexed),
  scheduledAt: Date,
  
  // Content Management
  version: Number (default: 1),
  revisions: [{
    version: Number,
    content: String,
    author: ObjectId,
    createdAt: Date
  }],
  
  // Engagement
  viewCount: Number (default: 0),
  commentCount: Number (default: 0),
  shareCount: Number (default: 0),
  
  // Settings
  allowComments: Boolean (default: true),
  readTime: Number, // In minutes
  
  metadata: Object,
  createdAt: Date (indexed),
  updatedAt: Date
}

// Indexes
{ slug: 1 }
{ status: 1, publishedAt: -1 }
{ author: 1 }
{ category: 1 }
{ createdAt: -1 }
```

### 5. Categories Collection
Blog and content categories.

```javascript
{
  _id: ObjectId,
  name: String (unique, required, indexed),
  slug: String (unique, lowercase),
  description: String,
  icon: String (optional),
  color: String (hex code),
  isActive: Boolean (default: true, indexed),
  order: Number,
  metadata: Object,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ name: 1 }
{ slug: 1 }
```

### 6. Tags Collection
Content tags for flexible categorization.

```javascript
{
  _id: ObjectId,
  name: String (unique, lowercase, required, indexed),
  slug: String (unique, lowercase),
  description: String,
  color: String (hex code),
  isActive: Boolean (default: true),
  usageCount: Number (default: 0),
  metadata: Object,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ name: 1 }
{ usageCount: -1 }
```

### 7. Pages Collection
Static and dynamic website pages with builder support.

```javascript
{
  _id: ObjectId,
  title: String (required, indexed),
  slug: String (unique, lowercase, required, indexed),
  content: String,
  
  // Page Builder (JSON structure)
  sections: [{
    id: String,
    type: String, // 'hero', 'features', 'cta', 'testimonials'
    content: Object,
    settings: Object
  }],
  
  // Template
  template: String (enum: ['blank', 'landing', 'service', 'about']),
  
  // SEO
  seoMeta: {
    metaTitle: String,
    metaDescription: String,
    canonical: String,
    robots: String
  },
  
  // Status
  status: String (enum: ['draft', 'published', 'archived'], indexed),
  publishedAt: Date,
  
  // Metadata
  author: ObjectId (ref: 'User'),
  order: Number,
  isHomepage: Boolean (default: false),
  
  metadata: Object,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ slug: 1 }
{ status: 1 }
```

### 8. Media Collection
Cloudinary media management.

```javascript
{
  _id: ObjectId,
  
  // File Info
  originalName: String (required),
  cloudinaryId: String (required, unique, indexed),
  url: String (CDN URL),
  secureUrl: String (HTTPS URL),
  
  // Media Details
  type: String (enum: ['image', 'video', 'document'], indexed),
  mimeType: String,
  size: Number (in bytes),
  dimensions: {
    width: Number,
    height: Number
  },
  
  // Metadata
  alt: String,
  title: String,
  description: String,
  tags: [String],
  folder: String (Cloudinary folder path),
  
  // Settings
  isPublic: Boolean (default: true),
  optimized: Boolean (default: false),
  formats: {
    webp: String (URL),
    thumb: String (URL),
    medium: String (URL)
  },
  
  // Upload
  uploadedBy: ObjectId (ref: 'User'),
  usedInBranding: Boolean (default: false),
  
  metadata: Object,
  createdAt: Date (indexed),
  updatedAt: Date
}

// Indexes
{ cloudinaryId: 1 }
{ type: 1 }
{ uploadedBy: 1 }
```

### 9. SEO Collection
SEO configuration and management.

```javascript
{
  _id: ObjectId,
  
  // Target
  targetType: String (enum: ['blog', 'page', 'product'], indexed),
  targetId: ObjectId (ref: 'Blog'|'Page'),
  
  // Metadata
  metaTitle: String (max: 60),
  metaDescription: String (max: 160),
  canonical: String,
  robots: String (enum: ['index,follow', 'noindex,follow', 'index,nofollow']),
  
  // Schema Markup
  schema: {
    type: String, // 'Article', 'BreadcrumbList', 'FAQPage', etc.
    data: Object
  },
  
  // Social Media
  openGraph: {
    title: String,
    description: String,
    image: String,
    type: String
  },
  twitterCard: {
    card: String (enum: ['summary', 'summary_large_image']),
    title: String,
    description: String,
    image: String
  },
  
  // Keywords
  focusKeyword: String (indexed),
  keywords: [String],
  
  // Performance
  readabilityScore: Number,
  seoScore: Number,
  
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ targetId: 1 }
{ focusKeyword: 1 }
```

### 10. Keywords Collection
SEO keyword tracking.

```javascript
{
  _id: ObjectId,
  keyword: String (unique, lowercase, required, indexed),
  searchVolume: Number,
  difficulty: Number (0-100),
  intent: String (enum: ['informational', 'navigational', 'transactional']),
  
  // Tracking
  currentRank: Number,
  previousRank: Number,
  trackingUrl: String,
  
  // Blog Associations
  blogs: [ObjectId] (ref: 'Blog'),
  
  // Data
  cpc: Number,
  trends: [{
    date: Date,
    rank: Number,
    traffic: Number
  }],
  
  lastUpdated: Date,
  createdAt: Date
}

// Indexes
{ keyword: 1 }
{ currentRank: 1 }
{ searchVolume: -1 }
```

### 11. Clients Collection
CRM - Client information.

```javascript
{
  _id: ObjectId,
  
  // Company Info
  companyName: String (required, indexed),
  industry: String,
  website: String,
  
  // Contact
  email: String (required, indexed),
  phone: String,
  address: String,
  
  // Primary Contact
  contactPerson: {
    name: String,
    email: String,
    phone: String,
    title: String
  },
  
  // Relationship
  assignedTo: ObjectId (ref: 'User'),
  status: String (enum: ['prospect', 'client', 'inactive'], indexed),
  source: String (enum: ['web', 'referral', 'partner', 'cold_outreach']),
  
  // Financial
  budget: Number,
  currency: String (default: 'USD'),
  
  // Metadata
  metadata: {
    socialLinks: Object,
    customFields: Object
  },
  
  createdAt: Date (indexed),
  updatedAt: Date
}

// Indexes
{ companyName: 1 }
{ email: 1 }
{ status: 1 }
{ assignedTo: 1 }
```

### 12. Projects Collection
CRM - Client projects.

```javascript
{
  _id: ObjectId,
  
  // Info
  name: String (required, indexed),
  description: String,
  
  // Relationship
  client: ObjectId (ref: 'Client', required, indexed),
  services: [ObjectId] (ref: 'Service'),
  
  // Team
  teamMembers: [ObjectId] (ref: 'User'),
  projectManager: ObjectId (ref: 'User'),
  
  // Dates
  startDate: Date,
  endDate: Date,
  deadline: Date,
  
  // Financial
  budget: Number,
  spent: Number,
  
  // Status
  status: String (enum: ['planning', 'active', 'completed', 'on_hold'], indexed),
  progress: Number (0-100),
  
  // Details
  objectives: [String],
  deliverables: [String],
  
  // Attachments
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],
  
  metadata: Object,
  createdAt: Date (indexed),
  updatedAt: Date
}

// Indexes
{ client: 1 }
{ status: 1 }
{ projectManager: 1 }
```

### 13. Forms Collection
Lead capture forms.

```javascript
{
  _id: ObjectId,
  
  // Form Details
  name: String (required, indexed),
  title: String,
  description: String,
  
  // Fields Configuration
  fields: [{
    id: String,
    name: String,
    label: String,
    type: String (enum: ['text', 'email', 'phone', 'textarea', 'select']),
    required: Boolean,
    placeholder: String,
    validation: Object,
    options: [String] // For select type
  }],
  
  // Settings
  status: String (enum: ['active', 'inactive'], default: 'active', indexed),
  submitButtonText: String,
  successMessage: String,
  
  // Integrations
  webhookUrl: String,
  notificationEmail: String,
  
  // Tracking
  submissionCount: Number (default: 0),
  
  createdAt: Date (indexed),
  updatedAt: Date
}

// Indexes
{ name: 1 }
{ status: 1 }
```

### 14. Contacts Collection
Form submissions and leads.

```javascript
{
  _id: ObjectId,
  
  // From Form
  form: ObjectId (ref: 'Form', required, indexed),
  
  // Contact Info
  name: String (required, indexed),
  email: String (required, indexed),
  phone: String,
  message: String,
  
  // Custom Fields
  formData: Object,
  
  // Lead Status
  status: String (enum: ['new', 'contacted', 'qualified', 'converted'], indexed),
  assignedTo: ObjectId (ref: 'User'),
  
  // Tracking
  source: String,
  ipAddress: String,
  userAgent: String,
  
  metadata: Object,
  createdAt: Date (indexed),
  updatedAt: Date
}

// Indexes
{ email: 1 }
{ form: 1 }
{ status: 1 }
{ createdAt: -1 }
```

### 15. Analytics Collection
Website and campaign analytics.

```javascript
{
  _id: ObjectId,
  
  // Tracking
  date: Date (indexed),
  pageUrl: String (indexed),
  
  // Traffic
  pageViews: Number,
  uniqueVisitors: Number,
  bounceRate: Number,
  avgSessionDuration: Number,
  
  // Conversions
  conversions: Number,
  conversionRate: Number,
  
  // Sources
  source: String (enum: ['organic', 'direct', 'referral', 'paid']),
  keyword: String,
  campaign: String,
  
  // Geographic
  country: String,
  region: String,
  
  // Device
  deviceType: String (enum: ['desktop', 'mobile', 'tablet']),
  
  // Performance (Web Vitals)
  lcp: Number, // Largest Contentful Paint (ms)
  fid: Number, // First Input Delay (ms)
  cls: Number, // Cumulative Layout Shift
  
  metadata: Object,
  createdAt: Date
}

// Indexes
{ date: -1 }
{ pageUrl: 1 }
{ source: 1 }
```

## Data Relationships

```
┌─────────────────────────────────────────┐
│            Users                        │
│  (email, firstName, lastName, password) │
└────────────────┬────────────────────────┘
                 │
          ┌──────┴──────┐
          │             │
          ▼             ▼
      ┌────────┐   ┌───────────┐
      │ Roles  │   │ Permission│
      └────────┘   └───────────┘

┌─────────────────────────────────────────┐
│            Blogs                        │
│  (title, content, author, category)     │
└────────┬────────────────────────────────┘
         │
    ┌────┴────┬──────────┐
    │          │          │
    ▼          ▼          ▼
 Category    Tags      Media
              
┌─────────────────────────────────────────┐
│          Clients                        │
│  (companyName, email, phone)            │
└────────┬────────────────────────────────┘
         │
    ┌────┴────────────┐
    │                 │
    ▼                 ▼
Projects          Contacts
 
Forms ──────────> Contacts
```

## Indexing Strategy

### Performance Indexes
```javascript
// Authentication
Users: { email: 1 }
Users: { isActive: 1 }

// Content
Blogs: { slug: 1 }
Blogs: { status: 1, publishedAt: -1 }
Pages: { slug: 1 }

// Relationships
Blogs: { author: 1 }
Blogs: { category: 1 }
Clients: { assignedTo: 1 }

// Searches
Blogs: { title: "text", content: "text" }
Contacts: { email: 1 }
Contacts: { form: 1 }

// Time-based
Analytics: { date: -1 }
Contacts: { createdAt: -1 }
```

## Future Collections (Phase 2)

- **Invoices**: Billing and payments
- **Payments**: Transaction records
- **Tasks**: Team task management
- **Meetings**: Meeting scheduling
- **Testimonials**: Client testimonials
- **Newsletter**: Email subscription
- **AuditLogs**: System audit trail
- **Sessions**: User sessions
- **ApiKeys**: API key management
- **Notifications**: User notifications
- **Settings**: System settings

---

**Last Updated**: June 2024
**Database**: MongoDB Atlas
**Version**: 1.0.0
