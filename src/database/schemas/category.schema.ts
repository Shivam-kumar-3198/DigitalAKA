import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  icon?: string;

  @Prop({ type: String })
  color?: string;

  @Prop({ type: Number, default: 0 })
  displayOrder: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  parent?: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Category' })
  children?: Types.ObjectId[];

  @Prop({ type: Number, default: 0 })
  postCount: number;

  @Prop({ type: Object })
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ slug: 1 });
CategorySchema.index({ isActive: 1 });
