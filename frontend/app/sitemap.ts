import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllPosts, getAllPages } from '@/lib/wordpress';
import { PORTFOLIO } from '@/lib/constants';

const BASE_URL = 'https://digitalaka.com';

/**
 * Returns the actual last-modified time of a page file.
 * Pass the route segment relative to /app, e.g. 'about' or 'bulk-email-services'.
 * Pass '' for the root page (/).
 * Falls back to the current build date if the file cannot be read.
 */
function fileMtime(route: string): Date {
  const segments = route ? route.split('/').filter(Boolean) : [];
  const filePath = path.join(process.cwd(), 'app', ...segments, 'page.tsx');
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                    lastModified: fileMtime(''),                        changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,                         lastModified: fileMtime('about'),                   changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`,                      lastModified: fileMtime('services'),                changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/team`,                          lastModified: fileMtime('team'),                    changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/reviews`,                       lastModified: fileMtime('reviews'),                 changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/portfolio`,                     lastModified: fileMtime('portfolio'),               changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`,                          lastModified: fileMtime('blog'),                    changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/contact`,                       lastModified: fileMtime('contact'),                 changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE_URL}/pricing`,                       lastModified: fileMtime('pricing'),                 changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/email-marketing`,               lastModified: fileMtime('email-marketing'),         changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/bulk-email-services`,           lastModified: fileMtime('bulk-email-services'),     changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/smtp-server-services`,          lastModified: fileMtime('smtp-server-services'),    changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/bulk-sms-marketing`,            lastModified: fileMtime('bulk-sms-marketing'),      changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/voice-sms-service`,             lastModified: fileMtime('voice-sms-service'),       changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/super-email-reseller`,          lastModified: fileMtime('super-email-reseller'),    changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/bulk-email-reseller-plan`,      lastModified: fileMtime('bulk-email-reseller-plan'),changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/smtp-inr-pricing`,              lastModified: fileMtime('smtp-inr-pricing'),        changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/bulk-email-services-plan`,      lastModified: fileMtime('bulk-email-services-plan'),changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/voice-sms-service-plan`,        lastModified: fileMtime('voice-sms-service-plan'),  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/seo-packages`,                  lastModified: fileMtime('seo-packages'),            changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sms-plan`,                      lastModified: fileMtime('sms-plan'),                changeFrequency: 'monthly', priority: 0.8 },
  ];

  const portfolioPages: MetadataRoute.Sitemap = PORTFOLIO.map((item) => ({
    url: `${BASE_URL}/portfolio/${item.slug}`,
    lastModified: fileMtime(`portfolio/${item.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Blog posts — use WordPress post.modified (already accurate)
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

  // WordPress pages — use WordPress page.modified (already accurate)
  const wpPages = await getAllPages();
  const wpPageEntries: MetadataRoute.Sitemap = wpPages.map((p) => ({
    url: `${BASE_URL}/pages/${p.slug}`,
    lastModified: new Date(p.modified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...portfolioPages, ...blogPages, ...wpPageEntries];
}
