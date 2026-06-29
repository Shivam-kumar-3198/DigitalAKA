import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'SMTP INR Pricing — Affordable SMTP Server Plans in India',
  description:
    'Transparent SMTP server pricing in INR. Choose from Starter, Business, and Enterprise plans with dedicated IPs, PowerMTA, and 99% deliverability. No hidden fees.',
  keywords: 'smtp pricing india, smtp server price inr, smtp server plans india, cheap smtp server, smtp hosting pricing',
  alternates: { canonical: `${SITE.url}/smtp-inr-pricing` },
  openGraph: {
    title: 'SMTP INR Pricing — Affordable SMTP Plans',
    description: 'SMTP server plans in INR with dedicated IPs and 99% deliverability. No hidden fees.',
    url: `${SITE.url}/smtp-inr-pricing`,
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
    { '@type': 'ListItem', position: 3, name: 'SMTP INR Pricing', item: `${SITE.url}/smtp-inr-pricing` },
  ],
};

const PLANS = [
  {
    name: 'Starter',
    emails: '5,00,000',
    price: '₹3,499',
    period: '/month',
    ips: '1 Dedicated IP',
    features: ['500K Emails/Month', '1 Dedicated IP', 'PowerMTA', 'SPF/DKIM Setup', '99% Deliverability', 'Email Support'],
    cta: 'Get Starter',
    highlight: false,
  },
  {
    name: 'Business',
    emails: '20,00,000',
    price: '₹9,999',
    period: '/month',
    ips: '5 Dedicated IPs',
    features: ['2M Emails/Month', '5 Dedicated IPs', 'PowerMTA', 'IP Rotation', '99% Deliverability', 'Priority Support', 'Bounce Management'],
    cta: 'Get Business',
    highlight: true,
  },
  {
    name: 'Enterprise',
    emails: 'Unlimited',
    price: 'Custom',
    period: '',
    ips: '20+ Dedicated IPs',
    features: ['Unlimited Emails', '20+ Dedicated IPs', 'PowerMTA', 'Custom IP Pools', 'SLA 99.9%', '24/7 Phone Support', 'Dedicated Manager'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const FEATURES = [
  { label: '99% Inbox Rate', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'PowerMTA Setup', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'Dedicated IPs', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9' },
  { label: 'SPF/DKIM/DMARC', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { label: '24/7 Monitoring', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { label: 'No Hidden Fees', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default function SmtpInrPricingPage() {
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
            <span className="font-medium text-gray-800">SMTP INR Pricing</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />No Hidden Fees
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            SMTP Server Pricing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">in India (INR)</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Transparent, affordable SMTP server plans with dedicated IPs and PowerMTA. Pay in Indian Rupees — no forex surprises.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.highlight ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'border border-gray-200 bg-white shadow-sm'}`}>
                {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">Most Popular</span>}
                <h2 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h2>
                <p className={`mt-1 text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.ips}</p>
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

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Need a Custom SMTP Plan?</h2>
          <p className="mt-4 text-lg text-blue-100">High-volume senders get special pricing. Talk to our team today.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Get Custom Quote</Link>
            <a href="tel:+919876543210" className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">Call +91 98765 43210</a>
          </div>
        </div>
      </section>
    </>
  );
}
