import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tag extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  color?: string;

  @Prop({ type: Number, default: 0 })
  postCount: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
TagSchema.index({ slug: 1 });
TagSchema.index({ name: 1 });
