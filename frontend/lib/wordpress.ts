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

export async function getAllPosts({
  page = 1,
  perPage = 10,
} = {}): Promise<PaginatedPosts> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_embed&page=${page}&per_page=${perPage}&status=publish`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      console.error(`getAllPosts failed: ${res.status} ${res.statusText}`);
      return { posts: [], totalPages: 0, total: 0 };
    }

    const posts: WPPost[] = await res.json();
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
    const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10);

    return { posts, totalPages, total };
  } catch (err) {
    console.error('getAllPosts error:', err);
    return { posts: [], totalPages: 0, total: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}&status=publish`,
      { next: { revalidate: 3600 } },
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
  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const res = await fetch(
        `${API_URL}/posts?_fields=slug&per_page=100&page=${page}&status=publish`,
        { next: { revalidate: 3600 } },
      );

      if (!res.ok) {
        console.error(`getAllPostSlugs page ${page} failed: ${res.status}`);
        break;
      }

      const posts: Pick<WPPost, 'slug'>[] = await res.json();
      slugs.push(...posts.map((p) => p.slug));
      totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
      page++;
    } while (page <= totalPages);
  } catch (err) {
    console.error('getAllPostSlugs error:', err);
  }

  return slugs;
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
      { next: { revalidate: 3600 } },
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
      { next: { revalidate: 3600 } },
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
