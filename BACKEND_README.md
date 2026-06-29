# Digital AKA - Enterprise Backend

A production-ready, enterprise-grade backend for AI-powered Digital Marketing Agency built with NestJS, MongoDB, and Redis.

## 📋 Architecture Overview

### Technology Stack
- **Runtime**: Node.js
- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: MongoDB Atlas (Mongoose)
- **Cache**: Redis
- **Authentication**: JWT with Refresh Tokens
- **File Storage**: Cloudinary
- **Email**: Nodemailer/SMTP
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Validation**: Zod + class-validator
- **Security**: Helmet, CORS, Rate Limiting

### Architecture Principles
- **Clean Architecture**: Separation of concerns with controller-service-repository pattern
- **SOLID Principles**: Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion
- **Domain-Driven Design**: Organized by feature domains
- **Dependency Injection**: NestJS built-in DI container
- **No Spaghetti Code**: Reusable services, interfaces, DTOs
- **Enterprise Security**: JWT, RBAC, audit logging, rate limiting

## 📁 Project Structure

```
src/
├── main.ts                          # Application entry point
├── app.module.ts                    # Root module
├── app.controller.ts                # Root controller
├── app.service.ts                   # Root service
│
├── common/                          # Shared utilities
│   ├── logger/
│   │   └── logger.service.ts        # Winston logging
│   ├── filters/
│   │   └── all-exceptions.filter.ts # Global exception handling
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   ├── public.decorator.ts
│   │   └── roles.decorator.ts
│   └── common.module.ts             # Common module
│
├── config/                          # Configuration files
│   ├── database.config.ts
│   ├── redis.config.ts
│   └── jwt.config.ts
│
├── database/                        # Database layer
│   ├── schemas/
│   │   ├── user.schema.ts
│   │   ├── role.schema.ts
│   │   ├── permission.schema.ts
│   │   ├── blog.schema.ts
│   │   ├── page.schema.ts
│   │   └── ...
│   └── repositories/
│
├── modules/                         # Feature modules
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   │
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── users.controller.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   ├── roles/
│   │   ├── roles.module.ts
│   │   ├── roles.service.ts
│   │   ├── roles.controller.ts
│   │   └── dto/
│   │       └── create-role.dto.ts
│   │
│   ├── permissions/
│   │   ├── permissions.module.ts
│   │   ├── permissions.service.ts
│   │   ├── permissions.controller.ts
│   │   └── dto/
│   │       └── create-permission.dto.ts
│   │
│   ├── cms/                         # Coming next
│   ├── seo/                         # Coming next
│   ├── ai/                          # Coming next
│   ├── crm/                         # Coming next
│   └── analytics/                   # Coming next
│
├── utils/                           # Utility functions
│   ├── validators.ts
│   ├── helpers.ts
│   └── constants.ts
│
└── types/                           # TypeScript types
    ├── interfaces.ts
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Redis instance
- Cloudinary account (optional)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/Shivam-kumar-3198/DigitalAKA.git
cd DigitalAKA
```

2. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Install dependencies**
```bash
npm install
```

4. **Start development server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`
Swagger docs at `http://localhost:3000/api/docs`

### Build for Production
```bash
npm run build
npm start
```

## 🔐 Security Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based API access
- **Refresh Token Mechanism**: Long-lived refresh tokens for session renewal
- **Role-Based Access Control (RBAC)**: Admin, Manager, User, Client roles
- **Permission-Based Authorization**: Granular permission system
- **Password Security**: bcryptjs hashing with salt rounds

### Security Middleware
- **Helmet**: Security HTTP headers
- **CORS**: Cross-origin request protection
- **Rate Limiting**: Throttle API requests (configured globally)
- **Input Validation**: Zod + class-validator
- **Request Sanitization**: Automatic data validation and transformation

### Audit & Logging
- **Activity Logging**: All create/update/delete operations logged
- **Login History**: Track user login attempts
- **Device Tracking**: Store device tokens for notifications
- **IP Tracking**: Monitor access patterns
- **Error Logging**: Centralized exception handling with Winston

### Account Protection
- **Account Locking**: Lock after failed login attempts
- **Two-Factor Authentication**: Ready for implementation
- **Email Verification**: Pending email setup
- **Secure Cookies**: HttpOnly flags for sensitive data

## 📊 Database Schema

### Users Collection
- `email`: Unique, required
- `password`: Hashed with bcryptjs
- `firstName`, `lastName`: User identity
- `phone`, `avatar`: Optional profile info
- `role`: Reference to role
- `permissions`: Array of permission references
- `isActive`: Soft delete flag
- `emailVerified`: Email verification status
- `lastLogin`: Last successful login timestamp
- `loginAttempts`: Failed login counter
- `lockUntil`: Account lock expiration
- `twoFactorSecret`, `twoFactorEnabled`: 2FA setup
- `metadata`: Custom key-value data
- `createdAt`, `updatedAt`: Timestamps

### Roles Collection
- `name`: Unique role identifier (admin, manager, user, client)
- `description`: Role purpose
- `permissions`: Array of permission references
- `isSystem`: Protected system roles
- `isActive`: Active status

### Permissions Collection
- `name`: Unique permission identifier (e.g., users.create)
- `description`: Permission purpose
- `module`: Feature module (users, blogs, pages, etc.)
- `action`: Action type (create, read, update, delete, publish)
- `isSystem`: Protected system permissions
- `isActive`: Active status

## 🔌 API Endpoints

