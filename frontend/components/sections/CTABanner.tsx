import Button from '@/components/ui/Button';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function CTABanner() {
  return (
    <SectionWrapper className="relative overflow-hidden bg-white border-y border-slate-100 py-16 sm:py-24">
      {/* Subtle background glow for depth on the white theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />
      
      <div className="relative mx-auto max-w-2xl text-center px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Ready to Start Your Project?
        </h2>
        
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
          Let’s discuss how we can help your business grow online.
        </p>
        
        <div className="mt-8 flex justify-center">
          <Button
            href="/contact"
            // Depending on your Button component's default props, 
            // you might want to switch variant="solid" if it exists.
            className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}