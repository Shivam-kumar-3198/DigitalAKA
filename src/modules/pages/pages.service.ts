import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from '../../database/schemas/page.schema';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,
  ) {}

  async create(createPageDto: any): Promise<Page> {
    const slug = this.generateSlug(createPageDto.title);
    const existing = await this.pageModel.findOne({ slug });

    if (existing) {
      throw new ConflictException(`Page with slug ${slug} already exists`);
    }

    const page = new this.pageModel({
      ...createPageDto,
      slug,
    });

    return page.save();
  }

  async findAll(filter?: any): Promise<Page[]> {
    const query: any = {};

    if (filter?.status) query.status = filter.status;
    if (filter?.showInMenu) query.showInMenu = filter.showInMenu;

    return this.pageModel
      .find(query)
      .sort({ menuOrder: 1 })
      .exec();
  }

  async findById(id: string): Promise<Page> {
    const page = await this.pageModel.findById(id);

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    // Increment views
    await this.pageModel.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return page;
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pageModel.findOne({ slug });

    if (!page) {
      throw new NotFoundException(`Page with slug ${slug} not found`);
    }

    // Increment views
    await this.pageModel.findByIdAndUpdate(page._id, { $inc: { views: 1 } });

    return page;
  }

  async getHomePage(): Promise<Page> {
    const page = await this.pageModel.findOne({ isHomePage: true, status: 'published' });

    if (!page) {
      throw new NotFoundException('Home page not found');
    }

    // Increment views
    await this.pageModel.findByIdAndUpdate(page._id, { $inc: { views: 1 } });

    return page;
  }

  async update(id: string, updatePageDto: any): Promise<Page> {
    if (updatePageDto.title) {
      updatePageDto.slug = this.generateSlug(updatePageDto.title);
    }

    const page = await this.pageModel.findByIdAndUpdate(
      id,
      updatePageDto,
      { new: true },
    );

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    return page;
  }

  async delete(id: string): Promise<void> {
    const result = await this.pageModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
  }

  async getMenuPages(): Promise<Page[]> {
    return this.pageModel
      .find({ showInMenu: true, status: 'published' })
      .select('title slug menuOrder')
      .sort({ menuOrder: 1 })
      .exec();
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
