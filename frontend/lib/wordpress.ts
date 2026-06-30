const API_URL =
  process.env.WORDPRESS_API_URL ?? 'https://digitalaka.com/wp-json/wp/v2';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface YoastHeadJSON {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: {
    index?: string;
    follow?: string;
    'max-snippet'?: string;
    'max-image-preview'?: string;
    'max-video-preview'?: string;
  };
  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: Array<{
    url: string;
    width?: number;
    height?: number;
    type?: string;
  }>;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: {
    '@context': string;
    '@graph': unknown[];
  };
}

export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPAuthor {
  id: number;
  name: string;
  avatar_urls?: Record<string, string>;
}

export interface WPPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  categories: number[];
  yoast_head_json?: YoastHeadJSON;
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
    author?: WPAuthor[];
  };
}

export interface WPPage {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  yoast_head_json?: YoastHeadJSON;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface PaginatedPosts {
  posts: WPPost[];
  totalPages: number;
  total: number;
}

// ─── Posts ────────────────────────────────────────────────────────────────────

// Fields needed for the listing page and sitemap — omits content, meta, tags, etc.
const LISTING_FIELDS = 'id,slug,title,excerpt,date,modified,_links';

function buildPostsUrl(page: number, perPage: number, fields?: string, embed = true): string {
  let url = `${API_URL}/posts?${embed ? '_embed&' : ''}page=${page}&per_page=${perPage}&status=publish`;
  if (fields) url += `&_fields=${fields}`;
  return url;
}

export async function getAllPosts({
  page = 1,
  perPage = 100,
  fetchAll = false,
  fields = LISTING_FIELDS,
  embed = true,
} = {}): Promise<PaginatedPosts> {
  try {
    // force-cache is required for static export (output: 'export') — no runtime server exists.
    // The 2MB data-cache limit only applies to Next.js server deployments, not static export.
    const fetchOptions: RequestInit = { cache: 'force-cache' };
    const firstRes = await fetch(buildPostsUrl(page, perPage, fields, embed), fetchOptions);

    if (!firstRes.ok) {
      console.error(`getAllPosts page ${page} failed: ${firstRes.status} ${firstRes.statusText}`);
      return { posts: [], totalPages: 0, total: 0 };
    }

    const firstBatch: WPPost[] = await firstRes.json();
    const totalPages = parseInt(firstRes.headers.get('X-WP-TotalPages') ?? '1', 10);
    const total = parseInt(firstRes.headers.get('X-WP-Total') ?? '0', 10);

    if (!fetchAll || totalPages <= 1) {
      return { posts: firstBatch, totalPages, total };
    }

    // Fetch all remaining pages in parallel
    const remainingBatches = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, i) =>
        fetch(buildPostsUrl(page + i + 1, perPage, fields, embed), fetchOptions)
          .then((r) => (r.ok ? (r.json() as Promise<WPPost[]>) : []))
          .catch(() => [] as WPPost[]),
      ),
    );

    return { posts: [firstBatch, ...remainingBatches].flat(), totalPages, total };
  } catch (err) {
    console.error('getAllPosts error:', err);
    return { posts: [], totalPages: 0, total: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}&status=publish`,
      { cache: 'force-cache' },
    );

    if (!res.ok) {
      console.error(`getPostBySlug(${slug}) failed: ${res.status}`);
      return null;
    }

    const posts: WPPost[] = await res.json();
    return posts[0] ?? null;
  } catch (err) {
    console.error(`getPostBySlug(${slug}) error:`, err);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const firstRes = await fetch(
      `${API_URL}/posts?_fields=slug&per_page=100&page=1&status=publish`,
      { cache: 'force-cache' },
    );

    if (!firstRes.ok) {
      console.error(`getAllPostSlugs page 1 failed: ${firstRes.status}`);
      return [];
    }

    const firstBatch: Pick<WPPost, 'slug'>[] = await firstRes.json();
    const totalPages = parseInt(firstRes.headers.get('X-WP-TotalPages') ?? '1', 10);

    if (totalPages <= 1) {
      return firstBatch.map((p) => p.slug);
    }

    const remainingBatches = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, i) =>
        fetch(
          `${API_URL}/posts?_fields=slug&per_page=100&page=${i + 2}&status=publish`,
          { cache: 'force-cache' },
        )
          .then((r) => (r.ok ? (r.json() as Promise<Pick<WPPost, 'slug'>[]>) : []))
          .catch(() => [] as Pick<WPPost, 'slug'>[]),
      ),
    );

    return [firstBatch, ...remainingBatches].flat().map((p) => p.slug);
  } catch (err) {
    console.error('getAllPostSlugs error:', err);
    return [];
  }
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export async function getAllPages(): Promise<WPPage[]> {
  try {
    const res = await fetch(`${API_URL}/pages?per_page=100&status=publish`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`getAllPages failed: ${res.status}`);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error('getAllPages error:', err);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const res = await fetch(
      `${API_URL}/pages?slug=${encodeURIComponent(slug)}&status=publish`,
      { cache: 'force-cache' },
    );

    if (!res.ok) {
      console.error(`getPageBySlug(${slug}) failed: ${res.status}`);
      return null;
    }

    const pages: WPPage[] = await res.json();
    return pages[0] ?? null;
  } catch (err) {
    console.error(`getPageBySlug(${slug}) error:`, err);
    return null;
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(`${API_URL}/categories?per_page=100`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`getCategories failed: ${res.status}`);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error('getCategories error:', err);
    return [];
  }
}

export async function getPostsByCategory(
  categoryId: number,
  { page = 1, perPage = 10 } = {},
): Promise<PaginatedPosts> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_embed&categories=${categoryId}&page=${page}&per_page=${perPage}&status=publish`,
      { cache: 'force-cache' },
    );

    if (!res.ok) {
      console.error(`getPostsByCategory(${categoryId}) failed: ${res.status}`);
      return { posts: [], totalPages: 0, total: 0 };
    }

    const posts: WPPost[] = await res.json();
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
    const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10);

    return { posts, totalPages, total };
  } catch (err) {
    console.error(`getPostsByCategory(${categoryId}) error:`, err);
    return { posts: [], totalPages: 0, total: 0 };
  }
}
