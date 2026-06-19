import type { Metadata } from 'next';
import { PORTFOLIO } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Link from 'next/link';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'View our latest projects and case studies.',
};

export default function PortfolioPage() {
  return (
    <>
      <SectionWrapper>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Our Portfolio
        </h1>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((item) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="group block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-48 w-full bg-gray-200">
                <div className="flex h-full items-center justify-center text-gray-400">
                  {item.title} thumbnail
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {item.category}
                </span>
                <h2 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-primary">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>
      <CTABanner />
    </>
  );
}