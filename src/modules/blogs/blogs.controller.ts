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
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto, FilterBlogDto } from './dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'Blog created successfully' })
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @CurrentUser() user: any,
  ) {
    return this.blogsService.create({
      ...createBlogDto,
      author: user._id,
    });
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'List of blogs' })
  async findAll(@Query() filterDto: FilterBlogDto) {
    return this.blogsService.findAll(filterDto);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get blog by slug' })
  @ApiResponse({ status: 200, description: 'Blog found' })
  async findBySlug(@Param('slug') slug: string) {
    return this.blogsService.findBySlug(slug);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get blog by ID' })
  @ApiResponse({ status: 200, description: 'Blog found' })
  async findById(@Param('id') id: string) {
    return this.blogsService.findById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Update a blog' })
  @ApiResponse({ status: 200, description: 'Blog updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @CurrentUser() user: any,
  ) {
    return this.blogsService.update(id, {
      ...updateBlogDto,
      updatedBy: user._id,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a blog' })
  @ApiResponse({ status: 200, description: 'Blog deleted successfully' })
  async delete(@Param('id') id: string) {
    await this.blogsService.delete(id);
    return { message: 'Blog deleted successfully' };
  }

  @Post(':id/like')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like a blog' })
  @ApiResponse({ status: 200, description: 'Blog liked' })
  async like(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blogsService.like(id, user._id);
  }

  @Patch(':id/publish')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Publish a blog' })
  @ApiResponse({ status: 200, description: 'Blog published' })
  async publish(@Param('id') id: string) {
    return this.blogsService.publish(id);
  }

  @Patch(':id/archive')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Archive a blog' })
  @ApiResponse({ status: 200, description: 'Blog archived' })
  async archive(@Param('id') id: string) {
    return this.blogsService.archive(id);
  }
}
