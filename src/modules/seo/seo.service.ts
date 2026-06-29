import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SEO } from '../../database/schemas/seo.schema';
import { Redirect } from '../../database/schemas/redirect.schema';

@Injectable()
export class SeoService {
  constructor(
    @InjectModel(SEO.name) private seoModel: Model<SEO>,
    @InjectModel(Redirect.name) private redirectModel: Model<Redirect>,
  ) {}

  // SEO Management
  async createSeo(createSeoDto: any): Promise<SEO> {
    const existing = await this.seoModel.findOne({ path: createSeoDto.path });

    if (existing) {
      throw new ConflictException(`SEO for path ${createSeoDto.path} already exists`);
    }

    const seo = new this.seoModel(createSeoDto);
    return seo.save();
  }

  async getSeoByPath(path: string): Promise<SEO> {
    const seo = await this.seoModel.findOne({ path });

    if (!seo) {
      throw new NotFoundException(`SEO for path ${path} not found`);
    }

    return seo;
  }

  async updateSeo(id: string, updateSeoDto: any): Promise<SEO> {
    const seo = await this.seoModel.findByIdAndUpdate(
      id,
      updateSeoDto,
      { new: true },
    );

    if (!seo) {
      throw new NotFoundException(`SEO with ID ${id} not found`);
    }

    return seo;
  }

  async deleteSeo(id: string): Promise<void> {
    const result = await this.seoModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`SEO with ID ${id} not found`);
    }
  }

  async getAllSeo(): Promise<SEO[]> {
    return this.seoModel.find({ isActive: true }).exec();
  }

  // Redirect Management
  async createRedirect(createRedirectDto: any): Promise<Redirect> {
    const existing = await this.redirectModel.findOne({ fromUrl: createRedirectDto.fromUrl });

    if (existing) {
      throw new ConflictException(`Redirect from ${createRedirectDto.fromUrl} already exists`);
    }

    const redirect = new this.redirectModel(createRedirectDto);
    return redirect.save();
  }

  async getRedirectByUrl(fromUrl: string): Promise<Redirect> {
    const redirect = await this.redirectModel.findOne({ fromUrl, isActive: true });

    if (redirect) {
      // Increment hit count
      await this.redirectModel.findByIdAndUpdate(
        redirect._id,
        { $inc: { hitCount: 1 }, lastHitAt: new Date() },
      );
    }

    return redirect;
  }

  async updateRedirect(id: string, updateRedirectDto: any): Promise<Redirect> {
    const redirect = await this.redirectModel.findByIdAndUpdate(
      id,
      updateRedirectDto,
      { new: true },
    );

    if (!redirect) {
      throw new NotFoundException(`Redirect with ID ${id} not found`);
    }

    return redirect;
  }

  async deleteRedirect(id: string): Promise<void> {
    const result = await this.redirectModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Redirect with ID ${id} not found`);
    }
  }

  async getAllRedirects(): Promise<Redirect[]> {
    return this.redirectModel.find({ isActive: true }).exec();
  }

  async getRedirectStats(): Promise<any> {
    const stats = await this.redirectModel.aggregate([
      {
        $group: {
          _id: null,
          totalRedirects: { $sum: 1 },
          totalHits: { $sum: '$hitCount' },
          mostUsed: { $max: '$hitCount' },
        },
      },
    ]);

    return stats[0] || {};
  }

  // Structured Data
  async generateStructuredData(type: string, data: any): Promise<any> {
    const schemaTypes: Record<string, any> = {
      article: this.generateArticleSchema(data),
      organization: this.generateOrganizationSchema(data),
      person: this.generatePersonSchema(data),
      product: this.generateProductSchema(data),
      event: this.generateEventSchema(data),
    };

    return schemaTypes[type] || null;
  }

  private generateArticleSchema(data: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.title,
      description: data.description,
      image: data.image,
      datePublished: data.publishedDate,
      dateModified: data.modifiedDate,
      author: {
        '@type': 'Person',
        name: data.authorName,
      },
    };
  }

  private generateOrganizationSchema(data: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      url: data.url,
      logo: data.logo,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        telephone: data.phone,
        email: data.email,
      },
    };
  }

  private generatePersonSchema(data: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.name,
      url: data.url,
      image: data.image,
      jobTitle: data.jobTitle,
    };
  }

  private generateProductSchema(data: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      image: data.image,
      brand: {
        '@type': 'Brand',
        name: data.brand,
      },
      offers: {
        '@type': 'Offer',
        url: data.url,
        priceCurrency: data.currency,
        price: data.price,
      },
    };
  }

  private generateEventSchema(data: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      location: {
        '@type': 'Place',
        name: data.location,
      },
    };
  }
}
