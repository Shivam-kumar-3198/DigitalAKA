import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../../../database/schemas/blog.schema';
import { Page } from '../../../database/schemas/page.schema';

@Injectable()
export class SitemapService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
  ) {}

  async generateXmlSitemap(baseUrl: string): Promise<string> {
    const blogs = await this.blogModel
      .find({ status: 'published' })
      .select('slug publishedAt updatedAt')
      .exec();

    const pages = await this.pageModel
      .find({ status: 'published' })
      .select('slug updatedAt')
      .exec();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add homepage
    xml += this.generateUrlEntry(baseUrl, new Date(), 'weekly', '1.0');

    // Add blog posts
    blogs.forEach(blog => {
      const url = `${baseUrl}/blog/${blog.slug}`;
      const lastmod = blog.updatedAt || blog.publishedAt;
      xml += this.generateUrlEntry(url, lastmod, 'weekly', '0.8');
    });

    // Add pages
    pages.forEach(page => {
      const url = `${baseUrl}/page/${page.slug}`;
      xml += this.generateUrlEntry(url, page.updatedAt, 'monthly', '0.7');
    });

    xml += '</urlset>';
    return xml;
  }

  async generateJsonSitemap(baseUrl: string): Promise<any> {
    const blogs = await this.blogModel
      .find({ status: 'published' })
      .select('slug publishedAt updatedAt')
      .exec();

    const pages = await this.pageModel
      .find({ status: 'published' })
      .select('slug updatedAt')
      .exec();

    const urls = [];

    // Add homepage
    urls.push({
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0,
    });

    // Add blog posts
    blogs.forEach(blog => {
      urls.push({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastmod: (blog.updatedAt || blog.publishedAt).toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

    // Add pages
    pages.forEach(page => {
      urls.push({
        url: `${baseUrl}/page/${page.slug}`,
        lastmod: page.updatedAt.toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      });
    });

    return {
      urlset: {
        url: urls,
      },
    };
  }

  private generateUrlEntry(
    url: string,
    lastmod: Date,
    changefreq: string,
    priority: number,
  ): string {
    const formattedDate = lastmod.toISOString().split('T')[0];
    return (
      `  <url>\n` +
      `    <loc>${url}</loc>\n` +
      `    <lastmod>${formattedDate}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>\n`
    );
  }
}
