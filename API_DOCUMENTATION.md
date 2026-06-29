# Digital AKA - API Documentation

Complete API reference for enterprise Digital Marketing backend.

## Base URL
```
Development: http://localhost:3000/api/v1
Production: https://api.digitalaka.com/api/v1
```

## Authentication

### JWT Bearer Token
Include token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Token Format
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "admin",
  "permissions": ["users.create", "users.read", ...],
  "iat": 1719651000,
  "exp": 1719737400
}
```

## Response Format

### Success Response (2xx)
```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {
    // Response payload
  },
  "timestamp": "2024-06-29T10:30:00Z"
}
```

### Error Response (4xx, 5xx)
```json
{
  "statusCode": 400,
  "message": "Error message",
  "errors": {
    "field": "Validation error details"
  },
  "timestamp": "2024-06-29T10:30:00Z",
  "path": "/api/v1/endpoint"
}
```

## Endpoints

### Health Check

#### Get Health Status
```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-06-29T10:30:00Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "development"
}
```

---

## Authentication Endpoints

### Register User

```
POST /auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response (201 Created):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "message": "Registration successful. Please verify your email."
}
```

**Validation Rules:**
- Email: Valid email format, unique in database
- Password: Minimum 8 characters, must contain uppercase, lowercase, number, special character
- firstName, lastName: Required, string

---

### Login User

```
POST /auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin"
  }
}
```

**Status Codes:**
- `200 OK`: Login successful
- `401 Unauthorized`: Invalid credentials
- `429 Too Many Requests`: Account locked after failed attempts

---

### Logout User

```
POST /auth/logout
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Users Endpoints

### Get All Users

```
GET /users?page=1&limit=10
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Results per page, default 10

**Response (200 OK):**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1234567890",
      "isActive": true,
      "createdAt": "2024-06-29T10:30:00Z"
    }
  ],
  "total": 25,
  "pages": 3
}
```

**Permissions Required:** None (any authenticated user)

---

### Get Current User Profile

```
GET /users/profile
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "avatar": "https://cloudinary.com/...",
  "role": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "admin",
    "permissions": [...]
  },
  "isActive": true,
  "emailVerified": true,
  "lastLogin": "2024-06-29T10:30:00Z",
  "twoFactorEnabled": false,
  "createdAt": "2024-06-29T10:30:00Z",
  "updatedAt": "2024-06-29T10:30:00Z"
}
```

---

### Get User by ID

```
GET /users/:id
Authorization: Bearer <token>
```

**Path Parameters:**
- `id`: User ObjectId

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  // ... user data
}
```

**Status Codes:**
- `200 OK`: User found
- `404 Not Found`: User not found
- `401 Unauthorized`: Token missing or invalid

---

### Create User

```
POST /users
Authorization: Bearer <token>
Content-Type: application/json
```

**Permissions Required:** `admin`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+0987654321",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "createdAt": "2024-06-29T10:35:00Z"
}
```

---

### Update User

```
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Updated",
  "phone": "+1111111111",
  "avatar": "https://example.com/new-avatar.jpg",
  "isActive": true,
  "emailVerified": true
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Updated",
  // ... updated user data
}
```

---

### Delete User

```
DELETE /users/:id
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Response (204 No Content):**
No body returned

**Notes:**
- User is soft-deleted (isActive set to false)
- User data is retained for audit purposes

---

### Assign Role to User

```
POST /users/:userId/assign-role/:roleId
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "role": "507f1f77bcf86cd799439012",
  // ... updated user data
}
```

---

## Roles Endpoints

### Get All Roles

```
GET /roles
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "admin",
    "description": "Administrator with full access",
    "permissions": [
      "507f1f77bcf86cd799439020",
      "507f1f77bcf86cd799439021"
    ],
    "isSystem": true,
    "isActive": true
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "user",
    "description": "Regular user",
    "permissions": [],
    "isSystem": true,
    "isActive": true
  }
]
```

---

### Get Role by ID

```
GET /roles/:id
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "admin",
  "description": "Administrator with full access",
  "permissions": [...],
  "isSystem": true,
  "isActive": true,
  "createdAt": "2024-06-29T10:30:00Z"
}
```

---

### Create Role

```
POST /roles
Authorization: Bearer <token>
Content-Type: application/json
```

**Permissions Required:** `admin`

**Request Body:**
```json
{
  "name": "manager",
  "description": "Manager with limited access",
  "permissions": ["507f1f77bcf86cd799439020"]
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "manager",
  "description": "Manager with limited access",
  "permissions": ["507f1f77bcf86cd799439020"],
  "isSystem": false,
  "isActive": true,
  "createdAt": "2024-06-29T10:40:00Z"
}
```

---

### Update Role

```
PUT /roles/:id
Authorization: Bearer <token>
Content-Type: application/json
```

**Permissions Required:** `admin`

**Request Body:**
```json
{
  "description": "Updated description",
  "permissions": ["507f1f77bcf86cd799439020", "507f1f77bcf86cd799439021"]
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "admin",
  "description": "Updated description",
  "permissions": [...]
}
```

---

### Delete Role

```
DELETE /roles/:id
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Response (204 No Content):**

**Notes:**
- System roles cannot be deleted
- Role must not be assigned to any users

---

### Add Permission to Role

```
POST /roles/:roleId/permissions/:permissionId
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "admin",
  "permissions": [...],
  "updatedAt": "2024-06-29T10:45:00Z"
}
```

---

### Remove Permission from Role

```
DELETE /roles/:roleId/permissions/:permissionId
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Response (204 No Content):**

---

## Permissions Endpoints

### Get All Permissions

```
GET /permissions
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "name": "users.create",
    "description": "Create users",
    "module": "users",
    "action": "create",
    "isSystem": true,
    "isActive": true
  }
]
```

---

### Get Permissions by Module

```
GET /permissions/module/:module
Authorization: Bearer <token>
```

**Permissions Required:** `admin`

**Path Parameters:**
- `module`: Module name (users, blogs, pages, etc.)

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "name": "blogs.create",
    "module": "blogs",
    "action": "create",
    "isActive": true
  },
  {
    "_id": "507f1f77bcf86cd799439021",
    "name": "blogs.read",
    "module": "blogs",
    "action": "read",
    "isActive": true
  }
]
```

---

### Create Permission

```
POST /permissions
Authorization: Bearer <token>
Content-Type: application/json
```

**Permissions Required:** `admin`

**Request Body:**
```json
{
  "name": "custom.action",
  "description": "Custom action permission",
  "module": "custom",
  "action": "action"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439030",
  "name": "custom.action",
  "description": "Custom action permission",
  "module": "custom",
  "action": "action",
  "isSystem": false,
  "isActive": true,
  "createdAt": "2024-06-29T10:50:00Z"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Success with no body |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Error Handling

### Validation Error (400)
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Email is invalid",
    "password": "Password must contain uppercase letter"
  },
  "timestamp": "2024-06-29T10:30:00Z",
  "path": "/api/v1/auth/register"
}
```

### Unauthorized Error (401)
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2024-06-29T10:30:00Z",
  "path": "/api/v1/users"
}
```

### Forbidden Error (403)
```json
{
  "statusCode": 403,
  "message": "Insufficient permissions",
  "timestamp": "2024-06-29T10:30:00Z",
  "path": "/api/v1/users"
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Default**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **Public endpoints**: 60 requests per 15 minutes

Rate limit headers included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1719651900
```

---

**Last Updated**: June 2024
**API Version**: v1
**Status**: Production Ready
