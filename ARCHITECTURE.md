# Digital AKA Backend - Architecture Documentation

Complete architecture documentation for the enterprise backend.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Applications                     │
│              (Web, Mobile, Admin Dashboard)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌─────────────────┐         ┌─────────────────┐
│  Load Balancer  │         │    Nginx        │
│  (Optional)     │         │  (Reverse Proxy)│
└────────┬────────┘         └────────┬────────┘
         │                           │
         └───────────────┬───────────┘
                         │
        ┌────────────────▼────────────────┐
        │      NestJS Application         │
        │      (Cluster/PM2)              │
        │  ┌─────────────────────────┐    │
        │  │  Global Middleware      │    │
        │  │  - Helmet Security      │    │
        │  │  - CORS                 │    │
        │  │  - Rate Limiting        │    │
        │  └─────────────────────────┘    │
        │  ┌─────────────────────────┐    │
        │  │  Global Guards          │    │
        │  │  - JWT Auth Guard       │    │
        │  │  - Roles Guard          │    │
        │  │  - Permissions Guard    │    │
        │  └─────────────────────────┘    │
        │  ┌─────────────────────────┐    │
        │  │  Global Interceptors    │    │
        │  │  - Logging              │    │
        │  │  - Response Transform   │    │
        │  └─────────────────────────┘    │
        │  ┌─────────────────────────┐    │
        │  │  Feature Modules        │    │
        │  │  - Auth Module          │    │
        │  │  - Users Module         │    │
        │  │  - Roles Module         │    │
        │  │  - Permissions Module   │    │
        │  │  - CMS Module (Phase 2) │    │
        │  │  - SEO Module (Phase 2) │    │
        │  │  - AI Module (Phase 2)  │    │
        │  └─────────────────────────┘    │
        └───────┬────────────┬────────────┘
                │            │
        ┌───────▼───┐ ┌──────▼──────┐
        │           │ │             │
        ▼           ▼ ▼             ▼
    ┌───────────┐ ┌──────────┐ ┌─────────┐
    │ MongoDB   │ │  Redis   │ │Cloudinary
    │  Atlas    │ │ (Cache)  │ │(Storage)
    │           │ │          │ │
    │ Database  │ │ Session  │ │Media
    │ Schema    │ │ Storage  │ │Upload
    │ Data      │ │ Caching  │ │CDN
    └───────────┘ └──────────┘ └─────────┘
