import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Blog' })
  blog?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  parent?: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Comment' })
  replies?: Types.ObjectId[];

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  likedBy?: Types.ObjectId[];

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected', 'spam'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: Boolean, default: false })
  isEdited: boolean;

  @Prop({ type: String })
  editedReason?: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.index({ blog: 1, status: 1 });
CommentSchema.index({ author: 1 });
CommentSchema.index({ parent: 1 });
CommentSchema.index({ createdAt: -1 });
