import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../../database/schemas/blog.schema';
import { CreateBlogDto, UpdateBlogDto, FilterBlogDto } from './dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const slug = this.generateSlug(createBlogDto.title);
    const existingBlog = await this.blogModel.findOne({ slug });
    
    if (existingBlog) {
      throw new ConflictException(`Blog with slug ${slug} already exists`);
    }

    const blog = new this.blogModel({
      ...createBlogDto,
      slug,
      readingTime: this.calculateReadingTime(createBlogDto.content),
    });

    return blog.save();
  }

  async findAll(filterDto: FilterBlogDto): Promise<{ data: Blog[], total: number }> {
    const {
      page = 1,
      limit = 10,
      status = 'published',
      category,
      search,
    } = filterDto;

    const query: any = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search };
    }

    const total = await this.blogModel.countDocuments(query);
    const data = await this.blogModel
      .find(query)
      .populate('author', 'firstName lastName email')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ publishedAt: -1 })
      .exec();

    return { data, total };
  }

  async findById(id: string): Promise<Blog> {
    const blog = await this.blogModel
      .findById(id)
      .populate('author', 'firstName lastName email')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .populate('comments')
      .exec();

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    // Increment views
    await this.blogModel.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return blog;
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogModel
      .findOne({ slug })
      .populate('author', 'firstName lastName email')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .exec();

    if (!blog) {
      throw new NotFoundException(`Blog with slug ${slug} not found`);
    }

    // Increment views
    await this.blogModel.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.findById(id);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    if (updateBlogDto.title && updateBlogDto.title !== blog.title) {
      const newSlug = this.generateSlug(updateBlogDto.title);
      const existingSlug = await this.blogModel.findOne({ slug: newSlug, _id: { $ne: id } });
      if (existingSlug) {
        throw new ConflictException(`Blog with slug ${newSlug} already exists`);
      }
      updateBlogDto['slug'] = newSlug;
    }

    if (updateBlogDto.content) {
      updateBlogDto['readingTime'] = this.calculateReadingTime(updateBlogDto.content);
    }

    return this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.blogModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }

  async like(id: string, userId: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    const alreadyLiked = blog.likedBy?.includes(userId);

    if (alreadyLiked) {
      return this.blogModel.findByIdAndUpdate(
        id,
        { $pull: { likedBy: userId }, $inc: { likes: -1 } },
        { new: true },
      );
    }

    return this.blogModel.findByIdAndUpdate(
      id,
      { $push: { likedBy: userId }, $inc: { likes: 1 } },
      { new: true },
    );
  }

  async publish(id: string): Promise<Blog> {
    const blog = await this.blogModel.findByIdAndUpdate(
      id,
      { status: 'published', publishedAt: new Date() },
      { new: true },
    );

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  async archive(id: string): Promise<Blog> {
    const blog = await this.blogModel.findByIdAndUpdate(
      id,
      { status: 'archived' },
      { new: true },
    );

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private calculateReadingTime(content: string): { minutes: number, words: number } {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return { minutes, words };
  }
}