```

## Module Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Application Module                     │
│  (AppModule - Root Module with Global Configuration)     │
└───────────────┬────────────────────────────────────────────┘
                │
    ┌───────────┼───────────┬────────────┬────────────┐
    │           │           │            │            │
    ▼           ▼           ▼            ▼            ▼
┌────────┐ ┌──────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
│ Common │ │   Auth   │ │ Users  │ │ Roles  │ │Permissions
│ Module │ │ Module   │ │ Module │ │ Module │ │ Module
└────────┘ └──────────┘ └────────┘ └────────┘ └──────────┘
   │          │            │          │           │
   │          │            │          │           │
   ▼          ▼            ▼          ▼           ▼
┌────────────────────────────────────────────────────────┐
│         Database Layer (MongoDB Schemas)               │
│  - Users, Roles, Permissions                          │
│  - Future: Blogs, Pages, Media, SEO, CRM, Analytics   │
└────────────────────────────────────────────────────────┘
   │
   ▼
┌────────────────────────────────────────────────────────┐
│              Services Layer (Business Logic)            │
│  - Validation, Error Handling, Transactions            │
└────────────────────────────────────────────────────────┘
   │
   ▼
┌────────────────────────────────────────────────────────┐
│          Controllers Layer (HTTP Endpoints)             │
│  - Request Handling, Response Formatting               │
└────────────────────────────────────────────────────────┘
   │
   ▼
┌────────────────────────────────────────────────────────┐
│         Guard & Interceptor Layer                      │
│  - JWT Auth, RBAC, Logging, Response Transform         │
└────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌──────────────┐
│  User        │
│  (Browser)   │
└──────┬───────┘
       │
       │ 1. POST /auth/login
       │    {email, password}
       │
       ▼
┌─────────────────────────────────────┐
│  Auth Controller                    │
│  - Validate input                   │
│  - Call AuthService                 │
└──────┬────────────────────────────────┘
       │
       │ 2. findByEmail & compare password
       │
       ▼
┌─────────────────────────────────────┐
│  Auth Service                       │
│  - Lookup user in database          │
│  - bcryptjs password compare        │
│  - Check account lock               │
│  - Generate JWT & Refresh tokens    │
└──────┬────────────────────────────────┘
       │
       │ 3. Validate password
       │
       ▼
┌─────────────────────────────────────┐
│  Users Service                      │
│  - Fetch user from MongoDB          │
│  - Return user with role/permissions│
└──────┬────────────────────────────────┘
       │
       │ 4. Return tokens & user data
       │
       ▼
┌──────────────┐
│  Client      │
│  Stores JWT  │
└──────┬───────┘
       │
       │ 5. Subsequent requests with JWT
       │    Authorization: Bearer <token>
       │
       ▼
┌─────────────────────────────────────┐
│  JWT Auth Guard                     │
│  - Extract token from header        │
│  - Verify signature & expiration    │
│  - Extract user payload             │
│  - Attach user to request           │
└──────┬────────────────────────────────┘
       │
       │ 6. Check roles/permissions
       │
       ▼
┌─────────────────────────────────────┐
│  Roles/Permissions Guards           │
│  - Check required roles             │
│  - Check required permissions       │
│  - Allow/Deny access                │
└──────┬────────────────────────────────┘
       │
       │ 7. Process request
       │
       ▼
┌─────────────────────────────────────┐
│  Controller Action                  │
│  - Execute business logic           │
│  - Return response                  │
└──────────────────────────────────────┘
```

## Request/Response Lifecycle

```
Client Request
      │
      ▼
┌──────────────────────┐
│ Nginx Reverse Proxy  │ - SSL/TLS termination
│                      │ - Rate limiting (optional)
└─────────┬────────────┘
          │
          ▼
┌──────────────────────┐
│ NestJS Application   │
│                      │
│ 1. Global Middleware │ - Helmet, CORS, express middleware
│    ↓                 │
│ 2. Pipes             │ - Validation (class-validator)
│    ↓                 │ - Transformation
│ 3. Guards            │ - JWT Auth Guard
│    ↓                 │ - Roles Guard
│ 4. Interceptors      │ - Logging Interceptor (before)
│    ↓                 │
│ 5. Controller        │ - Route handler
│    ↓                 │
│ 6. Service           │ - Business logic
│    ↓                 │
│ 7. Database Query    │ - MongoDB operation
│    ↓                 │
│ 8. Response          │ - Return data
│    ↓                 │
│ 9. Interceptors      │ - Transform Interceptor (after)
│    ↓                 │ - Logging
│ 10. Exception Filter │ - Error handling
└─────────┬────────────┘
          │
          ▼
┌──────────────────────┐
│ Formatted Response   │ {
└──────────────────────┘  statusCode: 200,
                          message: "Success",
                          data: {...},
                          timestamp: "..."
                        }
      │
      ▼
   Client
```

## Data Flow - Create User

