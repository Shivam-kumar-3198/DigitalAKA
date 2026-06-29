import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('admin')
@Controller('admin')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard/stats')
  @ApiOperation({ summary: 'Get system statistics' })
  async getSystemStats() {
    return this.adminService.getSystemStats();
  }

  @Get('dashboard/content-stats')
  @ApiOperation({ summary: 'Get content statistics' })
  async getContentStats() {
    return this.adminService.getContentStats();
  }

  @Get('dashboard/user-stats')
  @ApiOperation({ summary: 'Get user statistics' })
  async getUserStats() {
    return this.adminService.getUserStats();
  }

  @Get('dashboard/activities')
  @ApiOperation({ summary: 'Get recent activities' })
  async getRecentActivities(@Query('limit') limit?: number) {
    return this.adminService.getRecentActivities(limit);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users with pagination' })
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.adminService.getUsersWithPagination(page, limit);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user detail' })
  async getUserDetail(@Param('id') userId: string) {
    return this.adminService.getUserDetail(userId);
  }

  @Patch('users/:id/role/:roleId/add')
  @ApiOperation({ summary: 'Add role to user' })
  async addRoleToUser(
    @Param('id') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.adminService.updateUserRole(userId, roleId);
  }

  @Patch('users/:id/role/:roleId/remove')
  @ApiOperation({ summary: 'Remove role from user' })
  async removeRoleFromUser(
    @Param('id') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.adminService.removeUserRole(userId, roleId);
  }

  @Patch('users/:id/toggle-status')
  @ApiOperation({ summary: 'Toggle user active status' })
  async toggleUserStatus(@Param('id') userId: string) {
    return this.adminService.toggleUserStatus(userId);
  }

  @Post('users/:id/notify')
  @ApiOperation({ summary: 'Send notification to user' })
  async sendNotification(
    @Param('id') userId: string,
    @Body() body: { subject: string; message: string },
  ) {
    return this.adminService.sendEmailNotification(
      userId,
      body.subject,
      body.message,
    );
  }

  @Get('users/export/:format')
  @ApiOperation({ summary: 'Export users data' })
  async exportUsers(
    @Param('format') format: 'csv' | 'json' = 'json',
    @Res() res: Response,
  ) {
    const data = await this.adminService.exportUsersData(format);

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
      res.send(data);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.json(data);
    }
  }
}
