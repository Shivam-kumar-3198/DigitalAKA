# Digital AKA Backend - Developer Guide

Comprehensive guide for developing and extending the NestJS backend.

## Architecture Decisions

### Why NestJS?
- Built-in dependency injection framework
- TypeScript-first design for type safety
- Modular architecture with clear separation of concerns
- Rich ecosystem with official packages
- Excellent for enterprise applications
- Performance comparable to Express.js

### Why MongoDB with Mongoose?
- Schema flexibility for evolving CMS requirements
- Easy horizontal scaling with sharding
- Atlas provides managed hosting with backups
- Mongoose provides schema validation and relationships
- JSONB support for complex nested data

### Why Redis?
- High-performance caching layer
- Session management
- Rate limiting implementation
- Real-time features support
- Pub/Sub for future notifications

## Development Workflow

### 1. Creating a New Feature Module

#### Step 1: Create Module Folder
```bash
mkdir -p src/modules/feature-name
cd src/modules/feature-name
```

#### Step 2: Create Schema (Database)
```typescript
// src/database/schemas/feature.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'features' })
export class Feature {
  @Prop({ required: true })
  name: string;

  @Prop({ indexed: true })
  slug: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
FeatureSchema.index({ slug: 1 });
```

#### Step 3: Create Service
```typescript
// src/modules/feature-name/feature.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feature, FeatureDocument } from '@database/schemas/feature.schema';

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature.name) private model: Model<FeatureDocument>,
  ) {}

  async create(data): Promise<FeatureDocument> {
    const feature = new this.model(data);
    return feature.save();
  }

  async findAll(): Promise<FeatureDocument[]> {
    return this.model.find({ isActive: true });
  }

  async findById(id): Promise<FeatureDocument | null> {
    return this.model.findById(id);
  }

  async update(id, data): Promise<FeatureDocument> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
```

#### Step 4: Create Controller
```typescript
// src/modules/feature-name/feature.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';

@ApiBearerAuth()
@ApiTags('Features')
@Controller('features')
export class FeatureController {
  constructor(private service: FeatureService) {}

  @Post()
  async create(@Body() dto: CreateFeatureDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateFeatureDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.delete(id);
  }
}
```

#### Step 5: Create DTOs
```typescript
// src/modules/feature-name/dto/create-feature.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;
}
```

#### Step 6: Create Module
```typescript
// src/modules/feature-name/feature.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { Feature, FeatureSchema } from '@database/schemas/feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feature.name, schema: FeatureSchema },
    ]),
  ],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [FeatureService],
})
export class FeatureModule {}
```

#### Step 7: Register Module in App
```typescript
// src/app.module.ts
import { FeatureModule } from './modules/feature-name/feature.module';

@Module({
  imports: [
    // ... other modules
    FeatureModule,
  ],
})
export class AppModule {}
```

## Code Patterns

### Service Pattern
Services contain business logic and database operations:

```typescript
@Injectable()
export class MyService {
  constructor(
    @InjectModel(MyModel.name) private model: Model<MyDocument>,
    private logger: Logger,
  ) {}

  async create(dto): Promise<MyDocument> {
    const entity = new this.model(dto);
    const saved = await entity.save();
    this.logger.log(`Entity created: ${saved._id}`, 'MyService');
    return saved;
  }

  async findAll(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find().skip(skip).limit(limit),
      this.model.countDocuments(),
    ]);
    return { data, total, pages: Math.ceil(total / limit) };
  }
}
```

### Controller Pattern
Controllers handle HTTP requests and delegate to services:

```typescript
@Controller('resource')
@ApiBearerAuth()
export class MyController {
  constructor(private service: MyService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create resource' })
  async create(@Body() dto: CreateDto) {
    return this.service.create(dto);
  }

  @Get()
  @Public() // Accessible without auth
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.service.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
```

### DTO Pattern
Use DTOs for request/response validation:

```typescript
export class CreateDto {
  @ApiProperty({ example: 'value' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateDto extends PartialType(CreateDto) {}
```

### Error Handling
```typescript
// Services throw specific errors
async findById(id: string) {
  const entity = await this.model.findById(id);
  if (!entity) {
    throw new NotFoundException('Entity not found');
  }
  return entity;
}

// Global exception filter catches and formats
// Response automatically transformed by TransformInterceptor
```

## Database Operations

### Querying Best Practices

