import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Super Email Reseller Program — Start Your Email Marketing Business',
  description:
    'Join digitalAka\'s Super Email Reseller Program. White-label email marketing platform, high profit margins, dedicated support & unlimited sub-resellers. Start earning today!',
  keywords: 'email reseller program, white label email marketing, super email reseller, email reseller india, bulk email reseller business',
  alternates: { canonical: `${SITE.url}/super-email-reseller` },
  openGraph: {
    title: 'Super Email Reseller Program — Start Your Email Business',
    description: 'White-label email marketing reseller program with high margins, full support & unlimited sub-resellers.',
    url: `${SITE.url}/super-email-reseller`,
    siteName: SITE.name,
    type: 'website',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
    { '@type': 'ListItem', position: 3, name: 'Super Email Reseller Program', item: `${SITE.url}/super-email-reseller` },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Super Email Reseller Program',
  description: 'White-label email marketing reseller program with high profit margins and unlimited sub-resellers.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: 'Worldwide',
  serviceType: 'Email Reseller Program',
};

const FEATURES = [
  {
    title: 'White-Label Platform',
    body: 'Sell email marketing services under your own brand. Your clients see your logo, your domain, and your pricing — we stay completely behind the scenes.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  },
  {
    title: 'High Profit Margins',
    body: 'Enjoy industry-leading margins of up to 60%. Buy credits at wholesale rates and sell at your own retail price, keeping the difference as pure profit.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Dedicated Account Manager',
    body: 'Get a personal account manager who helps you onboard clients, set up campaigns, and resolve any technical issues — available every step of the way.',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
  {
    title: '24/7 Technical Support',
    body: 'Access round-the-clock technical support via chat, email, and phone. We handle infrastructure issues so you can focus on growing your client base.',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    title: 'Custom Pricing Control',
    body: 'Set your own pricing for every client and plan. Create custom packages, offer volume discounts, and manage billing independently through your reseller admin panel.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  },
  {
    title: 'Unlimited Sub-Resellers',
    body: 'Build a multi-tier reseller network. Add unlimited sub-resellers under your account and earn commissions on every sale they make — the ultimate passive income stream.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
];

const STATS = [
  { value: '60%', label: 'Max Margins' },
  { value: '500+', label: 'Active Resellers' },
  { value: '∞', label: 'Sub-Resellers' },
  { value: '24/7', label: 'Support' },
];

export default function SuperEmailResellerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7ed] via-white to-[#eef2ff] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fed7aa_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Super Email Reseller Program</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Earn Up to 60% Margins
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Super Email{' '}
              <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Reseller Program
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Launch your own <strong className="font-semibold text-gray-800">white-label email marketing business</strong> with digitalAka. Sell under your brand, set your own prices, and earn up to 60% margins — with full technical support and unlimited sub-resellers included.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-orange-100 bg-white px-4 py-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-orange-500">{s.value}</div>
                  <div className="text-xs font-medium text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Become a Reseller
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href="tel:+919876543210" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need to Run a Successful Reseller Business
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              We provide the infrastructure, you bring the clients. It is that simple.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-500 to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Start Your Email Business Today</h2>
          <p className="mt-4 text-lg text-orange-100">Join 500+ resellers already earning with digitalAka. Setup is free and takes less than 24 hours.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">
              Apply Now — It is Free
            </Link>
            <a href="tel:+919876543210" className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
              Call +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
