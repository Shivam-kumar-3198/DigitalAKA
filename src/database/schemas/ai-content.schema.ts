import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AIContent extends Document {
  @Prop({ required: true, enum: ['blog', 'meta', 'title', 'description', 'email', 'social'] })
  type: string;

  @Prop({ required: true })
  prompt: string;

  @Prop({ required: true, type: String })
  generatedContent: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  generatedBy: Types.ObjectId;

  @Prop({ type: Object })
  parameters?: {
    tone?: string;
    length?: string;
    language?: string;
    keywords?: string[];
    style?: string;
  };

  @Prop({ type: String })
  model?: string;

  @Prop({ type: Number })
  tokensUsed?: number;

  @Prop({ type: Number })
  confidence?: number;

  @Prop({ type: String, enum: ['pending', 'approved', 'rejected', 'archived'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Blog' })
  associatedBlog?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Page' })
  associatedPage?: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  rating?: number;

  @Prop({ type: String })
  feedback?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  reviewedBy?: Types.ObjectId;

  @Prop({ type: Date })
  reviewedAt?: Date;
}

export const AIContentSchema = SchemaFactory.createForClass(AIContent);
AIContentSchema.index({ type: 1 });
AIContentSchema.index({ generatedBy: 1 });
AIContentSchema.index({ status: 1 });
AIContentSchema.index({ createdAt: -1 });