```
┌─────────────────────────────────┐
│ Client sends POST /users        │
│ Authorization: Bearer JWT       │
│ Body: {email, password, ...}    │
└────────────────┬────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ JWT Auth Guard     │
        │ Verify JWT         │
        │ Extract user       │
        └────────┬───────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Roles Guard        │
        │ Check @Roles       │
        │ ('admin')          │
        └────────┬───────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Validation Pipe    │
        │ Validate CreateDTO │
        │ - Email format     │
        │ - Password strength│
        └────────┬───────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Users Controller   │
        │ async create()     │
        └────────┬───────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Users Service      │
        │ Check duplicate    │
        │ Hash password      │
        │ Create user        │
        └────────┬───────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ MongoDB            │
        │ Users Collection   │
        │ Insert document    │
        └────────┬───────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Return user data   │
        │ (password excluded)│
        └────────┬───────────┘
                 │
                 ▼
    ┌───────────────────────────┐
    │ Transform Interceptor    │
    │ Wrap in response format  │
    └────────┬──────────────────┘
             │
             ▼
    ┌───────────────────────────┐
    │ Logging Interceptor       │
    │ Log request & response    │
    └────────┬──────────────────┘
             │
             ▼
    ┌───────────────────────────┐
    │ Return to Client          │
    │ 201 Created               │
    │ {statusCode, data, ...}   │
    └───────────────────────────┘
```

## Caching Strategy

```
┌────────────────────────┐
│ Client Request         │
│ GET /users/123         │
└────────┬───────────────┘
         │
         ▼
    ┌─────────────────────────────┐
    │ Users Service               │
    │ Check Redis Cache           │
    │ Key: "user:123"             │
    └────────┬────────────────────┘
             │
      ┌──────┴────────┐
      │               │
      ▼ HIT           ▼ MISS
 ┌────────┐     ┌────────────────┐
 │ Return │     │ Query MongoDB   │
 │ cached │     │ Cache data (5m) │
 │ data   │     │ Return data     │
 └────────┘     └────────┬───────┘
      │                  │
      └────────┬─────────┘
               │
               ▼
         Return to Client
```

## Security Layers

```
┌─────────────────────────────────────────┐
│ Layer 1: Transport Security             │
│ - HTTPS/TLS 1.2+                        │
│ - SSL certificate validation            │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Layer 2: Request Security               │
│ - CORS validation                       │
│ - Request rate limiting                 │
│ - Input validation & sanitization       │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Layer 3: Authentication                 │
│ - JWT token validation                  │
│ - Token expiration check                │
│ - Signature verification                │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Layer 4: Authorization                  │
│ - Role-based access control (RBAC)      │
│ - Permission-based access control       │
│ - Route-level authorization             │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Layer 5: Data Security                  │
│ - Password hashing (bcryptjs)           │
│ - Sensitive field exclusion              │
│ - Query parameterization                │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Layer 6: Response Security              │
│ - Security headers (Helmet)             │
│ - XSS protection                        │
│ - CSRF protection (if needed)           │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│ Layer 7: Audit & Monitoring             │
│ - Activity logging                      │
│ - Error tracking                        │
│ - Security event logging                │
└─────────────────────────────────────────┘
```

## Database Schema Relationships

```
┌─────────────────────┐
│      Users          │
│                     │
│ • email             │
│ • password          │
│ • firstName         │
│ • lastName          │
│ • role (FK)    ─────┼──────┐
│ • permissions (FK)  │      │
│ • isActive          │      │
│ • createdAt         │      │
└─────────────────────┘      │
                             │
                    ┌────────▼──────────┐
                    │     Roles         │
                    │                   │
                    │ • name            │
                    │ • description     │
                    │ • permissions ─┐  │
                    │ • isSystem      │  │
                    │ • isActive      │  │
                    └─────────────────┘  │
                                        │
                         ┌──────────────▼──────┐
                         │   Permissions       │
                         │                     │
                         │ • name              │
                         │ • description       │
                         │ • module            │
                         │ • action            │
                         │ • isSystem          │
                         │ • isActive          │
                         └─────────────────────┘

Future Relationships:

┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   Blogs     │      │  Categories  │      │     Tags     │
│             │      │              │      │              │
│ • title     │      │ • name       │      │ • name       │
│ • slug      │      │ • slug       │      │ • slug       │
│ • content   │──┬─→ • slug        │      │ • color      │
│ • author    │  │   • description │      │ • usageCount │
│ • status    │  │   • order       │      │              │
│ • tags  ────┼──┼─────────────────┘      └──────────────┘
│             │  │
│ • SEO       │  │
│ • metadata  │  │
└─────────────┘  │
                 └── M:M Relationship

┌──────────┐          ┌──────────────┐          ┌────────┐
│ Clients  │ 1:M      │  Projects    │ M:M      │Services│
│          │──────→   │              │────────→ │        │
└──────────┘          └──────────────┘          └────────┘
                           │
                           │
                      1:M  │
                           ▼
                      ┌──────────────┐
                      │   Invoices   │
                      │   Payments   │
                      │   Tasks      │
                      │   Meetings   │
                      └──────────────┘
```

