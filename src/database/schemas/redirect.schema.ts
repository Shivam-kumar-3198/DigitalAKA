import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Redirect extends Document {
  @Prop({ required: true, unique: true })
  fromUrl: string;

  @Prop({ required: true })
  toUrl: string;

  @Prop({
    type: Number,
    enum: [301, 302, 307, 308],
    default: 301,
  })
  statusCode: number;

  @Prop({ type: String })
  reason?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Date })
  expiresAt?: Date;

  @Prop({ type: Number, default: 0 })
  hitCount: number;

  @Prop({ type: Date })
  lastHitAt?: Date;
}

export const RedirectSchema = SchemaFactory.createForClass(Redirect);
RedirectSchema.index({ fromUrl: 1 });
RedirectSchema.index({ isActive: 1 });
RedirectSchema.index({ toUrl: 1 });
