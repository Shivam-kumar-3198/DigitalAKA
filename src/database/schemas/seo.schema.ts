import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SEO extends Document {
  @Prop({ required: true, unique: true })
  path: string;

  @Prop({ required: true })
  metaTitle: string;

  @Prop({ required: true })
  metaDescription: string;

  @Prop({ type: [String] })
  keywords?: string[];

  @Prop({ type: String })
  ogTitle?: string;

  @Prop({ type: String })
  ogDescription?: string;

  @Prop({ type: String })
  ogImage?: string;

  @Prop({ type: String })
  ogType?: string;

  @Prop({ type: String })
  twitterCard?: string;

  @Prop({ type: String })
  twitterImage?: string;

  @Prop({ type: String })
  canonicalUrl?: string;

  @Prop({ type: Boolean, default: false })
  noindex: boolean;

  @Prop({ type: Boolean, default: false })
  nofollow: boolean;

  @Prop({ type: String })
  robots?: string;

  @Prop({ type: Object })
  structuredData?: any;

  @Prop({ type: String })
  hrefLang?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const SEOSchema = SchemaFactory.createForClass(SEO);
SEOSchema.index({ path: 1 });
SEOSchema.index({ isActive: 1 });
