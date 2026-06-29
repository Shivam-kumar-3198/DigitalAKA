import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true, collection: 'permissions' })
export class Permission {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  module: string;

  @Prop({ required: true })
  action: string;

  @Prop({ default: false })
  isSystem: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);

// Indexes
PermissionSchema.index({ name: 1 });
PermissionSchema.index({ module: 1, action: 1 });
PermissionSchema.index({ isActive: 1 });
