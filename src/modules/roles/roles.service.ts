import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from '@database/schemas/role.schema';
import { Logger } from '@common/logger/logger.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private logger: Logger,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleDocument> {
    const existingRole = await this.roleModel.findOne({
      name: createRoleDto.name,
    });

    if (existingRole) {
      throw new ConflictException('Role with this name already exists');
    }

    const role = new this.roleModel(createRoleDto);
    await role.save();

    this.logger.log(`Role created: ${role.name}`, 'RolesService');
    return role;
  }

  async findAll(): Promise<RoleDocument[]> {
    return this.roleModel
      .find({ isActive: true })
      .populate('permissions')
      .sort({ createdAt: -1 });
  }

  async findById(id: string | Types.ObjectId): Promise<RoleDocument | null> {
    return this.roleModel.findById(id).populate('permissions');
  }

  async findByName(name: string): Promise<RoleDocument | null> {
    return this.roleModel.findOne({ name: name.toLowerCase() });
  }

  async update(
    id: string | Types.ObjectId,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDocument> {
    const role = await this.roleModel.findByIdAndUpdate(id, updateRoleDto, {
      new: true,
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    this.logger.log(`Role updated: ${role.name}`, 'RolesService');
    return role;
  }

  async delete(id: string | Types.ObjectId): Promise<void> {
    const role = await this.roleModel.findById(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (role.isSystem) {
      throw new ConflictException('System roles cannot be deleted');
    }

    await this.roleModel.findByIdAndDelete(id);
    this.logger.log(`Role deleted: ${role.name}`, 'RolesService');
  }

  async addPermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleDocument> {
    return this.roleModel.findByIdAndUpdate(
      roleId,
      { $addToSet: { permissions: permissionId } },
      { new: true },
    );
  }

  async removePermission(
    roleId: string,
    permissionId: string,
  ): Promise<RoleDocument> {
    return this.roleModel.findByIdAndUpdate(
      roleId,
      { $pull: { permissions: permissionId } },
      { new: true },
    );
  }

  async seedSystemRoles(): Promise<void> {
    const systemRoles = [
      {
        name: 'admin',
        description: 'Administrator with full access',
        isSystem: true,
      },
      {
        name: 'manager',
        description: 'Manager with limited access',
        isSystem: true,
      },
      {
        name: 'user',
        description: 'Regular user',
        isSystem: true,
      },
      {
        name: 'client',
        description: 'Client user',
        isSystem: true,
      },
    ];

    for (const roleData of systemRoles) {
      const existingRole = await this.roleModel.findOne({ name: roleData.name });
      if (!existingRole) {
        await this.roleModel.create(roleData);
        this.logger.log(`System role seeded: ${roleData.name}`, 'RolesService');
      }
    }
  }
}