```typescript
// Lean queries (faster for read-only)
const blogs = await this.blogModel.find({ status: 'published' }).lean();

// Select specific fields
const users = await this.userModel
  .find()
  .select('email firstName lastName')
  .exec();

// Populate relationships
const blog = await this.blogModel
  .findById(id)
  .populate('author')
  .populate('category');

// Pagination
const page = 1;
const limit = 10;
const skip = (page - 1) * limit;
const results = await this.model
  .find()
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });
```

### Indexes
Always add indexes for frequently queried fields:

```typescript
// In schema
@Schema()
export class MyModel {
  @Prop({ index: true })
  email: string;

  @Prop({ index: true })
  status: string;
}

// In schema creation
const schema = SchemaFactory.createForClass(MyModel);
schema.index({ email: 1 });
schema.index({ status: 1, createdAt: -1 });
```

## Authentication & Authorization

### Protecting Routes

```typescript
// Public route (no authentication needed)
@Public()
@Post('auth/login')
async login(@Body() dto: LoginDto) {
  return this.authService.login(dto);
}

// Protected route (authentication required)
@Get('users/:id')
async getUser(@Param('id') id: string) {
  return this.userService.findById(id);
}

// Role-based access
@Roles('admin')
@Delete('users/:id')
async deleteUser(@Param('id') id: string) {
  await this.userService.delete(id);
}

// Get current user
@Get('profile')
async getProfile(@CurrentUser() user: any) {
  return user;
}
```

### Permission Checking
```typescript
// In service
async deleteUser(id: string, currentUser: any) {
  if (!currentUser.permissions.includes('users.delete')) {
    throw new ForbiddenException('Insufficient permissions');
  }
  // ... delete logic
}
```

## Logging

```typescript
import { Logger } from '@common/logger/logger.service';

@Injectable()
export class MyService {
  constructor(private logger: Logger) {}

  async doSomething() {
    this.logger.log('Operation started', 'MyService');
    try {
      // ... operation
      this.logger.log('Operation completed', 'MyService');
    } catch (error) {
      this.logger.error(
        'Operation failed',
        error.stack,
        'MyService',
      );
    }
  }
}
```

## Caching

```typescript
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class MyService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async getUser(id: string) {
    const cachedUser = await this.cache.get(`user:${id}`);
    if (cachedUser) return cachedUser;

    const user = await this.userModel.findById(id);
    await this.cache.set(`user:${id}`, user, 300000); // 5 mins
    return user;
  }

  async invalidateCache(id: string) {
    await this.cache.del(`user:${id}`);
  }
}
```

## Testing

### Unit Test Example
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;
  let model: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyService,
        {
          provide: 'MODEL',
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MyService>(MyService);
    model = module.get('MODEL');
  });

  it('should find user by id', async () => {
    const mockUser = { _id: '1', name: 'Test' };
    model.findById.mockResolvedValue(mockUser);

    const result = await service.findById('1');
    expect(result).toEqual(mockUser);
  });
});
```

## Performance Optimization

### Aggregation Pipelines
For complex queries, use MongoDB aggregation:

```typescript
async getAnalytics() {
  return this.analyticsModel.aggregate([
    {
      $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }
    },
    {
      $group: {
        _id: '$date',
        totalViews: { $sum: '$pageViews' },
        totalConversions: { $sum: '$conversions' }
      }
    },
    {
      $sort: { _id: -1 }
    }
  ]);
}
```

### Lazy Loading
```typescript
// Don't populate unnecessary fields
const blog = await this.blogModel
  .findById(id)
  .select('-content') // Exclude large field
  .populate('author', 'name email'); // Only specific fields
```

## Deployment Checklist

- [ ] Set strong JWT_SECRET (openssl rand -base64 32)
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Enable HTTPS/SSL
- [ ] Set CORS to frontend domain only
- [ ] Configure logging to file system
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Configure email service credentials
- [ ] Setup monitoring and alerting
- [ ] Configure backup strategy
- [ ] Run database migrations
- [ ] Test all endpoints

## Common Issues

### MongoDB Connection Failed
```
Solution: Check MONGODB_URI in .env, ensure IP is whitelisted in Atlas
```

### JWT Token Expired
```
Solution: Implement refresh token endpoint, use JWT_EXPIRY for appropriate duration
```

### Performance Issues
```
Solution: Check database indexes, implement caching, use pagination
```

### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [MongoDB Mongoose Docs](https://mongoosejs.com)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [REST API Standards](https://restfulapi.net)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Last Updated**: June 2024
**Version**: 1.0.0
