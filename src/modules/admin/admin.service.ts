import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { DashboardService } from './services/dashboard.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private dashboardService: DashboardService,
  ) {}

  async getSystemStats() {
    return this.dashboardService.getSystemStats();
  }

  async getContentStats() {
    return this.dashboardService.getContentStats();
  }

  async getUserStats() {
    return this.dashboardService.getUserStats();
  }

  async getRecentActivities(limit: number = 10) {
    return this.dashboardService.getRecentActivities(limit);
  }

  async getUsersWithPagination(page: number = 1, limit: number = 10) {
    const total = await this.userModel.countDocuments();
    const users = await this.userModel
      .find()
      .select('-password')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getUserDetail(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .populate('roles')
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async updateUserRole(userId: string, roleId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { roles: roleId } },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async removeUserRole(userId: string, roleId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { roles: roleId } },
      { new: true },
    );

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async toggleUserStatus(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { isActive: !user.isActive },
      { new: true },
    );

    return updatedUser;
  }

  async sendEmailNotification(userId: string, subject: string, message: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // This will be implemented with actual email service
    // For now, we'll just log it
    console.log(`Email sent to ${user.email}: ${subject}`);

    return {
      success: true,
      message: 'Notification sent successfully',
    };
  }

  async exportUsersData(format: 'csv' | 'json' = 'json') {
    const users = await this.userModel.find().select('-password').exec();

    if (format === 'csv') {
      return this.convertToCsv(users);
    }

    return users;
  }

  private convertToCsv(data: any[]): string {
    if (!data || data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    const csvRows = data.map(obj =>
      headers.map(header => {
        const value = obj[header];
        return typeof value === 'string' ? `"${value}"` : value;
      }).join(','),
    );

    return [csvHeaders, ...csvRows].join('\n');
  }
}
