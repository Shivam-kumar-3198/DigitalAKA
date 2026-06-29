import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Analytics extends Document {
  @Prop({ required: true })
  path: string;

  @Prop({ type: String })
  userId?: string;

  @Prop({ type: String })
  sessionId: string;

  @Prop({ type: String })
  userAgent: string;

  @Prop({ type: String })
  ipAddress: string;

  @Prop({ type: Object })
  location?: {
    country?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };

  @Prop({ type: String })
  referrer?: string;

  @Prop({ type: Number })
  duration?: number;

  @Prop({ type: String })
  device?: string;

  @Prop({ type: String })
  browser?: string;

  @Prop({ type: String })
  os?: string;

  @Prop({ type: String })
  eventType?: string;

  @Prop({ type: Object })
  metadata?: any;

  @Prop({ type: String, enum: ['page_view', 'click', 'scroll', 'form_submit', 'custom'] })
  type: string;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
AnalyticsSchema.index({ path: 1 });
AnalyticsSchema.index({ sessionId: 1 });
AnalyticsSchema.index({ userId: 1 });
AnalyticsSchema.index({ type: 1 });
AnalyticsSchema.index({ createdAt: -1 });
AnalyticsSchema.index({ 'location.country': 1 });
