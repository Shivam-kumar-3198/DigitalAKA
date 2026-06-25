import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Bulk Email Reseller Plan — Affordable Reseller Email Packages',
  description:
    'Affordable bulk email reseller plans with admin panel, white-label branding & full support. Start reselling bulk email services with competitive margins. Get started today!',
  keywords: 'bulk email reseller plan, email reseller plan, bulk email reseller india, reseller email hosting, white label email',
  alternates: { canonical: `${SITE.url}/bulk-email-reseller-plan` },
  openGraph: {
    title: 'Bulk Email Reseller Plan — Affordable Reseller Email Packages',
    description: 'Affordable bulk email reseller plans with admin panel, white-label branding & competitive margins.',
    url: `${SITE.url}/bulk-email-reseller-plan`,
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
    { '@type': 'ListItem', position: 3, name: 'Bulk Email Reseller Plan', item: `${SITE.url}/bulk-email-reseller-plan` },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bulk Email Reseller Plan',
  description: 'Affordable bulk email reseller plans with full admin panel, white-label branding, and competitive margins.',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  areaServed: 'IN',
  serviceType: 'Email Reseller',
};

const PLANS = [
  {
    name: 'Starter Reseller',
    credits: '5,00,000',
    price: '₹4,999',
    period: '/month',
    features: ['500K Email Credits', 'White-label Panel', 'Up to 100 Sub-accounts', '99% Deliverability', 'Email Support'],
    cta: 'Get Starter Plan',
    highlight: false,
  },
  {
    name: 'Pro Reseller',
    credits: '20,00,000',
    price: '₹14,999',
    period: '/month',
    features: ['2M Email Credits', 'White-label Panel', 'Unlimited Sub-accounts', '99% Deliverability', 'Priority Support', 'Dedicated Account Manager'],
    cta: 'Get Pro Plan',
    highlight: true,
  },
  {
    name: 'Enterprise Reseller',
    credits: 'Unlimited',
    price: 'Custom',
    period: '',
    features: ['Unlimited Credits', 'Full White-label', 'Unlimited Sub-accounts', 'Dedicated IPs', '24/7 Phone Support', 'Custom Integrations'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const FEATURES = [
  {
    title: 'Full Admin Panel',
    body: 'Manage all your reseller sub-accounts from a single intuitive dashboard. Add clients, allocate credits, monitor usage, and generate invoices — all in one place.',
    icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2',
  },
  {
    title: 'White-Label Branding',
    body: 'Apply your own logo, colour scheme, and domain to the sending panel. Your clients interact with your brand — not ours. Build a business that is truly yours.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  },
  {
    title: 'Bulk Email Credits',
    body: 'Purchase large volumes of email credits at wholesale prices and distribute them to clients as needed. Unused credits roll over monthly — no waste.',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  },
  {
    title: 'Competitive Pricing',
    body: 'Industry-lowest wholesale rates give you the flexibility to price aggressively in the market while maintaining strong profit margins on every plan you sell.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: '24/7 Reseller Support',
    body: 'Dedicated reseller support line via chat, email, and WhatsApp. We help you resolve client issues fast, handle technical queries, and grow your reseller business.',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    title: 'Easy Setup',
    body: 'Your reseller account is configured and ready within 24 hours of signing up. Step-by-step onboarding guide and video tutorials help you launch your first client immediately.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

export default function BulkEmailResellerPlanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="relative overflow-hidden bg-[#fafcff] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#059669]/[0.05] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Bulk Email Reseller Plan</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Plans Starting from ₹4,999/month
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              Bulk Email{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Reseller Plan
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Start reselling <strong className="font-semibold text-gray-800">bulk email services</strong> under your brand with our affordable reseller plans. Get a complete white-label admin panel, wholesale email credits, and all the support you need to build a profitable email marketing business.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Choose a Plan
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a href="tel:+919876543210" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reseller Pricing Plans</h2>
            <p className="mt-4 text-lg text-gray-600">Choose a plan that fits your business size and client volume.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.highlight
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30'
                    : 'border border-gray-200 bg-white shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`mb-1 text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.period}</span>}
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                      <svg className={`h-4 w-4 flex-shrink-0 ${plan.highlight ? 'text-blue-200' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition ${
                    plan.highlight
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Every Reseller Plan Includes
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Ready to Start Reselling?</h2>
          <p className="mt-3 text-base text-gray-500">Your reseller panel is ready in 24 hours. No tech skills needed.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact" className="w-full sm:w-auto rounded-full bg-[#1d5cf5] px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Get Started Today
            </Link>
            <a href="tel:+919876543210" className="w-full sm:w-auto rounded-full border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-900">
              Call +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
