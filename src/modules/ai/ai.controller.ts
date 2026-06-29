import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('ai')
@Controller('ai')
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // Blog Generation
  @Post('generate-blog')
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Generate blog content' })
  async generateBlog(
    @Body() body: { prompt: string; tone?: string; length?: string },
    @CurrentUser() user: any,
  ) {
    return this.aiService.generateBlog(body.prompt, user._id, {
      tone: body.tone,
      length: body.length,
    });
  }

  @Post('generate-blog-outline')
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Generate blog outline' })
  async generateBlogOutline(
    @Body() body: { topic: string; tone?: string },
    @CurrentUser() user: any,
  ) {
    return this.aiService.generateBlogOutline(body.topic, user._id, {
      tone: body.tone,
    });
  }

  @Post('generate-blog-titles')
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Generate blog title suggestions' })
  async generateBlogTitles(
    @Body() body: { topic: string; count?: number },
    @CurrentUser() user: any,
  ) {
    return this.aiService.generateBlogTitles(body.topic, user._id, body.count);
  }

  // Meta Generation
  @Post('generate-meta')
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Generate meta description or keywords' })
  async generateMeta(
    @Body() body: { content: string; type?: string },
    @CurrentUser() user: any,
  ) {
    return this.aiService.generateMeta(body.content, user._id, body.type);
  }

  @Post('generate-og-tags')
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Generate Open Graph tags' })
  async generateOgTags(
    @Body() body: { title: string; description: string; imageUrl: string },
    @CurrentUser() user: any,
  ) {
    return this.aiService.generateOgTags(
      body.title,
      body.description,
      body.imageUrl,
      user._id,
    );
  }

  // Content Management
  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Get AI generated content by user' })
  async getMyContent(@CurrentUser() user: any) {
    return this.aiService.getContentByUser(user._id);
  }

  @Get('by-type/:type')
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Get AI content by type' })
  async getContentByType(@Param('type') type: string) {
    return this.aiService.getContentByType(type);
  }

  @Get('pending')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get pending AI content for review' })
  async getPendingContent() {
    return this.aiService.getPendingContent();
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get AI content statistics' })
  async getContentStats() {
    return this.aiService.getContentStats();
  }

  @Patch(':id/approve')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Approve AI generated content' })
  async approveContent(@Param('id') id: string, @CurrentUser() user: any) {
    return this.aiService.approveContent(id, user._id);
  }

  @Patch(':id/reject')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Reject AI generated content' })
  async rejectContent(
    @Param('id') id: string,
    @Body() body: { feedback: string },
    @CurrentUser() user: any,
  ) {
    return this.aiService.rejectContent(id, user._id, body.feedback);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Delete AI generated content' })
  async deleteContent(@Param('id') id: string) {
    await this.aiService.deleteContent(id);
    return { message: 'AI content deleted successfully' };
  }
}
