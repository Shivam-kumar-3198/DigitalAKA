'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Link from 'next/link';
import CTABanner from '@/components/sections/CTABanner';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  slug: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as PortfolioItem)));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  return (
    <>
      <SectionWrapper>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Our Portfolio
        </h1>

        {loading ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-100" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="mt-12 text-gray-500">No portfolio items yet.</p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                      {item.title}
                    </div>
                  )}
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
        )}
      </SectionWrapper>
      <CTABanner />
    </>
  );
}
