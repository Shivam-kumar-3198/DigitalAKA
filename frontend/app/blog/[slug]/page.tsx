import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import SectionWrapper from '@/components/ui/SectionWrapper';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <SectionWrapper>
      <article className="mx-auto max-w-3xl">
        <div className="mb-6 h-64 w-full rounded-xl bg-gray-200">
          <div className="flex h-full items-center justify-center text-gray-400">
            {post.title} header image
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {post.date} · {post.author}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        <div className="prose prose-lg mt-6 text-gray-600">
          <p>{post.excerpt}</p>
          <p>
            {/* Placeholder content – in a real app you’d fetch full markdown/HTML */}
            Here goes the full article content. Replace with actual blog content.
          </p>
        </div>
      </article>
    </SectionWrapper>
  );
}