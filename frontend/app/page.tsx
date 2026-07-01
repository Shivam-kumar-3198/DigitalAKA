import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SITE } from '@/lib/constants';
import Hero from '@/components/sections/Hero';

// Everything below the hero fold is code-split and hydrated lazily.
// The static HTML is still pre-rendered at build time (ssr:true default),
// so SEO and FCP are unaffected — only the hydration JS is deferred.
const ClientLogos  = dynamic(() => import('@/components/sections/ClientLogos'));
const Services     = dynamic(() => import('@/components/sections/Services'));
const HowWeWork    = dynamic(() => import('@/components/sections/HowWeWork'));
const StatsBar     = dynamic(() => import('@/components/sections/StatsBar'));
const AboutPreview = dynamic(() => import('@/components/sections/AboutPreview'));
const PortfolioGrid= dynamic(() => import('@/components/sections/PortfolioGrid'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const FAQ          = dynamic(() => import('@/components/sections/FAQ'));
const CTABanner    = dynamic(() => import('@/components/sections/CTABanner'));

export const metadata: Metadata = {
  title: '#1 Bulk Email Services & SMTP Server Provider in India | DigitalAka',
  description:
    'DigitalAka is India\'s best bulk email service & SMTP server provider. Send millions of emails with 99% deliverability. Bulk SMS, email marketing, reseller plans & SEO services.',
  alternates: { canonical: SITE.url },
  openGraph: {
    title: '#1 Bulk Email Services & SMTP Server Provider in India | DigitalAka',
    description:
      'India\'s best bulk email service & SMTP server provider. 99% deliverability. Bulk SMS, email marketing, reseller plans & SEO.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: 'DigitalAka — Bulk Email Services & SMTP Provider India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '#1 Bulk Email Services & SMTP Server Provider in India | DigitalAka',
    description:
      'India\'s best bulk email service & SMTP server provider. 99% deliverability.',
    images: [SITE.ogImage],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Services />
      <HowWeWork />
      <StatsBar />
      <AboutPreview />
      <PortfolioGrid />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
