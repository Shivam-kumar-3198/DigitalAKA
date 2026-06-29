import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '@database/schemas/user.schema';
import { Logger } from '@common/logger/logger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCK_DURATION = 15 * 60 * 1000; // 15 minutes

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private logger: Logger,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new this.userModel(createUserDto);
    await user.save();

    this.logger.log(`User created: ${user.email}`, 'UsersService');
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }

  async findById(id: string | Types.ObjectId): Promise<UserDocument | null> {
    return this.userModel.findById(id).populate(['role', 'permissions']);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: UserDocument[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.userModel
        .find({ isActive: true })
        .skip(skip)
        .limit(limit)
        .populate(['role', 'permissions'])
        .sort({ createdAt: -1 }),
      this.userModel.countDocuments({ isActive: true }),
    ]);

    return {
      data,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async update(
    id: string | Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.logger.log(`User updated: ${user.email}`, 'UsersService');
    return user;
  }

  async delete(id: string | Types.ObjectId): Promise<void> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.findByIdAndUpdate(id, { isActive: false });
    this.logger.log(`User deactivated: ${user.email}`, 'UsersService');
  }

  async incrementLoginAttempts(userId: Types.ObjectId): Promise<void> {
    const user = await this.userModel.findById(userId);

    if (!user) return;

    const newAttempts = user.loginAttempts + 1;

    if (newAttempts >= this.MAX_LOGIN_ATTEMPTS) {
      const lockUntil = new Date(Date.now() + this.LOCK_DURATION);
      await this.userModel.findByIdAndUpdate(userId, {
        loginAttempts: newAttempts,
        lockUntil,
      });

      this.logger.warn(
        `Account locked: ${user.email}`,
        'UsersService',
      );
    } else {
      await this.userModel.findByIdAndUpdate(userId, {
        loginAttempts: newAttempts,
      });
    }
  }

  async resetLoginAttempts(userId: Types.ObjectId): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      loginAttempts: 0,
      lockUntil: null,
    });
  }

  async updateLastLogin(userId: Types.ObjectId): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      lastLogin: new Date(),
    });
  }

  async assignRole(userId: string, roleId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { role: roleId },
      { new: true },
    );
  }

  async addPermission(userId: string, permissionId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $push: { permissions: permissionId } },
      { new: true },
    );
  }

  async removePermission(userId: string, permissionId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { permissions: permissionId } },
      { new: true },
    );
  }
}
