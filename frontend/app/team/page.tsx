import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import {
  ShieldCheck,
  Zap,
  HeadphonesIcon,
  TrendingUp,
  Award,
  Globe,
  MailCheck,
  MessageSquare,
  Server,
  Users,
  CheckCircle2,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Choose Us — DigitalAka',
  description:
    'Discover the achievements, expertise, and values that make DigitalAka the most trusted email and SMS infrastructure partner for 1,400+ businesses worldwide.',
  alternates: { canonical: `${SITE.url}/team` },
};

const STATS = [
  { value: '11+', label: 'Years in Business' },
  { value: '1,400+', label: 'Clients Worldwide' },
  { value: '99%', label: 'Inbox Delivery Rate' },
  { value: '24/7', label: 'Expert Support' },
];

const ACHIEVEMENTS = [
  {
    icon: MailCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    title: '500 Million+ Emails Delivered',
    description:
      'Over half a billion emails successfully delivered across transactional, promotional, and bulk campaigns — with an industry-leading 99% inbox placement rate.',
  },
  {
    icon: Globe,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Serving 50+ Countries',
    description:
      'Our infrastructure powers businesses across South Asia, Southeast Asia, the Middle East, Africa, and beyond — with localised compliance and carrier integrations.',
  },
  {
    icon: Award,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    title: '11 Years of Uninterrupted Operations',
    description:
      'More than a decade of continuous service with zero long-term outages. Our redundant infrastructure ensures your campaigns never miss a send window.',
  },
  {
    icon: Users,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    title: '1,400+ Satisfied Clients',
    description:
      'From solo entrepreneurs to enterprise marketing teams, over 1,400 businesses trust DigitalAka as their primary email and SMS infrastructure provider.',
  },
  {
    icon: TrendingUp,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    title: '95% Client Retention Rate',
    description:
      'Our clients stay because results speak for themselves. A 95% year-over-year retention rate reflects the trust we have built through consistent, measurable performance.',
  },
  {
    icon: Star,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    title: 'Top-Rated Support Team',
    description:
      'Our dedicated support specialists maintain a 4.9/5 average satisfaction rating. Every query — technical or strategic — is resolved by an actual email expert.',
  },
];

const EXPERTISE = [
  {
    icon: Server,
    title: 'Dedicated SMTP Infrastructure',
    description:
      'PowerMTA-powered dedicated relay servers with custom IP pools, advanced queue management, and real-time delivery monitoring.',
  },
  {
    icon: ShieldCheck,
    title: 'Email Authentication & Compliance',
    description:
      'Full SPF, DKIM, and DMARC setup within 24 hours. We ensure every domain is authenticated, compliant, and protected against spoofing.',
  },
  {
    icon: Zap,
    title: 'IP Warming & Reputation Management',
    description:
      'Structured IP warming strategies and continuous sender reputation monitoring to maintain top-tier inbox placement over the long term.',
  },
  {
    icon: MessageSquare,
    title: 'Bulk SMS & Voice Broadcasting',
    description:
      'DLT-compliant bulk SMS and voice broadcast operations with direct carrier integrations for maximum throughput and delivery confirmation.',
  },
  {
    icon: HeadphonesIcon,
    title: '24 / 7 Technical Support',
    description:
      'Round-the-clock support via call, chat, and conference. Our engineers are available at any hour to resolve delivery issues and optimise campaign performance.',
  },
  {
    icon: MailCheck,
    title: 'Campaign Analytics & Reporting',
    description:
      'Granular real-time reporting on open rates, click-through rates, bounce categories, and deliverability trends — so every decision is backed by data.',
  },
];

const VALUES = [
  {
    title: 'Reliability First',
    description: 'Every architectural decision we make is driven by uptime, redundancy, and consistency. Your campaigns go out when scheduled — no exceptions.',
  },
  {
    title: 'Radical Transparency',
    description: 'We share deliverability data, bounce analyses, and reputation scores openly. No hidden metrics, no vague dashboards — just clear, honest reporting.',
  },
  {
    title: 'Client-Centric Growth',
    description: 'Your sending volume, list quality, and campaign goals shape our recommendations. We grow when you grow — and that alignment drives everything we do.',
  },
  {
    title: 'Continuous Innovation',
    description: 'We actively track ISP policy changes, spam filter evolution, and authentication standards to keep your infrastructure ahead of industry shifts.',
  },
];

export default function TeamPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#fafcff] -mt-20 pt-28 pb-16 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-[#1d5cf5]/[0.05] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] opacity-40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <Link href="/about" className="hover:text-blue-600 transition-colors">Company</Link>
            <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="font-medium text-gray-800">Why Choose Us</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Trusted by 1,400+ Businesses
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            11 Years of{' '}
            <span className="bg-gradient-to-r from-[#1d5cf5] to-indigo-500 bg-clip-text text-transparent">
              Proven Excellence
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            We are not just a service provider — we are the infrastructure backbone behind thousands of successful email and SMS campaigns. Here is what sets us apart.
          </p>

          {/* Stats bar */}
          <div className="mt-12 mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-4 sm:divide-y-0">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center px-6 py-6">
                  <span className="text-3xl font-extrabold text-[#1d5cf5]">{s.value}</span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Achievements ── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Achievements
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Numbers That Speak for Themselves
            </h2>
            <p className="mt-4 text-base text-slate-500">
              Every milestone below is a direct result of the trust our clients place in us — and the standards we hold ourselves to.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 ${item.color}`} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Core Expertise ── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Our Expertise
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Deep Technical Specialisation
            </h2>
            <p className="mt-4 text-base text-slate-500">
              Our capabilities go far beyond sending emails. We are specialists in every layer of email and SMS delivery infrastructure.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERTISE.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Company Values ── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Our Values
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              The Principles We Work By
            </h2>
            <p className="mt-4 text-base text-slate-500">
              These are not corporate slogans — they are the operating principles that guide every technical decision and every client interaction.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <div key={v.title} className="flex gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-7">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1d5cf5] text-xs font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why We're Different ── */}
      <section className="bg-[#0b1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
                The DigitalAka Difference
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Infrastructure You Can Depend On. Support You Can Reach.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-400">
                Most email service providers are platforms. We are a team of specialists who understand the technical depth of email deliverability — and we are directly reachable, 24 hours a day.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="flex h-12 items-center justify-center rounded-full bg-[#1d5cf5] px-8 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
                >
                  Talk to Our Team
                </Link>
                <Link
                  href="/pricing"
                  className="flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: 'Setup in under 24 hours' },
                { label: 'Dedicated IP addresses' },
                { label: 'SPF / DKIM / DMARC configured' },
                { label: 'Real-time delivery reports' },
                { label: 'DLT compliant SMS routes' },
                { label: 'No long-term contracts' },
                { label: 'API & SMTP integration ready' },
                { label: 'Personal account manager' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2} />
                  <span className="text-sm font-medium text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Ready to Upgrade Your Email Infrastructure?</h2>
          <p className="mt-3 text-base text-gray-500">
            Join 1,400+ businesses that trust DigitalAka for their email and SMS delivery. Get started in less than 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact" className="w-full sm:w-auto rounded-full bg-[#1d5cf5] px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Get Started Today
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto rounded-full border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-900">
              See Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
