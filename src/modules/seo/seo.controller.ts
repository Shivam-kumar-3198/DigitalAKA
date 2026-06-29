import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Res,
  Header,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { SeoService } from './seo.service';
import { SitemapService } from './services/sitemap.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('seo')
@Controller('seo')
export class SeoController {
  constructor(
    private readonly seoService: SeoService,
    private readonly sitemapService: SitemapService,
  ) {}

  // SEO Management
  @Post('meta')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create SEO meta data' })
  async createSeo(@Body() createSeoDto: any) {
    return this.seoService.createSeo(createSeoDto);
  }

  @Get('meta/:path')
  @Public()
  @ApiOperation({ summary: 'Get SEO meta data by path' })
  async getSeoByPath(@Param('path') path: string) {
    return this.seoService.getSeoByPath(path);
  }

  @Put('meta/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update SEO meta data' })
  async updateSeo(@Param('id') id: string, @Body() updateSeoDto: any) {
    return this.seoService.updateSeo(id, updateSeoDto);
  }

  @Delete('meta/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete SEO meta data' })
  async deleteSeo(@Param('id') id: string) {
    await this.seoService.deleteSeo(id);
    return { message: 'SEO deleted successfully' };
  }

  // Sitemap
  @Get('sitemap.xml')
  @Public()
  @Header('Content-Type', 'application/xml')
  @ApiOperation({ summary: 'Get XML sitemap' })
  async getSitemapXml(@Res() res: Response) {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const xml = await this.sitemapService.generateXmlSitemap(baseUrl);
    res.send(xml);
  }

  @Get('sitemap.json')
  @Public()
  @ApiOperation({ summary: 'Get JSON sitemap' })
  async getSitemapJson() {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return this.sitemapService.generateJsonSitemap(baseUrl);
  }

  // Redirects
  @Post('redirects')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create redirect' })
  async createRedirect(@Body() createRedirectDto: any) {
    return this.seoService.createRedirect(createRedirectDto);
  }

  @Get('redirects/:fromUrl')
  @Public()
  @ApiOperation({ summary: 'Get redirect by URL' })
  async getRedirect(@Param('fromUrl') fromUrl: string) {
    return this.seoService.getRedirectByUrl(fromUrl);
  }

  @Put('redirects/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update redirect' })
  async updateRedirect(@Param('id') id: string, @Body() updateRedirectDto: any) {
    return this.seoService.updateRedirect(id, updateRedirectDto);
  }

  @Delete('redirects/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete redirect' })
  async deleteRedirect(@Param('id') id: string) {
    await this.seoService.deleteRedirect(id);
    return { message: 'Redirect deleted successfully' };
  }

  @Get('redirects-stats')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get redirect statistics' })
  async getRedirectStats() {
    return this.seoService.getRedirectStats();
  }

  // Structured Data
  @Post('structured-data')
  @Public()
  @ApiOperation({ summary: 'Generate structured data' })
  async generateStructuredData(
    @Body() body: { type: string; data: any },
  ) {
    return this.seoService.generateStructuredData(body.type, body.data);
  }
}
