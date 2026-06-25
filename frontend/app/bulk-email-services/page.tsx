import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Bulk Email Services — Mass Email Marketing & High Deliverability',
  description:
    'Send millions of emails with 99% inbox delivery. Our bulk email services include email scheduling, real-time analytics, bounce management & anti-spam compliance. Get started today!',
  keywords: 'bulk email services, mass email marketing, bulk email provider india, email blast service, mass mailing service',
  alternates: { canonical: `${SITE.url}/bulk-email-services` },
  openGraph: {
    title: 'Bulk Email Services — Mass Email Marketing & High Deliverability',
    description: 'Send millions of emails with 99% inbox delivery. Bulk email services with analytics, scheduling & anti-spam tools.',
    url: `${SITE.url}/bulk-email-services`,
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
    { '@type': 'ListItem', position: 3, name: 'Bulk Email Services', item: `${SITE.url}/bulk-email-services` },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bulk Email Services',
  description: 'Professional bulk email marketing and mass email delivery services with 99% inbox delivery rate.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: 'IN',
  serviceType: 'Bulk Email Marketing',
};

const FEATURES = [
  {
    title: 'Mass Email Delivery',
    body: 'Send millions of emails per day with blazing-fast delivery speeds. Our infrastructure processes large volumes without delays, ensuring your campaigns reach subscribers simultaneously.',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    title: 'Email Scheduling',
    body: 'Schedule your campaigns for the perfect moment. Set delivery times based on your audience\'s time zone to maximise open rates and click-throughs.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Real-Time Analytics',
    body: 'Track open rates, click rates, bounce rates, and conversions in real time. Make data-driven decisions with detailed reports for every campaign.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    title: 'Bounce Management',
    body: 'Automatic hard and soft bounce processing keeps your lists clean. Suppression lists prevent repeat bounces, protecting your sender reputation.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'List Management',
    body: 'Import, segment and manage subscriber lists effortlessly. Create targeted segments based on behaviour, location, or custom attributes for personalised campaigns.',
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h7',
  },
  {
    title: 'Anti-Spam Compliance',
    body: 'Built-in spam checker, SPF/DKIM/DMARC authentication, and unsubscribe handling ensure full CAN-SPAM and GDPR compliance, keeping your campaigns out of spam folders.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
];

const STATS = [
  { value: '99%', label: 'Inbox Rate' },
  { value: '10M+', label: 'Emails / Day' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support' },
];

export default function BulkEmailServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#fafcff] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#1d5cf5]/[0.05] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Bulk Email Services</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Trusted by 1000+ Businesses
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Bulk Email Services{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Provider in India
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Send millions of emails with <strong className="font-semibold text-gray-800">99% inbox delivery</strong>. Our bulk email platform comes with powerful tools — email scheduling, real-time analytics, bounce management, and full anti-spam compliance — everything you need to run high-converting email campaigns at scale.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-blue-600">{s.value}</div>
                  <div className="text-xs font-medium text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Get Started Free
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/bulk-email-services-plan" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need for Successful Email Campaigns
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Our bulk email platform gives you professional-grade tools to manage, send, and optimise every campaign.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
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

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Ready to Launch Your Bulk Email Campaign?</h2>
          <p className="mt-4 text-lg text-blue-100">Join 1000+ businesses already growing with digitalAka. Get started in minutes.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg">
              Get A Free Quote
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
