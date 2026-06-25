import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Bulk SMS Marketing Services in India — Instant Mass SMS Delivery',
  description:
    'Bulk SMS marketing services with instant delivery, 98% open rate & DLT compliance. Send promotional, transactional & OTP SMS at scale. Get started today!',
  keywords: 'bulk sms marketing, bulk sms service india, mass sms marketing, promotional sms, transactional sms, sms marketing india',
  alternates: { canonical: `${SITE.url}/bulk-sms-marketing` },
  openGraph: {
    title: 'Bulk SMS Marketing Services in India',
    description: 'Send promotional & transactional SMS to millions with 98% open rate and DLT compliance.',
    url: `${SITE.url}/bulk-sms-marketing`,
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
    { '@type': 'ListItem', position: 3, name: 'Bulk SMS Marketing', item: `${SITE.url}/bulk-sms-marketing` },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bulk SMS Marketing',
  description: 'Bulk SMS marketing services with instant delivery, high open rates, and DLT compliance.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: 'IN',
  serviceType: 'SMS Marketing',
};

const FEATURES = [
  {
    title: 'Instant SMS Delivery',
    body: 'Deliver millions of SMS messages in seconds across all major telecom networks. Our direct carrier connections ensure zero delays for time-sensitive campaigns.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: '98% Open Rate',
    body: 'SMS messages are read within 3 minutes of receipt on average, giving you unparalleled reach compared to email or social media marketing.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
  {
    title: 'DLT Compliance',
    body: 'Fully compliant with TRAI\'s Distributed Ledger Technology (DLT) regulations. We handle template registration and sender ID management so your campaigns are always legal.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Promotional SMS',
    body: 'Run promotional campaigns to non-DND numbers with offers, discounts, and announcements. Reach customers during business hours for maximum impact.',
    icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  },
  {
    title: 'Transactional SMS',
    body: 'Send OTPs, order confirmations, booking alerts, and other critical transactional messages 24/7 — even to DND numbers — with guaranteed delivery and low latency.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    title: 'API Integration',
    body: 'Integrate SMS into your app, CRM, or e-commerce platform using our simple REST API. SDKs available for PHP, Python, Node.js, and more.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
];

const STATS = [
  { value: '98%', label: 'Open Rate' },
  { value: '<3s', label: 'Delivery Time' },
  { value: '500M+', label: 'SMS Sent' },
  { value: '100%', label: 'DLT Compliant' },
];

export default function BulkSmsMarketingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="relative overflow-hidden bg-[#fafcff] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#0891b2]/[0.05] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Bulk SMS Marketing</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              DLT Registered & Compliant
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Bulk SMS Marketing{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Services in India
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Reach your customers instantly with <strong className="font-semibold text-gray-800">bulk SMS marketing</strong>. With a 98% open rate and delivery within seconds, SMS outperforms every other channel for time-sensitive promotions, OTPs, and transactional alerts.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-cyan-100 bg-white px-4 py-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-cyan-600">{s.value}</div>
                  <div className="text-xs font-medium text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Start SMS Campaign
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/sms-plan" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                View SMS Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Powerful Features for Every SMS Use Case
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Whether you need promotional blasts, transactional alerts, or OTP delivery — our platform handles it all.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
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

      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Ready to Reach Customers via SMS?</h2>
          <p className="mt-4 text-lg text-blue-100">Get your DLT registration sorted and start sending in 24 hours.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">
              Get A Free Demo
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
