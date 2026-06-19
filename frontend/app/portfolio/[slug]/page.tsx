import type { Metadata } from 'next';
import { PORTFOLIO } from '@/lib/constants';
import { notFound } from 'next/navigation';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';

interface Props {
  params: { slug: string };
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PORTFOLIO.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function PortfolioDetailPage({ params }: Props) {
  const project = PORTFOLIO.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <SectionWrapper>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative h-64 overflow-hidden rounded-xl bg-gray-200 lg:h-96">
          <div className="flex h-full items-center justify-center text-gray-400">
            {project.title} Image
          </div>
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
            <div>
              <h2 className="font-semibold text-gray-900">Challenge</h2>
              <p className="text-gray-600">{project.challenge}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Solution</h2>
              <p className="text-gray-600">{project.solution}</p>
            </div>
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