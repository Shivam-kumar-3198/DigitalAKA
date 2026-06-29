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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PagesService } from './pages.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Create a new page' })
  async create(
    @Body() createPageDto: any,
    @CurrentUser() user: any,
  ) {
    return this.pagesService.create({
      ...createPageDto,
      author: user._id,
    });
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all pages' })
  async findAll(@Query() filter?: any) {
    return this.pagesService.findAll(filter);
  }

  @Get('home')
  @Public()
  @ApiOperation({ summary: 'Get home page' })
  async getHomePage() {
    return this.pagesService.getHomePage();
  }

  @Get('menu')
  @Public()
  @ApiOperation({ summary: 'Get menu pages' })
  async getMenuPages() {
    return this.pagesService.getMenuPages();
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get page by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get page by ID' })
  async findById(@Param('id') id: string) {
    return this.pagesService.findById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin', 'editor')
  @ApiOperation({ summary: 'Update a page' })
  async update(
    @Param('id') id: string,
    @Body() updatePageDto: any,
    @CurrentUser() user: any,
  ) {
    return this.pagesService.update(id, {
      ...updatePageDto,
      updatedBy: user._id,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a page' })
  async delete(@Param('id') id: string) {
    await this.pagesService.delete(id);
    return { message: 'Page deleted successfully' };
  }
}
