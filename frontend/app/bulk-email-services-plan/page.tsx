import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Bulk Email Services Plan — Affordable Mass Email Pricing',
  description:
    'Affordable bulk email service plans with high deliverability, real-time analytics & bounce management. Compare plans and choose the best fit for your business.',
  keywords: 'bulk email services plan, bulk email pricing, mass email plan, email marketing plan india, bulk email package',
  alternates: { canonical: `${SITE.url}/bulk-email-services-plan` },
  openGraph: {
    title: 'Bulk Email Services Plan — Affordable Mass Email Pricing',
    description: 'Compare bulk email service plans. High deliverability, real-time analytics, and bounce management.',
    url: `${SITE.url}/bulk-email-services-plan`,
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
    { '@type': 'ListItem', position: 3, name: 'Bulk Email Services Plan', item: `${SITE.url}/bulk-email-services-plan` },
  ],
};

const PLANS = [
  {
    name: 'Basic',
    emails: '1,00,000',
    price: '₹999',
    period: '/month',
    features: ['100K Emails/Month', 'Real-time Analytics', 'Bounce Management', 'Unsubscribe Handling', 'Email Support'],
    cta: 'Get Basic',
    highlight: false,
  },
  {
    name: 'Growth',
    emails: '5,00,000',
    price: '₹3,499',
    period: '/month',
    features: ['500K Emails/Month', 'Real-time Analytics', 'Bounce Management', 'A/B Testing', 'Priority Support', 'List Segmentation'],
    cta: 'Get Growth',
    highlight: true,
  },
  {
    name: 'Scale',
    emails: '20,00,000',
    price: '₹9,999',
    period: '/month',
    features: ['2M Emails/Month', 'Advanced Analytics', 'Dedicated IP', 'A/B Testing', '24/7 Support', 'API Access', 'Custom Templates'],
    cta: 'Get Scale',
    highlight: false,
  },
];

export default function BulkEmailServicesPlanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f5ff] via-white to-[#eef2ff] -mt-20 pt-28 pb-16 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c7d7fe_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Bulk Email Services Plan</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />Starting at ₹999/month
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Bulk Email{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Services Plan</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Flexible bulk email plans for every business size. Scale up or down with no long-term contracts.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.highlight ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'border border-gray-200 bg-white shadow-sm'}`}>
                {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">Best Value</span>}
                <h2 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h2>
                <p className={`mt-1 text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.emails} emails</p>
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
          <p className="mt-8 text-center text-sm text-gray-500">All plans include 99% deliverability, bounce management, and unsubscribe handling. Need more? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>.</p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Not Sure Which Plan is Right?</h2>
          <p className="mt-4 text-lg text-blue-100">Our team will help you pick the perfect plan. Free consultation.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Talk to an Expert</Link>
            <a href="tel:+919876543210" className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">Call +91 98765 43210</a>
          </div>
        </div>
      </section>
    </>
  );
}
