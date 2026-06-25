import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials — DigitalAka',
  description:
    'See what 1,000+ businesses say about DigitalAka bulk email and SMS marketing services. Real client reviews, ratings, and success stories.',
  alternates: { canonical: `${SITE.url}/reviews` },
};

const REVIEWS = [
  {
    name: 'Mark R.',
    role: 'CEO, TechStartup',
    rating: 5,
    review:
      'DigitalAka transformed our email outreach completely. Professional setup, fast delivery, and inbox rates we have never seen before. Highly recommend to any business serious about email marketing.',
    service: 'Bulk Email Services',
    avatar: 'MR',
    color: 'bg-[#1d5cf5]',
  },
  {
    name: 'Priya S.',
    role: 'Marketing Director, GreenGoods',
    rating: 5,
    review:
      'We switched from another SMTP provider and the difference was night and day. Deliverability jumped to 99% within the first week. The support team is always available and extremely helpful.',
    service: 'SMTP Server Services',
    avatar: 'PS',
    color: 'bg-violet-600',
  },
  {
    name: 'David K.',
    role: 'CTO, CloudSolutions',
    rating: 5,
    review:
      'From onboarding to the first campaign, the team was incredible. We send 2 million emails a month and have never had a single issue with deliverability or uptime.',
    service: 'Bulk Email Services',
    avatar: 'DK',
    color: 'bg-teal-600',
  },
  {
    name: 'Anil Mehra',
    role: 'Founder, RetailHub India',
    rating: 5,
    review:
      'The bulk SMS gateway is rock solid. Delivery confirmations come through in seconds and the API integration took less than a day. Our promotional campaigns now reach customers instantly.',
    service: 'Bulk SMS Marketing',
    avatar: 'AM',
    color: 'bg-cyan-600',
  },
  {
    name: 'Sneha Patel',
    role: 'E-commerce Manager, FashionMart',
    rating: 5,
    review:
      'We resell DigitalAka services to our own clients and the white-label panel is flawless. Margins are great and our clients never even know we are using a third-party service.',
    service: 'Bulk Email Reseller Plan',
    avatar: 'SP',
    color: 'bg-emerald-600',
  },
  {
    name: 'Ravi Gupta',
    role: 'Operations Head, LogiFlow',
    rating: 5,
    review:
      'Voice SMS was exactly what we needed for delivery alerts. Customers love the automated calls and our customer service workload dropped by 40%. Setup was done in 24 hours.',
    service: 'Voice SMS Service',
    avatar: 'RG',
    color: 'bg-orange-500',
  },
  {
    name: 'Kavita Nair',
    role: 'Digital Marketing Lead, FinanceWave',
    rating: 5,
    review:
      'The email marketing suite is powerful yet easy to use. We set up automated drip sequences in an afternoon. Open rates are up 35% since we switched.',
    service: 'Email Marketing',
    avatar: 'KN',
    color: 'bg-pink-600',
  },
  {
    name: 'Suresh Reddy',
    role: 'CEO, EdTech Solutions',
    rating: 5,
    review:
      'Affordable pricing with enterprise-grade reliability. We evaluated five providers and DigitalAka stood out on deliverability and support response times. No regrets.',
    service: 'SMTP Server Services',
    avatar: 'SR',
    color: 'bg-indigo-600',
  },
  {
    name: 'Pooja Sharma',
    role: 'Head of Growth, HealthPlus',
    rating: 5,
    review:
      'Our appointment reminder SMS campaigns have a 98% delivery rate. The DLT compliance support from the team saved us weeks of effort. Absolutely fantastic service.',
    service: 'Bulk SMS Marketing',
    avatar: 'PS',
    color: 'bg-purple-600',
  },
];

const STATS = [
  { value: '4.9/5', label: 'Average Rating' },
  { value: '1,000+', label: 'Happy Clients' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '7+ yrs', label: 'Trusted Since' },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < count ? 'text-amber-400' : 'text-gray-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#fafcff] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#1d5cf5]/[0.05] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Reviews</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Trusted by 1,000+ Businesses
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#1d5cf5] to-indigo-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            Real reviews from businesses that rely on DigitalAka for bulk email, SMS, and marketing infrastructure every day.
          </p>

          {/* Rating summary */}
          <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white px-8 py-6 shadow-sm">
            <div className="text-5xl font-extrabold text-gray-900">4.9</div>
            <Stars count={5} />
            <p className="text-sm text-gray-500">Based on 1,000+ verified reviews</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-[#1d5cf5]">{s.value}</div>
                <div className="text-xs font-medium text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {REVIEWS.map((r) => (
              <div
                key={r.name + r.service}
                className="mb-6 break-inside-avoid rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <Stars count={r.rating} />
                <p className="mt-3 text-sm leading-relaxed text-gray-700">&ldquo;{r.review}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${r.color} text-xs font-bold text-white`}>
                    {r.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.role}</div>
                  </div>
                </div>
                <span className="mt-4 inline-block rounded-full bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-500">
                  {r.service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Join 1,000+ Happy Clients</h2>
          <p className="mt-3 text-base text-gray-500">Start your journey with DigitalAka and experience the difference yourself.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact" className="w-full sm:w-auto rounded-full bg-[#1d5cf5] px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Get Started Today
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto rounded-full border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-900">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
