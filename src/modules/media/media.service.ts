import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media } from '../../database/schemas/media.schema';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<Media>,
  ) {}

  async create(
    filename: string,
    originalName: string,
    url: string,
    type: string,
    mimeType: string,
    size: number,
    userId: string,
    metadata?: any,
  ): Promise<Media> {
    const media = new this.mediaModel({
      filename,
      originalName,
      url,
      type,
      mimeType,
      size,
      uploadedBy: userId,
      metadata,
    });

    return media.save();
  }

  async findAll(filter?: any): Promise<Media[]> {
    const query: any = {};

    if (filter?.type) query.type = filter.type;
    if (filter?.folder) query.folder = filter.folder;
    if (filter?.uploadedBy) query.uploadedBy = filter.uploadedBy;
    if (filter?.isPublic !== undefined) query.isPublic = filter.isPublic;

    return this.mediaModel
      .find(query)
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<Media> {
    const media = await this.mediaModel.findById(id);

    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    // Increment views
    await this.mediaModel.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return media;
  }

  async search(query: string): Promise<Media[]> {
    return this.mediaModel
      .find({
        $text: { $search: query },
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updateMediaDto: any): Promise<Media> {
    const media = await this.mediaModel.findByIdAndUpdate(
      id,
      updateMediaDto,
      { new: true },
    );

    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    return media;
  }

  async delete(id: string): Promise<void> {
    const result = await this.mediaModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    // TODO: Delete from Cloudinary or storage
  }

  async getByFolder(folder: string): Promise<Media[]> {
    return this.mediaModel
      .find({ folder })
      .sort({ createdAt: -1 })
      .exec();
  }

  async addTag(id: string, tag: string): Promise<Media> {
    const media = await this.mediaModel.findByIdAndUpdate(
      id,
      { $addToSet: { tags: tag } },
      { new: true },
    );

    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    return media;
  }

  async removeTag(id: string, tag: string): Promise<Media> {
    const media = await this.mediaModel.findByIdAndUpdate(
      id,
      { $pull: { tags: tag } },
      { new: true },
    );

    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    return media;
  }

  async incrementDownloadCount(id: string): Promise<void> {
    await this.mediaModel.findByIdAndUpdate(
      id,
      { $inc: { downloadCount: 1 } },
    );
  }

  async getStats(): Promise<any> {
    const stats = await this.mediaModel.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalSize: { $sum: '$size' },
        },
      },
    ]);

    return stats;
  }
}
