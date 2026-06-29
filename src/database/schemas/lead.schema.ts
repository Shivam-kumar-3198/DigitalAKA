import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Lead extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: String })
  company?: string;

  @Prop({ type: String })
  jobTitle?: string;

  @Prop({ type: String })
  country?: string;

  @Prop({ type: String })
  message?: string;

  @Prop({ type: String })
  source?: string;

  @Prop({
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'rejected'],
    default: 'new',
  })
  status: string;

  @Prop({ type: Number, default: 0 })
  score: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo?: Types.ObjectId;

  @Prop({ type: [Object] })
  activities?: Array<{
    type: string;
    description: string;
    timestamp: Date;
  }>;

  @Prop({ type: Date })
  convertedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  convertedBy?: Types.ObjectId;

  @Prop({ type: Object })
  customFields?: Record<string, any>;

  @Prop({ type: [String] })
  tags?: string[];
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
LeadSchema.index({ email: 1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ assignedTo: 1 });
LeadSchema.index({ score: -1 });
LeadSchema.index({ createdAt: -1 });
