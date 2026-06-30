import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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

// Next.js routes that exist independently of the blog — never remap these to /blog/
const SITE_ROUTES = new Set([
  'about', 'services', 'contact', 'pricing', 'portfolio', 'team', 'reviews',
  'blog', 'email-marketing', 'bulk-email-services', 'bulk-email-services-plan',
  'bulk-email-reseller-plan', 'smtp-server-services', 'smtp-inr-pricing',
  'bulk-sms-marketing', 'voice-sms-service', 'voice-sms-service-plan',
  'seo-packages', 'sms-plan', 'super-email-reseller',
]);

function sanitizeContent(html: string): string {
  return html
    // Remove SVG icons — these are always plugin UI controls (toggle/drag/collapse), never real content
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    // Remove empty anchor tags left behind after SVG removal
    .replace(/<a[^>]*>\s*<\/a>/gi, '')
    // TOC / same-page anchors: "https://digitalaka.com/post/#section" → "#section"
    .replace(/href="https?:\/\/digitalaka\.com[^"#]*#([^"]+)"/g, 'href="#$1"')
    // Internal links: remap WordPress post URLs to /blog/slug, leave known site routes and files (like .pdf) unchanged
    .replace(/href="https?:\/\/digitalaka\.com\/([^"]+)"/g, (match, slug) => {
      const cleanSlug = slug.replace(/\/$/, ''); // remove trailing slash
      if (SITE_ROUTES.has(cleanSlug) || cleanSlug.includes('.')) {
        // Known Next.js route — keep as an absolute path on this site
        return `href="/${cleanSlug}"`;
      }
      // Assume it's a blog post slug
      return `href="/blog/${cleanSlug}"`;
    });
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

      <SectionWrapper className="-mt-20 pt-28">
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

          {/* Post-article CTA */}
          <div className="mt-16 rounded-2xl border border-blue-100 bg-gradient-to-br from-[#f0f5ff] to-white p-8 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1d5cf5]">Ready to grow?</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
              Boost Your Inbox Rate to 99%
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-slate-500">
              DigitalAka's SMTP &amp; Bulk Email infrastructure gets your messages delivered — every time.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="flex h-11 w-full sm:w-auto items-center justify-center rounded-full bg-[#1d5cf5] px-8 text-sm font-bold text-white shadow-[0_6px_16px_rgba(29,92,245,0.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="flex h-11 w-full sm:w-auto items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </article>
      </SectionWrapper>
    </>
  );
}
