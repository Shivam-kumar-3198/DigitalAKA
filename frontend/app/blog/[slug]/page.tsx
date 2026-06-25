import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/wordpress';
import { yoastToMetadata, getJsonLd } from '@/lib/seo';
import SectionWrapper from '@/components/ui/SectionWrapper';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return yoastToMetadata(post.yoast_head_json, {
    title: post.title.rendered,
    description: post.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .trim()
      .slice(0, 160),
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function sanitizeContent(html: string): string {
  return html
    // Remove SVG icons — these are always plugin UI controls (toggle/drag/collapse), never real content
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    // Remove empty anchor tags left behind after SVG removal
    .replace(/<a[^>]*>\s*<\/a>/gi, '')
    // TOC / same-page anchors: "https://digitalaka.com/post/#section" → "#section"
    .replace(/href="https?:\/\/digitalaka\.com[^"#]*#([^"]+)"/g, 'href="#$1"')
    // Internal post links without anchor: remap to /blog/slug
    .replace(/href="https?:\/\/digitalaka\.com\/([^"]+)"/g, 'href="/blog/$1"');
  // src= attributes are intentionally untouched — images must keep their full URL
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];
  const jsonLd = getJsonLd(post.yoast_head_json);

  return (
    <>
      {/* Yoast provides a full @graph (Article, FAQPage, BreadcrumbList, etc.) — inject as-is */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <SectionWrapper>
        <article className="mx-auto max-w-3xl">
          {media?.source_url && (
            <Image
              src={media.source_url}
              alt={media.alt_text || post.title.rendered}
              width={896}
              height={504}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="mb-10 w-full rounded-2xl shadow-md"
              style={{ height: 'auto' }}
            />
          )}

          <p className="text-sm text-gray-500">
            {formatDate(post.date)}
            {author && <> · By {author.name}</>}
          </p>

          <h1
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div
            className="prose prose-lg mt-8 max-w-none text-gray-700 prose-img:mx-auto prose-img:rounded-xl prose-img:max-w-full prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content.rendered) }}
          />
        </article>
      </SectionWrapper>
    </>
  );
}
