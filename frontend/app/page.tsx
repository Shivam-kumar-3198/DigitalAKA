import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import AboutPreview from '@/components/sections/AboutPreview';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <AboutPreview />
      <PortfolioGrid />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}