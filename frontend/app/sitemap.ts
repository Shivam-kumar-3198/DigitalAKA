import type { MetadataRoute } from 'next';
import { getAllPosts, getAllPages } from '@/lib/wordpress';
import { PORTFOLIO } from '@/lib/constants';

const BASE_URL = 'https://digitalaka.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/email-marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/bulk-email-services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/smtp-server-services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/bulk-sms-marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/voice-sms-service`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/super-email-reseller`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/bulk-email-reseller-plan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/smtp-inr-pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/bulk-email-services-plan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/voice-sms-service-plan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/seo-packages`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sms-plan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const portfolioPages: MetadataRoute.Sitemap = PORTFOLIO.map((item) => ({
    url: `${BASE_URL}/portfolio/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Paginate through all WordPress posts
  let blogPages: MetadataRoute.Sitemap = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { posts, totalPages: tp } = await getAllPosts({ page, perPage: 100 });
    totalPages = tp;

    for (const post of posts) {
      blogPages.push({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.modified),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    page++;
  } while (page <= totalPages && totalPages > 0);

  // WordPress pages (about, services, etc. if managed in WP)
  const wpPages = await getAllPages();
  const wpPageEntries: MetadataRoute.Sitemap = wpPages.map((p) => ({
    url: `${BASE_URL}/pages/${p.slug}`,
    lastModified: new Date(p.modified),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...portfolioPages, ...blogPages, ...wpPageEntries];
}
