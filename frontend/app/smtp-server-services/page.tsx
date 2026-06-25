import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'SMTP Server Services — Reliable Email Sending Infrastructure',
  description:
    'Dedicated SMTP server services with PowerMTA, dedicated IPs, IP rotation & 99% deliverability. Enterprise-grade email infrastructure for businesses. Start today!',
  keywords: 'smtp server services, dedicated smtp server, powermta smtp, smtp relay service, smtp server india',
  alternates: { canonical: `${SITE.url}/smtp-server-services` },
  openGraph: {
    title: 'SMTP Server Services — Reliable Email Sending Infrastructure',
    description: 'Dedicated SMTP server with PowerMTA, IP rotation & 99% deliverability. Enterprise email infrastructure.',
    url: `${SITE.url}/smtp-server-services`,
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
    { '@type': 'ListItem', position: 3, name: 'SMTP Server Services', item: `${SITE.url}/smtp-server-services` },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SMTP Server Services',
  description: 'Dedicated SMTP server infrastructure with PowerMTA, IP rotation, and 99% deliverability.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: 'Worldwide',
  serviceType: 'SMTP Server',
};

const FEATURES = [
  {
    title: 'Dedicated IP Addresses',
    body: 'Get your own dedicated IP addresses for sending, ensuring full control over your sender reputation. Warm-up plans included to build trust with ISPs quickly.',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  },
  {
    title: 'PowerMTA Infrastructure',
    body: 'Enterprise-grade PowerMTA software handles millions of messages with precise delivery control, detailed logging, and virtual MTA management for maximum throughput.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'IP Rotation',
    body: 'Automatic IP rotation across your IP pool distributes sending load and prevents any single IP from being flagged, dramatically improving overall deliverability.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  {
    title: '99% Deliverability',
    body: 'Our servers maintain excellent IP and domain reputation through SPF, DKIM, DMARC authentication, feedback loops, and proactive blacklist monitoring.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: '24/7 Server Monitoring',
    body: 'Round-the-clock monitoring with automated alerts, failover mechanisms, and expert support ensures your SMTP server runs at peak performance without interruptions.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
  {
    title: 'Custom SMTP Relay',
    body: 'Configure your custom domain relay with our SMTP service. Compatible with all email clients and marketing platforms — integrate in minutes with simple SMTP credentials.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

const STATS = [
  { value: '99%', label: 'Deliverability' },
  { value: '100+', label: 'Dedicated IPs' },
  { value: '5M+', label: 'Emails/Hour' },
  { value: '24/7', label: 'Monitoring' },
];

export default function SmtpServerServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#fafcff] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#7c3aed]/[0.05] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/services" className="hover:text-violet-600 transition-colors">Services</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">SMTP Server Services</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              Enterprise-Grade Infrastructure
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              SMTP Server Services —{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Built for Scale
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Power your email sending with <strong className="font-semibold text-gray-800">dedicated SMTP server infrastructure</strong>. Our PowerMTA-based servers with IP rotation and dedicated IPs deliver 99% inbox placement — the enterprise-grade backbone high-volume senders trust.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-violet-100 bg-white px-4 py-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-violet-600">{s.value}</div>
                  <div className="text-xs font-medium text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:bg-violet-700">
                Get SMTP Server
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/smtp-inr-pricing" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700">
                View Pricing
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
              SMTP Features Built for Maximum Deliverability
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              From dedicated IPs to PowerMTA infrastructure — every component is optimised to keep your emails out of spam and in the inbox.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-violet-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Need a Dedicated SMTP Server?</h2>
          <p className="mt-4 text-lg text-violet-100">Get your server configured and live within 24 hours. Expert setup included.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50">
              Request a Demo
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
