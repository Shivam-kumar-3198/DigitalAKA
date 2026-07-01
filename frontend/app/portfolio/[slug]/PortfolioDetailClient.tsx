'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  tech: string[];
  liveUrl: string;
  slug: string;
}

export default function PortfolioDetailClient({ slug }: { slug: string }) {
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    async function fetchProject() {
      try {
        const q = query(collection(db, 'portfolio'), where('slug', '==', slug), limit(1));
        const snap = await getDocs(q);
        if (snap.empty) {
          setMissing(true);
        } else {
          setProject({ id: snap.docs[0].id, ...snap.docs[0].data() } as PortfolioItem);
        }
      } catch {
        setMissing(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (missing) notFound();

  if (loading) {
    return (
      <SectionWrapper>
        <div className="space-y-6 animate-pulse">
          <div className="h-96 rounded-xl bg-gray-100" />
          <div className="h-8 w-1/2 rounded bg-gray-100" />
          <div className="h-4 w-3/4 rounded bg-gray-100" />
        </div>
      </SectionWrapper>
    );
  }

  if (!project) return null;

  return (
    <SectionWrapper>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative h-64 overflow-hidden rounded-xl bg-gray-200 lg:h-96">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              {project.title} Image
            </div>
          )}
        </div>
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            {project.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{project.description}</p>

          <div className="mt-6 space-y-4">
            {project.challenge && (
              <div>
                <h2 className="font-semibold text-gray-900">Challenge</h2>
                <p className="text-gray-600">{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <h2 className="font-semibold text-gray-900">Solution</h2>
                <p className="text-gray-600">{project.solution}</p>
              </div>
            )}
            {Array.isArray(project.tech) && project.tech.length > 0 && (
              <div>
                <h2 className="font-semibold text-gray-900">Technologies</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {project.liveUrl && (
            <div className="mt-8">
              <Button href={project.liveUrl} variant="outline">
                Visit Live Site
              </Button>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
