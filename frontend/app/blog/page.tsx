import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/wordpress';
import SectionWrapper from '@/components/ui/SectionWrapper';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tips, and news from the digitalAka team.',
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\[&hellip;\]|\[…\]/g, '…')
    .trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const { posts } = await getAllPosts({ fetchAll: true, perPage: 100 });

  return (
    <SectionWrapper>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Blog</h1>
      <p className="mt-4 text-lg text-gray-600">
        Insights, tips, and news from the digitalAka team.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-gray-500">No posts found.</p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const media = post._embedded?.['wp:featuredmedia']?.[0];
            const author = post._embedded?.author?.[0];
            const excerpt = stripHtml(post.excerpt.rendered);

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-48 w-full bg-gray-100">
                  {media?.source_url ? (
                    <Image
                      src={media.source_url}
                      alt={media.alt_text || post.title.rendered}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      priority={index < 6}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                  <h2
                    className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-primary"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  {excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">{excerpt}</p>
                  )}
                  {author && (
                    <p className="mt-3 text-xs font-medium text-primary">
                      By {author.name}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </SectionWrapper>
  );
}
