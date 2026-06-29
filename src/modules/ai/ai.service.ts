import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AIContent } from '../../database/schemas/ai-content.schema';
import { BlogGeneratorService } from './services/blog-generator.service';
import { MetaGeneratorService } from './services/meta-generator.service';

@Injectable()
export class AiService {
  constructor(
    @InjectModel(AIContent.name) private aiContentModel: Model<AIContent>,
    private blogGeneratorService: BlogGeneratorService,
    private metaGeneratorService: MetaGeneratorService,
  ) {}

  async generateBlog(
    prompt: string,
    userId: string,
    parameters?: any,
  ): Promise<AIContent> {
    // Generate blog content
    const generatedContent = await this.blogGeneratorService.generateBlogContent(
      prompt,
      parameters?.tone,
      parameters?.length,
    );

    const aiContent = new this.aiContentModel({
      type: 'blog',
      prompt,
      generatedContent,
      generatedBy: userId,
      parameters,
      model: 'gpt-4',
      status: 'pending',
    });

    return aiContent.save();
  }

  async generateBlogOutline(
    prompt: string,
    userId: string,
    parameters?: any,
  ): Promise<any> {
    const outline = await this.blogGeneratorService.generateBlogOutline(
      prompt,
      parameters?.tone,
    );

    return {
      prompt,
      generatedBy: userId,
      outline,
    };
  }

  async generateBlogTitles(
    topic: string,
    userId: string,
    count: number = 5,
  ): Promise<any> {
    const titles = await this.blogGeneratorService.generateBlogTitle(topic, count);

    return {
      topic,
      titles,
      generatedBy: userId,
    };
  }

  async generateMeta(
    content: string,
    userId: string,
    type: string = 'description',
  ): Promise<AIContent> {
    let generatedContent: string;

    if (type === 'description') {
      generatedContent = await this.metaGeneratorService.generateMetaDescription(content);
    } else if (type === 'keywords') {
      const keywords = await this.metaGeneratorService.generateMetaKeywords(content);
      generatedContent = keywords.join(', ');
    }

    const aiContent = new this.aiContentModel({
      type: 'meta',
      prompt: content,
      generatedContent,
      generatedBy: userId,
      parameters: { type },
      model: 'gpt-4',
      status: 'pending',
    });

    return aiContent.save();
  }

  async generateOgTags(
    title: string,
    description: string,
    imageUrl: string,
    userId: string,
  ): Promise<any> {
    const ogTags = await this.metaGeneratorService.generateOgTags(
      title,
      description,
      imageUrl,
    );

    return {
      userId,
      ogTags,
    };
  }

  async approveContent(id: string, userId: string): Promise<AIContent> {
    const content = await this.aiContentModel.findByIdAndUpdate(
      id,
      { status: 'approved', reviewedBy: userId, reviewedAt: new Date() },
      { new: true },
    );

    if (!content) {
      throw new NotFoundException(`AI Content with ID ${id} not found`);
    }

    return content;
  }

  async rejectContent(
    id: string,
    userId: string,
    feedback: string,
  ): Promise<AIContent> {
    const content = await this.aiContentModel.findByIdAndUpdate(
      id,
      {
        status: 'rejected',
        reviewedBy: userId,
        reviewedAt: new Date(),
        feedback,
      },
      { new: true },
    );

    if (!content) {
      throw new NotFoundException(`AI Content with ID ${id} not found`);
    }

    return content;
  }

  async getContentByUser(userId: string): Promise<AIContent[]> {
    return this.aiContentModel
      .find({ generatedBy: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getContentByType(type: string): Promise<AIContent[]> {
    return this.aiContentModel
      .find({ type })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getPendingContent(): Promise<AIContent[]> {
    return this.aiContentModel
      .find({ status: 'pending' })
      .populate('generatedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async deleteContent(id: string): Promise<void> {
    const result = await this.aiContentModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`AI Content with ID ${id} not found`);
    }
  }

  async getContentStats(): Promise<any> {
    const stats = await this.aiContentModel.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          approved: {
            $sum: {
              $cond: [{ $eq: ['$status', 'approved'] }, 1, 0],
            },
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, 1, 0],
            },
          },
          rejected: {
            $sum: {
              $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0],
            },
          },
        },
      },
    ]);

    return stats;
  }
}
