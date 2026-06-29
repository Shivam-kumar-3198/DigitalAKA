import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Voice SMS Service Plan — Affordable Voice Call Pricing in India',
  description:
    'Affordable voice SMS service plans with instant call delivery, IVR support & real-time reports. Compare voice call pricing and choose the best plan for your business.',
  keywords: 'voice sms service plan, voice call pricing india, bulk voice call plan, ivr pricing, voice broadcast plan',
  alternates: { canonical: `${SITE.url}/voice-sms-service-plan` },
  openGraph: {
    title: 'Voice SMS Service Plan — Voice Call Pricing India',
    description: 'Affordable voice SMS service plans with IVR support and real-time call reports.',
    url: `${SITE.url}/voice-sms-service-plan`,
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
    { '@type': 'ListItem', position: 3, name: 'Voice SMS Service Plan', item: `${SITE.url}/voice-sms-service-plan` },
  ],
};

const PLANS = [
  {
    name: 'Starter',
    calls: '10,000',
    price: '₹1,499',
    period: '/month',
    features: ['10,000 Calls/Month', 'Pre-recorded Voice', 'Basic IVR (1 level)', 'Call Delivery Report', 'Email Support'],
    cta: 'Get Starter',
    highlight: false,
  },
  {
    name: 'Business',
    calls: '50,000',
    price: '₹5,999',
    period: '/month',
    features: ['50,000 Calls/Month', 'Pre-recorded + TTS', 'Multi-level IVR', 'Real-time Analytics', 'Priority Support', 'Custom Caller ID'],
    cta: 'Get Business',
    highlight: true,
  },
  {
    name: 'Enterprise',
    calls: 'Unlimited',
    price: 'Custom',
    period: '',
    features: ['Unlimited Calls', 'All Voice Features', 'Advanced IVR', 'Voice OTP', 'Dedicated Manager', '24/7 Phone Support', 'API Access'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function VoiceSmsServicePlanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf4ff] via-white to-[#eef2ff] -mt-20 pt-28 pb-16 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e9d5ff_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Voice SMS Service Plan</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />Starting at ₹1,499/month
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Voice SMS{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Service Plan</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Flexible voice call plans with IVR, text-to-speech, and real-time analytics. Scale from 10K to unlimited calls.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.highlight ? 'bg-purple-600 text-white shadow-2xl shadow-purple-600/30' : 'border border-gray-200 bg-white shadow-sm'}`}>
                {plan.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">Most Popular</span>}
                <h2 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h2>
                <p className={`mt-1 text-sm ${plan.highlight ? 'text-purple-200' : 'text-gray-500'}`}>{plan.calls} calls</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`mb-1 text-sm ${plan.highlight ? 'text-purple-200' : 'text-gray-500'}`}>{plan.period}</span>}
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-purple-100' : 'text-gray-600'}`}>
                      <svg className={`h-4 w-4 flex-shrink-0 ${plan.highlight ? 'text-purple-200' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition ${plan.highlight ? 'bg-white text-purple-700 hover:bg-purple-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-600 to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Ready to Start Your Voice Campaign?</h2>
          <p className="mt-4 text-lg text-purple-100">All plans come with free setup and test credits. Get started in 24 hours.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Get Started Free</Link>
            <a href="tel:+919876543210" className="rounded-xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">Call +91 98765 43210</a>
          </div>
        </div>
      </section>
    </>
  );
}
