import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SITE, ABOUT } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';

export const metadata: Metadata = {
  title: `About Us | ${SITE.name}`,
  description: ABOUT.subheadline,
  alternates: {
    canonical: `${SITE.url}/about`,
  },
  openGraph: {
    title: `About Us | ${SITE.name}`,
    description: ABOUT.subheadline,
    url: `${SITE.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="-mt-20 pt-28 pb-20 lg:pb-24 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {ABOUT.headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {ABOUT.subheadline}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {ABOUT.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-4xl font-bold tracking-tight text-primary">
                {stat.value}
              </span>
              <span className="mt-1 text-sm font-medium text-gray-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Image Section */}
      <div className="relative h-80 w-full overflow-hidden lg:h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
          alt="A collaborative team working at DigitalAka"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Our Team Section */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {ABOUT.team.headline}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {ABOUT.team.description}
            </p>
          </div>

          {/* This is the corrected part. It now maps over `ABOUT.team.roles` */}
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2 lg:max-w-2xl lg:mx-auto">
            {ABOUT.team.roles.map((role) => (
              <div key={role} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-base font-medium text-gray-700">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <SectionWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to build something great?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Let's talk about your project and how we can help you achieve your goals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-[#1d5cf5] px-8 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(29,92,245,0.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-bold tracking-wide text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
}