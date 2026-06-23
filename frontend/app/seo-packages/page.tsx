import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'SEO Packages India — Affordable SEO Plans for Businesses',
  description:
    'Affordable SEO packages in India with on-page SEO, link building, content marketing & monthly reports. Boost your Google rankings and organic traffic. Get a free audit.',
  keywords: 'seo packages india, seo plans, affordable seo packages, seo pricing india, monthly seo packages',
  alternates: { canonical: `${SITE.url}/seo-packages` },
  openGraph: {
    title: 'SEO Packages India — Affordable SEO Plans',
    description: 'On-page SEO, link building, content marketing & monthly reports. Boost Google rankings today.',
    url: `${SITE.url}/seo-packages`,
    siteName: SITE.name,
    type: 'website',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE.url}/pricing` },
    { '@type': 'ListItem', position: 3, name: 'SEO Packages', item: `${SITE.url}/seo-packages` },
  ],
};

const PLANS = [
  {
    name: 'Local SEO',
    keywords: '10 Keywords',
    price: '₹7,999',
    period: '/month',
    features: ['10 Target Keywords', 'On-Page Optimisation', 'Google My Business', '5 Blog Posts/Month', 'Monthly Report', 'Email Support'],
    cta: 'Get Local SEO',
    highlight: false,
  },
  {
    name: 'Business SEO',
    keywords: '25 Keywords',
    price: '₹19,999',
    period: '/month',
    features: ['25 Target Keywords', 'On-Page + Technical SEO', 'Link Building (10/month)', '10 Blog Posts/Month', 'Competitor Analysis', 'Weekly Reports', 'Priority Support'],
    cta: 'Get Business SEO',
    highlight: true,
  },
  {
    name: 'Enterprise SEO',
    keywords: '50+ Keywords',
    price: 'Custom',
    period: '',
    features: ['50+ Target Keywords', 'Full Technical Audit', 'Link Building (30+/month)', '20+ Blog Posts/Month', 'E-commerce SEO', 'Daily Reports', 'Dedicated SEO Manager'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const FEATURES = [
  { title: 'Keyword Research', body: 'In-depth keyword research targeting high-intent keywords your customers actually search for.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { title: 'On-Page SEO', body: 'Optimise meta tags, headings, content structure, and internal linking for maximum relevance.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { title: 'Link Building', body: 'High-authority backlinks from relevant domains to boost your domain authority and rankings.', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { title: 'Technical SEO', body: 'Fix crawl errors, improve site speed, mobile UX, and Core Web Vitals to help Google rank you higher.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'Content Marketing', body: 'SEO-optimised blog posts and landing pages that attract organic traffic and convert visitors.', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { title: 'Monthly Reports', body: 'Clear, jargon-free monthly reports showing keyword rankings, traffic growth, and ROI.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
];

export default function SeoPackagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fdf4] via-white to-[#eef2ff] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#bbf7d0_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">SEO Packages</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Free SEO Audit Included
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            SEO Packages{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">India</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Result-driven SEO packages designed to boost your Google rankings and grow organic traffic. Free website audit with every plan.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.highlight ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'border border-gray-200 bg-white shadow-sm'}`}>
                {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">Best Results</span>}
                <h2 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h2>
                <p className={`mt-1 text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.keywords}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`mb-1 text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.period}</span>}
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                      <svg className={`h-4 w-4 flex-shrink-0 ${plan.highlight ? 'text-blue-200' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition ${plan.highlight ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Every SEO Package Includes</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Get Your Free SEO Audit Today</h2>
          <p className="mt-4 text-lg text-emerald-100">See where your website ranks and what is holding you back. Free, no obligation.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Get Free Audit</Link>
            <a href="tel:+919876543210" className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">Call +91 98765 43210</a>
          </div>
        </div>
      </section>
    </>
  );
}
