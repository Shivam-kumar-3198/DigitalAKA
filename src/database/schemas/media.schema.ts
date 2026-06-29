import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Media extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: String })
  cloudinaryId?: string;

  @Prop({ required: true, enum: ['image', 'video', 'audio', 'document'] })
  type: string;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  size: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  uploadedBy: Types.ObjectId;

  @Prop({ type: String })
  title?: string;

  @Prop({ type: String })
  alt?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ type: String })
  folder?: string;

  @Prop({ type: Object })
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    format?: string;
    colorSpace?: string;
  };

  @Prop({ type: Boolean, default: false })
  isPublic: boolean;

  @Prop({ type: Number, default: 0 })
  downloadCount: number;

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: [Types.ObjectId], ref: 'Blog' })
  usedInBlogs?: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Page' })
  usedInPages?: Types.ObjectId[];
}

export const MediaSchema = SchemaFactory.createForClass(Media);
MediaSchema.index({ uploadedBy: 1 });
MediaSchema.index({ type: 1 });
MediaSchema.index({ folder: 1 });
MediaSchema.index({ tags: 1 });
MediaSchema.index({ filename: 'text', title: 'text' });
