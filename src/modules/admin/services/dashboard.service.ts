import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../database/schemas/user.schema';
import { Blog } from '../../../database/schemas/blog.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
  ) {}

  async getSystemStats() {
    const totalUsers = await this.userModel.countDocuments();
    const activeUsers = await this.userModel.countDocuments({ isActive: true });
    const inactiveUsers = await this.userModel.countDocuments({ isActive: false });

    const admins = await this.userModel.countDocuments({
      roles: { $in: ['admin'] },
    });

    const usersCreatedToday = await this.userModel.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    });

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminCount: admins,
      usersCreatedToday,
    };
  }

  async getContentStats() {
    const totalBlogs = await this.blogModel.countDocuments();
    const publishedBlogs = await this.blogModel.countDocuments({ status: 'published' });
    const draftBlogs = await this.blogModel.countDocuments({ status: 'draft' });
    const archivedBlogs = await this.blogModel.countDocuments({ status: 'archived' });

    const blogsCreatedToday = await this.blogModel.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    });

    const totalViews = await this.blogModel.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ]);

    const totalLikes = await this.blogModel.aggregate([
      { $group: { _id: null, totalLikes: { $sum: '$likes' } } },
    ]);

    return {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      archivedBlogs,
      blogsCreatedToday,
      totalViews: totalViews[0]?.totalViews || 0,
      totalLikes: totalLikes[0]?.totalLikes || 0,
    };
  }

  async getUserStats() {
    const roleDistribution = await this.userModel.aggregate([
      { $unwind: '$roles' },
      { $group: { _id: '$roles', count: { $sum: 1 } } },
    ]);

    const usersRegisteredThisMonth = await this.userModel.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    const lastLoginStats = await this.userModel.aggregate([
      {
        $group: {
          _id: null,
          lastActiveUser: { $max: '$lastLogin' },
        },
      },
    ]);

    return {
      roleDistribution,
      usersRegisteredThisMonth,
      lastActiveUser: lastLoginStats[0]?.lastActiveUser,
    };
  }

  async getRecentActivities(limit: number = 10) {
    const recentUsers = await this.userModel
      .find()
      .select('firstName lastName email createdAt')
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    const recentBlogs = await this.blogModel
      .find()
      .select('title slug publishedAt author')
      .populate('author', 'firstName lastName')
      .sort({ publishedAt: -1 })
      .limit(limit)
      .exec();

    return {
      recentUsers: recentUsers.map(user => ({
        type: 'user_signup',
        user: `${user.firstName} ${user.lastName}`,
        timestamp: user.createdAt,
      })),
      recentBlogs: recentBlogs.map(blog => ({
        type: 'blog_published',
        title: blog.title,
        author: `${blog.author?.firstName} ${blog.author?.lastName}`,
        timestamp: blog.publishedAt,
      })),
    };
  }
}
