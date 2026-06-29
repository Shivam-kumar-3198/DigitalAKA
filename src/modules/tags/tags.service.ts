import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from '../../database/schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
  ) {}

  async create(createTagDto: any): Promise<Tag> {
    const slug = this.generateSlug(createTagDto.name);
    const existing = await this.tagModel.findOne({ slug });

    if (existing) {
      throw new ConflictException(`Tag with slug ${slug} already exists`);
    }

    const tag = new this.tagModel({
      ...createTagDto,
      slug,
    });

    return tag.save();
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel
      .find({ isActive: true })
      .sort({ name: 1 })
      .exec();
  }

  async findById(id: string): Promise<Tag> {
    const tag = await this.tagModel.findById(id);

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  async update(id: string, updateTagDto: any): Promise<Tag> {
    const tag = await this.tagModel.findByIdAndUpdate(
      id,
      updateTagDto,
      { new: true },
    );

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  async delete(id: string): Promise<void> {
    const result = await this.tagModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  async incrementPostCount(id: string): Promise<void> {
    await this.tagModel.findByIdAndUpdate(
      id,
      { $inc: { postCount: 1 } },
    );
  }

  async decrementPostCount(id: string): Promise<void> {
    await this.tagModel.findByIdAndUpdate(
      id,
      { $inc: { postCount: -1 } },
    );
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
