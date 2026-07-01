import Link from 'next/link';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function CTABanner() {
  return (
    <SectionWrapper className="relative overflow-hidden bg-white border-t border-slate-100 py-20 sm:py-28">
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          99% Inbox Delivery Rate
        </span>

        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Start Sending Smarter,{' '}
          <span className="text-[#1d5cf5]">Not Harder.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base text-slate-500 sm:text-lg">
          Over 1,400 businesses trust DigitalAka for bulk email, SMTP servers, and SMS marketing.
          Get set up in under 24 hours — no tech skills needed.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#1d5cf5] px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(29,92,245,0.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_28px_rgba(29,92,245,0.35)]"
          >
            Get a Free Demo
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-300 hover:text-green-700"
          >
            <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          No credit card required &middot; Setup in 24 hours &middot; 24/7 support
        </p>
      </div>
    </SectionWrapper>
  );
}
