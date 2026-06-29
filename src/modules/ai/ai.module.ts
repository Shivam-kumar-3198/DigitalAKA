import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AIContent, AIContentSchema } from '../../database/schemas/ai-content.schema';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { BlogGeneratorService } from './services/blog-generator.service';
import { MetaGeneratorService } from './services/meta-generator.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AIContent.name, schema: AIContentSchema },
    ]),
  ],
  providers: [AiService, BlogGeneratorService, MetaGeneratorService],
  controllers: [AiController],
  exports: [AiService, BlogGeneratorService, MetaGeneratorService],
})
export class AiModule {}
