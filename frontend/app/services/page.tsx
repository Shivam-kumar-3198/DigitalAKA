import type { Metadata } from 'next';
import { SERVICES } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Card from '@/components/ui/Card';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our digital services: design, development, SEO, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <SectionWrapper>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Our Services
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          From concept to launch, we provide end-to-end digital solutions tailored to your business.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Card key={service.id} className="text-center">
              <div className="text-5xl">{service.iconName}</div>
              <h2 id={service.id} className="mt-4 text-xl font-semibold text-gray-900">
                {service.title}
              </h2>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>
      <CTABanner />
    </>
  );
}