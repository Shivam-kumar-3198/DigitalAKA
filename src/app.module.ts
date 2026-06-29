import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { InitialSeedService } from './database/seeds/initial-seed.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from './common/logger/logger.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { CommonModule } from './common/common.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AdminModule } from './modules/admin/admin.module';
import { TagsModule } from './modules/tags/tags.module';
import { PagesModule } from './modules/pages/pages.module';
import { MediaModule } from './modules/media/media.module';
import { SeoModule } from './modules/seo/seo.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGO_DATABASE_NAME', 'digitalaka'),
        retryAttempts: 3,
        retryDelay: 3000,
        autoIndex: true,
      }),
    }),

    // Redis Cache
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST', 'localhost'),
        port: configService.get<number>('REDIS_PORT', 6379),
        ttl: 300, // 5 minutes default TTL
      }),
    }),

    // Common Module (Logger, Utilities)
    CommonModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    BlogsModule,
    CategoriesModule,
    AdminModule,
    TagsModule,
    PagesModule,
    MediaModule,
    SeoModule,
    AiModule,
    // Future modules will be added here:
    // SeoModule,
    // AiModule,
    // CrmModule,
    // AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    InitialSeedService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
