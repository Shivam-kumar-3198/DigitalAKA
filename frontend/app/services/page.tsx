import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import CTABanner from '@/components/sections/CTABanner';
import ServicesGrid from '@/components/sections/ServicesGrid';

export const metadata: Metadata = {
  title: 'Services',
  description: `Explore our digital services: Web Design, Development, SEO, Branding, and more. We create digital experiences that drive results for your business.`,
  alternates: {
    canonical: `${SITE.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 -mt-20 pt-28 pb-16 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Digital Solutions to Grow Your Business
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            From concept to launch, we provide end-to-end digital services tailored to your unique goals. We combine creativity, technology, and data to build experiences that deliver measurable results.
          </p>
        </div>
      </section>

      {/* Services Grid — fetches from Firestore, falls back to constants.ts */}
      <SectionWrapper className="py-16 lg:py-20">
        <ServicesGrid />
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
