import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Team — The People Behind DigitalAka',
  description:
    'Meet the team of email, SMS, and digital marketing experts behind DigitalAka. Dedicated professionals committed to delivering 99% inbox delivery and outstanding results.',
  alternates: { canonical: `${SITE.url}/team` },
};

const TEAM = [
  {
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    bio: 'Over 10 years building email infrastructure at scale. Passionate about deliverability, inbox placement, and helping businesses grow through reliable communication.',
    initials: 'AJ',
    color: 'bg-[#1d5cf5]',
  },
  {
    name: 'Samantha Lee',
    role: 'Head of Design',
    bio: 'Creates clean, conversion-focused interfaces that make complex platforms feel effortless. Leads all product design and brand identity work.',
    initials: 'SL',
    color: 'bg-violet-600',
  },
  {
    name: 'Rahul Sharma',
    role: 'Lead Infrastructure Engineer',
    bio: 'Manages our PowerMTA and SMTP infrastructure. Expert in IP warming, reputation management, and high-volume sending pipelines.',
    initials: 'RS',
    color: 'bg-teal-600',
  },
  {
    name: 'Priya Mehta',
    role: 'Customer Success Manager',
    bio: 'Ensures every client gets maximum value from our platform. Handles onboarding, campaign strategy, and day-to-day support for key accounts.',
    initials: 'PM',
    color: 'bg-emerald-600',
  },
  {
    name: 'Arjun Kapoor',
    role: 'SMS & Voice Operations Lead',
    bio: 'Oversees our bulk SMS and voice broadcast operations, including DLT compliance, carrier integrations, and delivery optimisation.',
    initials: 'AK',
    color: 'bg-cyan-600',
  },
  {
    name: 'Neha Verma',
    role: 'Marketing & Growth',
    bio: 'Drives brand awareness and lead generation through SEO, content marketing, and email campaigns. Turns our own product into our biggest success story.',
    initials: 'NV',
    color: 'bg-orange-500',
  },
];

const STATS = [
  { value: '7+', label: 'Years Experience' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '10M+', label: 'Emails / Day' },
  { value: '24/7', label: 'Support' },
];

export default function TeamPage() {
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
            <Link href="/about" className="hover:text-blue-600 transition-colors">Company</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Our Team</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            The People Behind DigitalAka
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-[#1d5cf5] to-indigo-500 bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            A dedicated group of email, SMS, and infrastructure specialists working every day to keep your campaigns in the inbox.
          </p>

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

      {/* Team grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${member.color} text-base font-bold text-white shadow-sm`}>
                  {member.initials}
                </div>
                <h2 className="mt-4 text-lg font-bold text-gray-900">{member.name}</h2>
                <p className="text-sm font-semibold text-[#1d5cf5]">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Want to Work With Us?</h2>
          <p className="mt-3 text-base text-gray-500">We are always looking for talented people who are passionate about email, SMS, and digital growth.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact" className="w-full sm:w-auto rounded-full bg-[#1d5cf5] px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Get in Touch
            </Link>
            <Link href="/about" className="w-full sm:w-auto rounded-full border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-900">
              About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