### Authentication
```
POST   /api/v1/auth/register           Register new user
POST   /api/v1/auth/login              Login user
POST   /api/v1/auth/logout             Logout user
```

### Users
```
GET    /api/v1/users                   Get all users (paginated)
GET    /api/v1/users/profile           Get current user profile
GET    /api/v1/users/:id               Get user by ID
POST   /api/v1/users                   Create user (admin)
PUT    /api/v1/users/:id               Update user
DELETE /api/v1/users/:id               Delete user (admin)
POST   /api/v1/users/:userId/assign-role/:roleId    Assign role
```

### Roles
```
GET    /api/v1/roles                   Get all roles (admin)
GET    /api/v1/roles/:id               Get role by ID (admin)
POST   /api/v1/roles                   Create role (admin)
PUT    /api/v1/roles/:id               Update role (admin)
DELETE /api/v1/roles/:id               Delete role (admin)
POST   /api/v1/roles/:roleId/permissions/:permissionId    Add permission
DELETE /api/v1/roles/:roleId/permissions/:permissionId    Remove permission
```

### Permissions
```
GET    /api/v1/permissions             Get all permissions (admin)
GET    /api/v1/permissions/:id         Get permission (admin)
GET    /api/v1/permissions/module/:module    Get module permissions (admin)
POST   /api/v1/permissions             Create permission (admin)
PUT    /api/v1/permissions/:id         Update permission (admin)
DELETE /api/v1/permissions/:id         Delete permission (admin)
```

## 📝 API Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2024-06-29T10:30:00Z"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "errors": { ... },
  "timestamp": "2024-06-29T10:30:00Z",
  "path": "/api/v1/users"
}
```

## 🔒 Authentication Flow

### Login Process
1. User submits email and password
2. Password validated against bcryptjs hash
3. Check account lock status
4. Verify email (if required)
5. Generate JWT access token
6. Generate refresh token
7. Update last login timestamp
8. Return tokens to client

### Request Authorization
1. Extract JWT from Authorization header
2. Verify token signature and expiration
3. Extract user payload (userId, email, role, permissions)
4. Attach user to request object
5. Check role/permission decorators
6. Execute controller action

## 🛠️ Development

### Code Quality
```bash
# Linting
npm run lint

# Code formatting
npm run format

# Testing
npm run test
npm run test:watch
npm run test:cov
```

### Environment Variables
Create `.env` file from `.env.example`:
```
NODE_ENV=development
PORT=3000
API_VERSION=v1

MONGODB_URI=mongodb+srv://...
REDIS_URL=redis://localhost:6379

JWT_SECRET=your-secret-key
JWT_EXPIRY=7d

SMTP_HOST=smtp.gmail.com
CLOUDINARY_NAME=your-name
```

## 📈 Performance Optimization

### Caching Strategy
- **Redis Cache**: 5-minute default TTL
- **Database Indexes**: Optimized queries with MongoDB indexes
- **Aggregation Pipelines**: Complex queries for reporting
- **Pagination**: Cursor-based for large datasets
- **Lazy Loading**: Related data loaded on demand

### Database Optimization
```typescript
// Indexes on frequently queried fields
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });

// Lean queries for read-only data
userModel.find().lean().exec();

// Select specific fields
userModel.find({}, { password: 0 }).select('email firstName lastName');
```

## 🧪 Testing Strategy

### Unit Tests
- Service methods
- DTO validation
- Error handling

### Integration Tests
- API endpoints
- Database operations
- Authentication flow

### Test Structure
```
src/
├── auth/
│   ├── auth.service.spec.ts
│   ├── auth.controller.spec.ts
│   └── jwt.strategy.spec.ts
```

## 📦 Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

### Environment Setup for Production
- Use strong JWT_SECRET (openssl rand -base64 32)
- Enable HTTPS/SSL
- Configure CORS for frontend domain only
- Use environment-specific database connection strings
- Enable rate limiting for production
- Configure proper logging levels

### GitHub Actions CI/CD
Automated testing and deployment on push to main branch.

## 🔄 Module Development

### Creating a New Module
1. Create module folder in `/src/modules`
2. Create schema in `/src/database/schemas`
3. Create service with business logic
4. Create controller with route handlers
5. Create DTOs for request/response
6. Create module file with imports/exports
7. Add module to AppModule

### Example: CMS Module (Next Steps)
```typescript
// Location: src/modules/cms/
├── cms.module.ts
├── cms.service.ts
├── cms.controller.ts
├── dto/
│   ├── create-blog.dto.ts
│   ├── create-page.dto.ts
│   └── create-media.dto.ts
└── schemas/
    ├── blog.schema.ts
    ├── page.schema.ts
    └── media.schema.ts
```

## 📋 Remaining Modules (Phase 2)

- **CMS Module**: Blogs, Pages, Media, Categories, Tags
- **SEO Module**: Meta tags, Schema markup, Sitemaps, Redirects
- **AI Module**: Content generation, Meta generation, Keyword analysis
- **CRM Module**: Clients, Projects, Invoices, Meetings
- **Lead Management**: Forms, Contacts, Leads pipeline
- **Analytics Module**: Dashboard, Reports, Statistics

## 🤝 Contributing

1. Create feature branch from `main`
2. Follow NestJS conventions
3. Write tests for new features
4. Ensure code passes linting
5. Create pull request with description

## 📄 License

ISC

## 👥 Support

For issues and support, contact: support@digitalaka.com

---

**Last Updated**: June 2024
**Version**: 1.0.0
**Status**: Production Ready (Phase 1)
