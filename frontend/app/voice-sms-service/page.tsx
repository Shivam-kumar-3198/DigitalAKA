import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Voice SMS Service — Automated Voice Call Campaigns at Scale',
  description:
    'Voice SMS service for automated voice broadcast campaigns, OTP calls, and IVR solutions. Reach millions with personalised voice messages. Get started today!',
  keywords: 'voice sms service, voice broadcast, automated voice calls, ivr service, bulk voice calls india, voice otp',
  alternates: { canonical: `${SITE.url}/voice-sms-service` },
  openGraph: {
    title: 'Voice SMS Service — Automated Voice Call Campaigns',
    description: 'Automated voice broadcast, IVR & voice OTP services. Reach millions with personalised voice messages.',
    url: `${SITE.url}/voice-sms-service`,
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
    { '@type': 'ListItem', position: 3, name: 'Voice SMS Service', item: `${SITE.url}/voice-sms-service` },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Voice SMS Service',
  description: 'Automated voice broadcast and voice call campaign services for businesses.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: 'IN',
  serviceType: 'Voice Broadcasting',
};

const FEATURES = [
  {
    title: 'Voice Broadcasting',
    body: 'Send pre-recorded voice messages to thousands of contacts simultaneously. Perfect for announcements, reminders, and promotional campaigns that need a personal human touch.',
    icon: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9A9 9 0 0112 3m0 0a9 9 0 019 9 9 9 0 01-9 9m0-18v18',
  },
  {
    title: 'IVR Solutions',
    body: 'Build interactive voice response systems that let callers self-serve using keypad inputs. Route calls intelligently, collect feedback, and automate customer support flows.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
  },
  {
    title: 'Text-to-Speech',
    body: 'Convert text to natural-sounding voice in multiple Indian and international languages. Personalise messages dynamically by inserting customer names, amounts, or other data.',
    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
  },
  {
    title: 'Voice OTP',
    body: 'Deliver one-time passwords via automated voice calls for users who cannot receive SMS. Increases authentication success rates for feature phone and low-connectivity users.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    title: 'Call Analytics',
    body: 'Track call delivery rates, listen durations, key presses, and campaign performance in real time. Export detailed reports to measure ROI and optimise future campaigns.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    title: 'Custom Caller ID',
    body: 'Display your business number or a verified caller ID so recipients recognise your brand. Increases answer rates and builds credibility with your customer base.',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  },
];

const STATS = [
  { value: '95%', label: 'Call Connect Rate' },
  { value: '1M+', label: 'Calls / Day' },
  { value: '10+', label: 'Languages' },
  { value: '24/7', label: 'Support' },
];

export default function VoiceSmsServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="relative overflow-hidden bg-[#fafcff] -mt-20 pt-28 pb-16 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#9333ea]/[0.05] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Voice SMS Service</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              Multi-Language Voice Support
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Voice SMS Service —{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Automated Voice Campaigns
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Deliver your message in the most personal way possible — via <strong className="font-semibold text-gray-800">automated voice calls</strong>. Our voice SMS service handles broadcasting, IVR systems, voice OTP, and text-to-speech in multiple languages, all at massive scale.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-purple-100 bg-white px-4 py-3 text-center shadow-sm">
                  <div className="text-2xl font-extrabold text-purple-600">{s.value}</div>
                  <div className="text-xs font-medium text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Start Voice Campaign
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/voice-sms-service-plan" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Complete Voice Communication Suite
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              From simple voice blasts to sophisticated IVR flows — everything in one platform.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
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

      <section className="bg-gradient-to-r from-purple-600 to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Ready to Launch Your Voice Campaign?</h2>
          <p className="mt-4 text-lg text-purple-100">Set up automated voice calls in under 24 hours. Speak to an expert today.</p>
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
