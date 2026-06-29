import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Page extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ type: String })
  excerpt?: string;

  @Prop({ type: String })
  featuredImage?: string;

  @Prop({ type: String, enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop({ type: Date })
  publishedAt?: Date;

  @Prop({ type: Boolean, default: false })
  isHomePage: boolean;

  @Prop({ type: Boolean, default: true })
  showInMenu: boolean;

  @Prop({ type: Number, default: 0 })
  menuOrder: number;

  @Prop({ type: Types.ObjectId, ref: 'Page' })
  parent?: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Page' })
  children?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy?: Types.ObjectId;

  @Prop({ type: Object })
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
  };

  @Prop({ type: [Object] })
  sections?: Array<{
    type: string;
    content: string;
    order: number;
  }>;

  @Prop({ type: Number, default: 0 })
  views: number;
}

export const PageSchema = SchemaFactory.createForClass(Page);
PageSchema.index({ slug: 1 });
PageSchema.index({ status: 1 });
PageSchema.index({ isHomePage: 1 });
PageSchema.index({ title: 'text', content: 'text' });
