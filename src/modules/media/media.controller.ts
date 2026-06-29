import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a file' })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    if (!file) {
      throw new Error('No file provided');
    }

    // TODO: Upload to Cloudinary or storage service
    // This is a placeholder - actual implementation would integrate with Cloudinary

    return this.mediaService.create(
      file.filename,
      file.originalname,
      file.path,
      this.getFileType(file.mimetype),
      file.mimetype,
      file.size,
      user._id,
      {
        format: file.mimetype,
      },
    );
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all media' })
  async findAll(@Query() filter?: any) {
    return this.mediaService.findAll(filter);
  }

  @Get('stats')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get media statistics' })
  async getStats() {
    return this.mediaService.getStats();
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search media' })
  async search(@Query('q') query: string) {
    if (!query) {
      throw new Error('Search query is required');
    }
    return this.mediaService.search(query);
  }

  @Get('folder/:folder')
  @Public()
  @ApiOperation({ summary: 'Get media by folder' })
  async getByFolder(@Param('folder') folder: string) {
    return this.mediaService.getByFolder(folder);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get media by ID' })
  async findById(@Param('id') id: string) {
    return this.mediaService.findById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Update media' })
  async update(@Param('id') id: string, @Body() updateMediaDto: any) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Post(':id/tag')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Add tag to media' })
  async addTag(@Param('id') id: string, @Body('tag') tag: string) {
    return this.mediaService.addTag(id, tag);
  }

  @Delete(':id/tag/:tag')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Remove tag from media' })
  async removeTag(@Param('id') id: string, @Param('tag') tag: string) {
    return this.mediaService.removeTag(id, tag);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete media' })
  async delete(@Param('id') id: string) {
    await this.mediaService.delete(id);
    return { message: 'Media deleted successfully' };
  }

  private getFileType(
    mimeType: string,
  ): 'image' | 'video' | 'audio' | 'document' {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  }
}
