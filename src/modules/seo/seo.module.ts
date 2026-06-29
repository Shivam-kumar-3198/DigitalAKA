import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SEO, SEOSchema } from '../../database/schemas/seo.schema';
import { Redirect, RedirectSchema } from '../../database/schemas/redirect.schema';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { SitemapService } from './services/sitemap.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SEO.name, schema: SEOSchema },
      { name: Redirect.name, schema: RedirectSchema },
    ]),
  ],
  providers: [SeoService, SitemapService],
  controllers: [SeoController],
  exports: [SeoService, SitemapService],
})
export class SeoModule {}
