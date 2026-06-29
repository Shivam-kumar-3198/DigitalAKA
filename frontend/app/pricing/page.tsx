import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pricing — Affordable Email, SMS & SMTP Plans',
  description:
    'Transparent pricing for Bulk Email, SMTP Server, Bulk SMS, Voice SMS, and SEO services. No hidden fees. Compare plans and pick what fits your business.',
  keywords: 'bulk email pricing, smtp server pricing, bulk sms pricing, voice sms pricing, seo packages india, digitalaka pricing',
  alternates: { canonical: `${SITE.url}/pricing` },
  openGraph: {
    title: 'Pricing — Affordable Email, SMS & SMTP Plans',
    description: 'Transparent pricing for Bulk Email, SMTP, SMS & SEO. No hidden fees.',
    url: `${SITE.url}/pricing`,
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
  ],
};

const PRICING_CATEGORIES = [
  {
    title: 'SMTP Server Pricing',
    description: 'Dedicated IP infrastructure with PowerMTA, IP rotation, and 99% deliverability. Plans billed in INR with no hidden charges.',
    href: '/smtp-inr-pricing',
    badge: 'From ₹3,499/mo',
    accent: 'violet',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    highlights: ['Dedicated IPs', 'PowerMTA', '99% Deliverability'],
  },
  {
    title: 'Bulk Email Services Plan',
    description: 'Send millions of emails with real-time analytics, bounce management, and anti-spam compliance. Scale as you grow.',
    href: '/bulk-email-services-plan',
    badge: 'From ₹999/mo',
    accent: 'blue',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    highlights: ['Real-time Analytics', 'Bounce Management', 'List Segmentation'],
  },
  {
    title: 'Voice SMS Service Plan',
    description: 'Automated voice broadcast, IVR, and voice OTP plans priced for volume. Reach millions with personalised voice messages.',
    href: '/voice-sms-service-plan',
    badge: 'Custom Pricing',
    accent: 'purple',
    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
    highlights: ['Voice Broadcast', 'IVR Solutions', 'Text-to-Speech'],
  },
  {
    title: 'SEO Packages',
    description: 'Monthly SEO packages designed to drive organic traffic, improve rankings, and grow your online presence sustainably.',
    href: '/seo-packages',
    badge: 'Flexible Plans',
    accent: 'emerald',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    highlights: ['Keyword Research', 'On-page SEO', 'Monthly Reports'],
  },
  {
    title: 'SMS Plan',
    description: 'Bulk SMS marketing plans with instant delivery, 98% open rate, and full DLT compliance. Promotional and transactional options.',
    href: '/sms-plan',
    badge: 'Pay-as-you-go',
    accent: 'cyan',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    highlights: ['Instant Delivery', 'DLT Compliant', '98% Open Rate'],
  },
];

const ACCENT_STYLES: Record<string, { badge: string; icon: string; pill: string; arrow: string }> = {
  violet: {
    badge: 'border-violet-100 bg-violet-50 text-violet-700',
    icon: 'bg-violet-50 text-violet-600',
    pill: 'bg-violet-100 text-violet-700',
    arrow: 'text-violet-600 group-hover:text-violet-700',
  },
  blue: {
    badge: 'border-blue-100 bg-blue-50 text-blue-700',
    icon: 'bg-blue-50 text-blue-600',
    pill: 'bg-blue-100 text-blue-700',
    arrow: 'text-blue-600 group-hover:text-blue-700',
  },
  purple: {
    badge: 'border-purple-100 bg-purple-50 text-purple-700',
    icon: 'bg-purple-50 text-purple-600',
    pill: 'bg-purple-100 text-purple-700',
    arrow: 'text-purple-600 group-hover:text-purple-700',
  },
  emerald: {
    badge: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    icon: 'bg-emerald-50 text-emerald-600',
    pill: 'bg-emerald-100 text-emerald-700',
    arrow: 'text-emerald-600 group-hover:text-emerald-700',
  },
  cyan: {
    badge: 'border-cyan-100 bg-cyan-50 text-cyan-700',
    icon: 'bg-cyan-50 text-cyan-600',
    pill: 'bg-cyan-100 text-cyan-700',
    arrow: 'text-cyan-600 group-hover:text-cyan-700',
  },
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#fafcff] -mt-20 pt-28 pb-16 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#1d5cf5]/[0.05] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Pricing</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Transparent Pricing — No Hidden Fees
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Simple, Affordable{' '}
            <span className="bg-gradient-to-r from-[#1d5cf5] to-indigo-500 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            Every plan is designed to deliver maximum value. Choose the service that fits your needs — scale up or down any time.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {[
              { value: '99%', label: 'Inbox Rate' },
              { value: '24/7', label: 'Support' },
              { value: '1000+', label: 'Clients' },
              { value: '7+', label: 'Years' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-[#1d5cf5]">{s.value}</div>
                <div className="text-xs font-medium text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing category cards */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRICING_CATEGORIES.map((cat) => {
              const s = ACCENT_STYLES[cat.accent];
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${s.icon}`}>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                      </svg>
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.badge}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-bold text-gray-900">{cat.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{cat.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cat.highlights.map((h) => (
                      <span key={h} className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${s.pill}`}>
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className={`mt-5 flex items-center gap-1 text-sm font-semibold ${s.arrow}`}>
                    View Plans
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#1d5cf5] to-indigo-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Not Sure Which Plan to Pick?</h2>
          <p className="mt-4 text-lg text-blue-100">Talk to our team — we will help you find the right fit for your volume and budget.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg">
              Get a Custom Quote
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
