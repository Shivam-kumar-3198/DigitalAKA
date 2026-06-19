import type { Metadata } from 'next';
import { ABOUT } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Digital AKA, our team, and our mission.',
};

export default function AboutPage() {
  return (
    <>
      <SectionWrapper>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {ABOUT.heading}
        </h1>
        <div className="mt-6 grid gap-12 lg:grid-cols-2">
          <div className="prose prose-lg text-gray-600">
            <p>{ABOUT.story}</p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {ABOUT.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Our Team</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {ABOUT.team.map((member) => (
                <div key={member.name} className="rounded-xl border p-4 text-center shadow-sm">
                  <div className="mx-auto h-24 w-24 rounded-full bg-gray-200" />
                  <p className="mt-4 font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
      <CTABanner />
    </>
  );
}