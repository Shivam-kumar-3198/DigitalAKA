import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import TableOfContents from './_components/TableOfContents';
import SidebarContactForm from './_components/SidebarContactForm';
import CommentSection from './_components/CommentSection';
import StickyQuoteForm from './_components/StickyQuoteForm';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Email Marketing Service Provider in India | Bulk Email Services',
  description:
    'Top email marketing service provider in India. Send bulk emails with 99% inbox delivery. Built-in email verifier, spam checker & sender score tools. Start your campaign today!',
  keywords: [
    'email marketing service provider',
    'bulk email services',
    'bulk email services provider india',
    'mass email marketing',
    'email marketing company india',
    'smtp email service',
    'email marketing platform',
    'email verifier',
    'spam checker',
  ].join(', '),
  alternates: {
    canonical: `${SITE.url}/email-marketing`,
  },
  openGraph: {
    title: 'Email Marketing Service Provider in India | Bulk Email Services',
    description:
      'Professional bulk email marketing services with 99% inbox delivery, email verifier, spam checker & sender score tools. Trusted by 1000+ businesses.',
    url: `${SITE.url}/email-marketing`,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Marketing Service Provider in India',
    description:
      'Professional bulk email marketing with 99% inbox delivery. Email verifier, spam checker & sender score included.',
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Email Marketing Service Provider',
      item: `${SITE.url}/email-marketing`,
    },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Email Marketing Services',
  description:
    'Professional bulk email marketing services with high inbox delivery rates, built-in email verifier, spam checker, and sender score tools.',
  provider: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  },
  areaServed: 'IN',
  serviceType: 'Email Marketing',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is bulk email marketing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bulk email marketing is a direct-to-inbox technique used to send promotional messages and newsletters to a large audience simultaneously using reliable email service providers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does digitalAka ensure high email deliverability?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'digitalAka uses dedicated IP infrastructure, built-in spam checkers, email verifiers, and sender score monitoring to maintain 99% inbox delivery rates.',
      },
    },
  ],
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: 'cost-effective',
    title: 'Cost-effective',
    body: 'Email marketing delivers a significantly higher response rate and greater profit margins compared to other forms of direct advertising. By building well-planned mailing lists segmented by customer behaviour and demographics, businesses maximise their ROI. The cost-per-acquisition through email far outperforms traditional channels like print, radio, or paid media, making it the preferred choice for budget-conscious marketers looking for scalable results.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'audience-targeted',
    title: 'Audience Targeted',
    body: "Unlike mass broadcasting, email marketing allows you to craft personalised, targeted messages tailored to each subscriber's unique interests, purchase history, and engagement patterns. Advanced segmentation capabilities let you deliver the right content to the right person at the right time. This personalisation drives higher open rates, click-through rates, and conversions — ensuring every campaign resonates deeply with its intended audience.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'economic-remunerative',
    title: 'Economic and Remunerative',
    body: 'Email marketing eliminates the heavy costs associated with traditional marketing — no printing, no postage, and no expensive ad placements. Beautiful HTML email templates can be designed once and reused across campaigns, providing instant follow-up via embedded website links. The result is a dramatically higher response rate at a fraction of the cost of conventional advertising, making it one of the most economically rewarding marketing channels available.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'demonstrable',
    title: 'Demonstrable',
    body: "One of email marketing's greatest strengths is its measurability. Before rolling out a full campaign, businesses can easily conduct A/B tests on subject lines, content, and CTAs with small trial groups. Results are available in real-time, allowing rapid iteration. Compared to traditional direct mail that takes weeks to show results, email marketing provides actionable insights within hours — faster and at a significantly lower cost.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'acquire-goals',
    title: 'Acquire Different Goals',
    body: 'Email marketing is a multi-purpose channel capable of achieving diverse business objectives. It can drive qualified traffic back to your website, acquire new clients through lead nurturing sequences, and retain existing customers with loyalty campaigns and exclusive offers. Whether you are a small startup or a large enterprise, email marketing scales effortlessly to match your growth, making it a cornerstone strategy for businesses across every industry vertical.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const RELATED_POSTS = [
  {
    slug: 'mass-email-marketing-services',
    title: '10 Best Mass Email Marketing Services',
    date: 'January 15, 2025',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    slug: 'email-marketing-trends',
    title: 'Email Marketing Trends in 2026',
    date: 'February 10, 2025',
    gradient: 'from-indigo-500 to-purple-700',
  },
  {
    slug: 'email-marketing-platforms',
    title: 'Top 10 Email Marketing Platforms for Maximum ROI',
    date: 'March 5, 2025',
    gradient: 'from-cyan-500 to-blue-700',
  },
];

