import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/wordpress';
import { yoastToMetadata, getJsonLd } from '@/lib/seo';
import SectionWrapper from '@/components/ui/SectionWrapper';

// Revalidate statically-generated posts every hour; serve stale while regenerating
export const revalidate = 3600;
// Allow slugs not in generateStaticParams to be rendered on-demand (new posts after deploy)
export const dynamicParams = true;

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
            <div className="relative mb-8 h-72 w-full overflow-hidden rounded-xl">
              <Image
                src={media.source_url}
                alt={media.alt_text || post.title.rendered}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          <p className="text-sm text-gray-500">
            {formatDate(post.date)}
            {author && <> · By {author.name}</>}
          </p>

          <h1
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* WordPress block markup, Yoast FAQ schema, and TOC blocks are preserved intact */}
          <div
            className="prose prose-lg mt-8 max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </SectionWrapper>
    </>
  );
}
