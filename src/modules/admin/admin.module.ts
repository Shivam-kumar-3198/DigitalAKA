import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { Blog, BlogSchema } from '../../database/schemas/blog.schema';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  providers: [AdminService, DashboardService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
