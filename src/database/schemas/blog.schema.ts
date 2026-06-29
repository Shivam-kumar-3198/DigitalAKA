import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ type: String })
  excerpt?: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category?: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Tag' })
  tags?: Types.ObjectId[];

  @Prop({ type: String })
  featuredImage?: string;

  @Prop({ type: String, enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop({ type: Date })
  publishedAt?: Date;

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likedBy?: Types.ObjectId[];

  @Prop({ type: Boolean, default: true })
  commentEnabled: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments?: Types.ObjectId[];

  @Prop({ type: Object })
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };

  @Prop({ type: Object })
  readingTime?: {
    minutes: number;
    words: number;
  };

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy?: Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
BlogSchema.index({ slug: 1 });
BlogSchema.index({ author: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ status: 1 });
BlogSchema.index({ publishedAt: -1 });
