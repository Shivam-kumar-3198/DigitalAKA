import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Permission, PermissionDocument } from '@database/schemas/permission.schema';
import { Logger } from '@common/logger/logger.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
    private logger: Logger,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionDocument> {
    const existingPermission = await this.permissionModel.findOne({
      name: createPermissionDto.name,
    });

    if (existingPermission) {
      throw new ConflictException('Permission with this name already exists');
    }

    const permission = new this.permissionModel(createPermissionDto);
    await permission.save();

    this.logger.log(
      `Permission created: ${permission.name}`,
      'PermissionsService',
    );
    return permission;
  }

  async findAll(): Promise<PermissionDocument[]> {
    return this.permissionModel.find({ isActive: true }).sort({ module: 1 });
  }

  async findById(id: string | Types.ObjectId): Promise<PermissionDocument | null> {
    return this.permissionModel.findById(id);
  }

  async findByModule(module: string): Promise<PermissionDocument[]> {
    return this.permissionModel.find({ module, isActive: true });
  }

  async update(
    id: string | Types.ObjectId,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionDocument> {
    const permission = await this.permissionModel.findByIdAndUpdate(
      id,
      updatePermissionDto,
      { new: true },
    );

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    this.logger.log(
      `Permission updated: ${permission.name}`,
      'PermissionsService',
    );
    return permission;
  }

  async delete(id: string | Types.ObjectId): Promise<void> {
    const permission = await this.permissionModel.findById(id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    if (permission.isSystem) {
      throw new ConflictException('System permissions cannot be deleted');
    }

    await this.permissionModel.findByIdAndDelete(id);
    this.logger.log(
      `Permission deleted: ${permission.name}`,
      'PermissionsService',
    );
  }

  async seedSystemPermissions(): Promise<void> {
    const permissions = [
      // Users
      { name: 'users.create', module: 'users', action: 'create' },
      { name: 'users.read', module: 'users', action: 'read' },
      { name: 'users.update', module: 'users', action: 'update' },
      { name: 'users.delete', module: 'users', action: 'delete' },

      // Roles
      { name: 'roles.create', module: 'roles', action: 'create' },
      { name: 'roles.read', module: 'roles', action: 'read' },
      { name: 'roles.update', module: 'roles', action: 'update' },
      { name: 'roles.delete', module: 'roles', action: 'delete' },

      // Permissions
      { name: 'permissions.create', module: 'permissions', action: 'create' },
      { name: 'permissions.read', module: 'permissions', action: 'read' },
      { name: 'permissions.update', module: 'permissions', action: 'update' },
      { name: 'permissions.delete', module: 'permissions', action: 'delete' },

      // Dashboard
      { name: 'dashboard.view', module: 'dashboard', action: 'view' },

      // Blogs
      { name: 'blogs.create', module: 'blogs', action: 'create' },
      { name: 'blogs.read', module: 'blogs', action: 'read' },
      { name: 'blogs.update', module: 'blogs', action: 'update' },
      { name: 'blogs.delete', module: 'blogs', action: 'delete' },
      { name: 'blogs.publish', module: 'blogs', action: 'publish' },

      // Pages
      { name: 'pages.create', module: 'pages', action: 'create' },
      { name: 'pages.read', module: 'pages', action: 'read' },
      { name: 'pages.update', module: 'pages', action: 'update' },
      { name: 'pages.delete', module: 'pages', action: 'delete' },
      { name: 'pages.publish', module: 'pages', action: 'publish' },
    ];

    for (const permData of permissions) {
      const existing = await this.permissionModel.findOne({
        name: permData.name,
      });
      if (!existing) {
        await this.permissionModel.create({ ...permData, isSystem: true });
        this.logger.log(
          `System permission seeded: ${permData.name}`,
          'PermissionsService',
        );
      }
    }
  }
}
