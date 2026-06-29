import { Injectable } from '@nestjs/common';

@Injectable()
export class MetaGeneratorService {
  async generateMetaDescription(
    content: string,
    maxLength: number = 160,
  ): Promise<string> {
    // Extract key information and generate meta description
    // This would integrate with OpenAI API

    const words = content.split(' ');
    const summary = words.slice(0, 20).join(' ');

    return summary.substring(0, maxLength);
  }

  async generateMetaKeywords(content: string, count: number = 5): Promise<string[]> {
    // Extract and generate relevant keywords
    // This would use NLP or OpenAI API

    return [
      'keyword1',
      'keyword2',
      'keyword3',
      'keyword4',
      'keyword5',
    ].slice(0, count);
  }

  async generateOgTags(
    title: string,
    description: string,
    imageUrl: string,
  ): Promise<any> {
    return {
      ogTitle: title,
      ogDescription: description,
      ogImage: imageUrl,
      ogType: 'article',
      ogUrl: '', // Will be set by caller
    };
  }

  async generateTwitterCard(
    title: string,
    description: string,
    imageUrl: string,
  ): Promise<any> {
    return {
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: imageUrl,
      twitterCreator: '@yourtwitterhandle',
    };
  }

  async generateMetaTitleVariations(
    baseTitle: string,
    count: number = 3,
  ): Promise<string[]> {
    // Generate variations of meta titles for A/B testing
    // Typically 50-60 characters for optimal display

    return [
      baseTitle,
      `${baseTitle} | Your Brand`,
      `${baseTitle} - Best Guide 2024`,
    ].slice(0, count);
  }

  async analyzeMetaTags(metaTitle: string, metaDescription: string): Promise<any> {
    return {
      title: {
        length: metaTitle.length,
        optimal: metaTitle.length >= 30 && metaTitle.length <= 60,
        feedback: this.getTitleFeedback(metaTitle.length),
      },
      description: {
        length: metaDescription.length,
        optimal: metaDescription.length >= 120 && metaDescription.length <= 160,
        feedback: this.getDescriptionFeedback(metaDescription.length),
      },
    };
  }

  private getTitleFeedback(length: number): string {
    if (length < 30) return 'Title is too short. Aim for 30-60 characters.';
    if (length > 60) return 'Title is too long. Keep it under 60 characters.';
    return 'Title length is optimal.';
  }

  private getDescriptionFeedback(length: number): string {
    if (length < 120) return 'Description is too short. Aim for 120-160 characters.';
    if (length > 160) return 'Description is too long. Keep it under 160 characters.';
    return 'Description length is optimal.';
  }
}