const RECENT_POSTS = [
  { slug: 'mass-email-marketing-services', title: 'Mass Email Marketing Services', color: 'bg-blue-500' },
  { slug: 'email-marketing-trends', title: 'Email Marketing Trends in 2026', color: 'bg-indigo-500' },
  { slug: 'email-marketing-platforms', title: 'Top 10 Email Marketing Platforms', color: 'bg-cyan-500' },
  { slug: 'dedicated-ip-vs-shared-ip', title: 'Dedicated IP vs Shared IP: Which is Better?', color: 'bg-violet-500' },
  { slug: 'top-email-delivery-services', title: 'Top 10 Email Delivery Services', color: 'bg-emerald-500' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmailMarketingPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#fafcff] pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#0d9488]/[0.05] to-transparent" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="transition-colors hover:text-teal-600">Home</Link>
            <svg className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/services" className="transition-colors hover:text-teal-600">Services</Link>
            <svg className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-medium text-gray-800">Email Marketing Service Provider</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              #1 Bulk Email Provider in India
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]">
              Bulk Email Services{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Provider in India
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Bulk email marketing is a direct-to-inbox digital marketing technique used by businesses to send
              promotional messages, newsletters, and transactional emails to a large audience simultaneously. By
              leveraging mass emailing through reliable bulk email service providers, companies can reach thousands
              of customers instantly. Our platform comes equipped with built-in tools including an{' '}
              <strong className="font-semibold text-gray-800">email verifier</strong>,{' '}
              <strong className="font-semibold text-gray-800">spam checker</strong>, and{' '}
              <strong className="font-semibold text-gray-800">sender score</strong> analyser to ensure your
              campaigns achieve maximum deliverability and inbox placement.
            </p>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {[
                { value: '99%', label: 'Inbox Rate' },
                { value: '1M+', label: 'Emails / Day' },
                { value: '1000+', label: 'Happy Clients' },
                { value: '7+', label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-teal-600">{stat.value}</div>
                  <div className="text-xs font-medium text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/30"
              >
                Get A Free Quote
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content + Sidebar ────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] xl:gap-16">

          {/* ── Left: Article ────────────────────────────────────────── */}
          <article>

            {/* Table of Contents */}
            <TableOfContents />

            {/* Features Section */}
            <section aria-labelledby="features-heading">
              <h2
                id="features-heading"
                className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl"
              >
                Features by Which Email Marketing Services Can Produce Sales for Your Industry
              </h2>

              <div className="mt-8 space-y-10">
                {FEATURES.map((feature, i) => (
                  <div
                    key={feature.id}
                    id={feature.id}
                    className="scroll-mt-28 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-[11px] font-bold text-white">
                            {i + 1}
                          </span>
                          {feature.title}
                        </h4>
                        <p className="mt-3 leading-relaxed text-gray-600">{feature.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Author Byline */}
            <div className="mt-12 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white shadow-sm">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">admin</p>
                <p className="text-xs text-gray-500">Published · June 2025</p>
              </div>
              <div className="ml-auto flex gap-2">
                {['Facebook', 'X', 'LinkedIn'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    aria-label={`Share on ${platform}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <span className="text-[10px] font-bold">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <section aria-labelledby="related-heading" className="mt-14">
              <h2 id="related-heading" className="mb-6 text-2xl font-bold text-gray-900">
                Related Posts
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {RELATED_POSTS.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div
                      className={`h-40 w-full bg-gradient-to-br ${post.gradient} flex items-end p-4`}
                    >
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                        Blog
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] text-gray-400">{post.date}</p>
                      <h3 className="mt-1 text-sm font-semibold leading-snug text-gray-900 group-hover:text-blue-600">
                        {post.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                        Read more
                        <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Comment Section */}
            <CommentSection />
          </article>

          {/* ── Right: Sidebar ───────────────────────────────────────── */}
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">

            {/* Contact Form */}
            <SidebarContactForm />

            {/* Recent Posts */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="font-bold text-gray-900">Recent Posts</h3>
              </div>
              <ul className="divide-y divide-gray-50 px-4 py-2">
                {RECENT_POSTS.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-center gap-3 py-3 transition-colors hover:text-blue-600"
                    >
                      <div className={`h-12 w-16 flex-shrink-0 rounded-lg ${post.color} opacity-80`} />
                      <span className="text-sm font-medium leading-snug text-gray-700 group-hover:text-blue-600">
                        {post.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SMTP Promo Banner */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-lg">
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Servers Available
              </div>
              <h4 className="mt-3 text-xl font-bold leading-snug">
                PowerMTA SMTP Server
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-blue-100">
                Dedicated IP rotation, high deliverability, and 24/7 support. Send millions of emails with confidence.
              </p>
              <ul className="mt-4 space-y-2">
                {['99% Inbox Delivery', 'IP Rotation Built-in', 'Spam Checker Included', '24/7 Expert Support'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                    <svg className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/smtp-server-services"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Get SMTP Server
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Click-to-Call */}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 text-blue-700 transition hover:bg-blue-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-blue-500">Call us now</div>
                <div className="font-bold text-blue-800">+91 98765 43210</div>
              </div>
            </a>
          </aside>
        </div>
      </div>

      {/* ── Floating Sticky Quote Form ───────────────────────────────────── */}
      <StickyQuoteForm />
    </>
  );
}