## Deployment Architecture

```
┌────────────────────────────────────────────────────┐
│                  Internet / CDN                    │
└────────────────────────────────────────────────────┘
                        │
                        ▼
            ┌───────────────────────────┐
            │    DNS / Load Balancer    │
            └────────────┬──────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐     ┌─────────┐     ┌─────────┐
    │ App #1  │     │ App #2  │     │ App #3  │
    │ Port    │     │ Port    │     │ Port    │
    │ 3000    │     │ 3001    │     │ 3002    │
    └────┬────┘     └────┬────┘     └────┬────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         ▼
    ┌─────────────────┐      ┌───────────────┐
    │ MongoDB Atlas   │      │ Redis Cluster │
    │                 │      │               │
    │ Replica Set:    │      │ Multiple nodes│
    │ - Primary       │      │ - Persistence │
    │ - Secondary 1   │      │ - Replication │
    │ - Secondary 2   │      │ - High Avail. │
    └─────────────────┘      └───────────────┘
```

## Performance Optimization

```
┌──────────────────┐
│ Client Request   │
└────────┬─────────┘
         │
         ▼
    ┌────────────────┐
    │ Redis Cache    │ ← Check cache first (fast)
    │ (5 min TTL)    │
    └─┬──────────────┘
      │
      ├─ HIT: Return cached data (1-5ms)
      │
      └─ MISS: Query Database
         │
         ▼
    ┌───────────────┐
    │ MongoDB Query │ ← Optimized with indexes
    │ - Indexed     │
    │ - Lean        │
    │ - Pagination  │
    └────────┬──────┘
             │
             ▼
      ┌─────────────┐
      │ Cache Data  │ ← Store in Redis (async)
      │ TTL: 5 mins │
      └────────┬────┘
               │
               ▼
        Response Time:
        - Cache HIT: 1-5ms
        - DB Query: 50-200ms
        - Network: 10-100ms
        - Total: 10-305ms
```

## Error Handling Flow

```
Exception Occurs
      │
      ▼
┌─────────────────────────────┐
│ Service throws specific     │
│ exception (HttpException)   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Global Exception Filter     │
│ - Catches exception         │
│ - Logs error details        │
│ - Formats error response    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Return Error Response:      │
│ {                           │
│   statusCode: 400/401/500,  │
│   message: "Error message", │
│   errors: {...},            │
│   timestamp: "ISO",         │
│   path: "/api/v1/..."       │
│ }                           │
└─────────────────────────────┘
      │
      ▼
┌─────────────────────────────┐
│ Log Interceptor logs error  │
│ Store in Winston logger     │
└─────────────────────────────┘
```

## SOLID Principles Implementation

### Single Responsibility
- Controllers: Handle HTTP requests only
- Services: Handle business logic only
- Guards: Handle authorization only
- Interceptors: Handle cross-cutting concerns only

### Open/Closed
- Modules are open for extension
- Each module can be extended independently
- DTOs validate without modifying core logic

### Liskov Substitution
- AuthGuard extends PassportStrategy
- RolesGuard implements CanActivate interface
- Services follow consistent patterns

### Interface Segregation
- Specific interfaces for each concern
- Controllers don't depend on implementation details
- Services accept only required dependencies

### Dependency Inversion
- NestJS DI container manages dependencies
- Services inject dependencies through constructor
- Low-level modules depend on abstractions

---

**Last Updated**: June 2024
**Architecture Version**: 1.0.0
**Framework**: NestJS 11
**Database**: MongoDB Atlas
