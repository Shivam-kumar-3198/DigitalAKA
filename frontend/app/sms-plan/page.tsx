import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'SMS Plan — Bulk SMS Pricing Plans in India',
  description:
    'Affordable bulk SMS plans in India for promotional and transactional messaging. DLT compliant, instant delivery, and 98% open rate. Choose your SMS plan today.',
  keywords: 'sms plan india, bulk sms pricing, sms marketing plan, sms package india, cheap sms plan',
  alternates: { canonical: `${SITE.url}/sms-plan` },
  openGraph: {
    title: 'SMS Plan — Bulk SMS Pricing in India',
    description: 'DLT compliant bulk SMS plans with instant delivery and 98% open rate. Starting from ₹299.',
    url: `${SITE.url}/sms-plan`,
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
    { '@type': 'ListItem', position: 3, name: 'SMS Plan', item: `${SITE.url}/sms-plan` },
  ],
};

const PLANS = [
  {
    name: 'Starter',
    sms: '10,000',
    price: '₹299',
    period: '/month',
    type: 'Promotional',
    features: ['10,000 SMS/Month', 'Promotional SMS', 'DLT Compliant', 'Basic Analytics', 'Email Support'],
    cta: 'Get Starter',
    highlight: false,
  },
  {
    name: 'Business',
    sms: '1,00,000',
    price: '₹1,999',
    period: '/month',
    type: 'Promo + Transactional',
    features: ['1 Lakh SMS/Month', 'Promo + Transactional', 'DLT Compliant', 'Real-time Reports', 'API Access', 'Priority Support'],
    cta: 'Get Business',
    highlight: true,
  },
  {
    name: 'Enterprise',
    sms: 'Unlimited',
    price: 'Custom',
    period: '',
    type: 'All Types',
    features: ['Unlimited SMS', 'All SMS Types', 'OTP/Transactional 24/7', 'Dedicated Account', 'Advanced Analytics', 'Custom Integration', 'Phone Support'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const TYPES = [
  { name: 'Promotional SMS', desc: 'Send offers and promotions to non-DND numbers during business hours.', color: 'blue' },
  { name: 'Transactional SMS', desc: 'Delivery confirmations, alerts, and notifications 24/7 to all numbers.', color: 'emerald' },
  { name: 'OTP SMS', desc: 'One-time passwords for authentication, delivered in under 3 seconds.', color: 'orange' },
];

export default function SmsPlansPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-white to-[#eef2ff] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#bae6fd_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">SMS Plan</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />Starting at ₹299/month
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Bulk SMS{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Plans India</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            DLT-compliant SMS plans for every business. From 10K to unlimited SMS — promotional, transactional, and OTP all covered.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.highlight ? 'bg-cyan-600 text-white shadow-2xl shadow-cyan-600/30' : 'border border-gray-200 bg-white shadow-sm'}`}>
                {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">Best Value</span>}
                <h2 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h2>
                <p className={`mt-1 text-sm ${plan.highlight ? 'text-cyan-200' : 'text-gray-500'}`}>{plan.sms} SMS · {plan.type}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`mb-1 text-sm ${plan.highlight ? 'text-cyan-200' : 'text-gray-500'}`}>{plan.period}</span>}
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-cyan-100' : 'text-gray-600'}`}>
                      <svg className={`h-4 w-4 flex-shrink-0 ${plan.highlight ? 'text-cyan-200' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition ${plan.highlight ? 'bg-white text-cyan-700 hover:bg-cyan-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">SMS Types Explained</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TYPES.map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Get 100 Free Test SMS Today</h2>
          <p className="mt-4 text-lg text-cyan-100">Try our platform risk-free. No credit card required.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Start Free Trial</Link>
            <a href="tel:+919876543210" className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">Call +91 98765 43210</a>
          </div>
        </div>
      </section>
    </>
  );
}
