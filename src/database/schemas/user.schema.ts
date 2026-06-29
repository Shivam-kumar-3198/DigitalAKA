import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ type: Types.ObjectId, ref: 'Role', default: null })
  role: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Permission', default: [] })
  permissions: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: null })
  lastLogin: Date;

  @Prop({ type: [String], default: [] })
  loginHistory: string[];

  @Prop({ type: [String], default: [] })
  deviceTokens: string[];

  @Prop({ default: 0 })
  loginAttempts: number;

  @Prop({ default: null })
  lockUntil: Date;

  @Prop({ default: null })
  twoFactorSecret: string;

  @Prop({ default: false })
  twoFactorEnabled: boolean;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });
