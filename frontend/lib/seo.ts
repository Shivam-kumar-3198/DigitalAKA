import type { Metadata } from 'next';
import type { YoastHeadJSON } from './wordpress';

interface Fallback {
  title?: string;
  description?: string;
}

/**
 * Converts a Yoast SEO `yoast_head_json` object into a Next.js Metadata object.
 * Pass `fallback` so pages never ship without a title/description even when
 * Yoast data is absent.
 */
export function yoastToMetadata(
  yoast: YoastHeadJSON | undefined,
  fallback: Fallback = {},
): Metadata {
  if (!yoast) {
    return { title: fallback.title, description: fallback.description };
  }

  const title = yoast.title || fallback.title;
  const description = yoast.description || fallback.description;

  const robotsIndex = yoast.robots?.index !== 'noindex';
  const robotsFollow = yoast.robots?.follow !== 'nofollow';
  const maxSnippet = parseInt(yoast.robots?.['max-snippet'] ?? '-1', 10);
  const maxVideoPreview = parseInt(yoast.robots?.['max-video-preview'] ?? '-1', 10);

  return {
    title,
    description,
    ...(yoast.canonical && { alternates: { canonical: yoast.canonical } }),
    ...(yoast.robots && {
      robots: {
        index: robotsIndex,
        follow: robotsFollow,
        googleBot: {
          index: robotsIndex,
          follow: robotsFollow,
          'max-snippet': Number.isNaN(maxSnippet) ? -1 : maxSnippet,
          'max-image-preview':
            (yoast.robots['max-image-preview'] as 'none' | 'standard' | 'large') ??
            'large',
          'max-video-preview': Number.isNaN(maxVideoPreview) ? -1 : maxVideoPreview,
        },
      },
    }),
    openGraph: {
      title: yoast.og_title || title,
      description: yoast.og_description || description,
      url: yoast.og_url,
      type: (yoast.og_type as 'article' | 'website') ?? 'article',
      siteName: yoast.og_site_name,
      images: yoast.og_image?.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        type: img.type,
      })),
    },
    twitter: {
      card:
        (yoast.twitter_card as 'summary' | 'summary_large_image') ??
        'summary_large_image',
      title: yoast.twitter_title || yoast.og_title || title,
      description:
        yoast.twitter_description || yoast.og_description || description,
      images: yoast.twitter_image ? [yoast.twitter_image] : undefined,
    },
  };
}

/**
 * Returns the Yoast `schema` object (the full @graph) ready to be injected
 * as a <script type="application/ld+json">, or null when absent.
 */
export function getJsonLd(
  yoast: YoastHeadJSON | undefined,
): YoastHeadJSON['schema'] | null {
  return yoast?.schema ?? null;
}
