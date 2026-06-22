import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tips, and news from the digitalAka team.',
};

export default function BlogPage() {
  return (
    <SectionWrapper>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Blog</h1>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="h-40 w-full bg-gray-200">
              <div className="flex h-full items-center justify-center text-gray-400">
                {post.title} thumbnail
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500">{post.date}</p>
              <h2 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
              <p className="mt-2 text-xs font-medium text-primary">By {post.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}