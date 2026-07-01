'use client';

import { useState, useCallback, memo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, Send, BarChart3, MessageSquare, Users,
  Award, Smile, Mail, Mails, Server, ArrowRight, Activity
} from 'lucide-react';

/* ----------------------------- RICH ILLUSTRATIONS ----------------------------- */
/* Scaled proportionally to ensure they NEVER overflow on mobile and fit cleanly on laptops */

const SmtpIllustration = memo(function SmtpIllustration() {
  return (
    <div className="relative flex w-full items-center justify-center gap-2 sm:gap-5">
      {[1, 2, 3].map((server) => (
        <div
          key={server}
          className={`relative h-28 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-800 shadow-xl transition-all duration-500 sm:h-40 sm:w-16 sm:rounded-xl sm:shadow-2xl ${
            server === 2 ? '-translate-y-2 shadow-blue-900/20 sm:-translate-y-4' : 'translate-y-2 sm:translate-y-3'
          }`}
        >
          <div className="mt-5 h-2.5 w-full bg-blue-500 sm:mt-8 sm:h-3.5" />
          <div className="absolute bottom-3 left-0 flex w-full justify-center gap-1 sm:bottom-4 sm:gap-1.5">
            <span className="h-1 w-1.5 rounded-full bg-blue-400 motion-safe:animate-pulse sm:h-1 sm:w-2" />
            <span className="h-1 w-1.5 rounded-full bg-blue-400 motion-safe:animate-pulse [animation-delay:75ms] sm:h-1 sm:w-2" />
            <span className="h-1 w-1.5 rounded-full bg-blue-400 motion-safe:animate-pulse [animation-delay:150ms] sm:h-1 sm:w-2" />
          </div>
        </div>
      ))}
    </div>
  );
});

const BulkEmailIllustration = memo(function BulkEmailIllustration() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="absolute h-28 w-28 rounded-full bg-blue-200/50 blur-3xl sm:h-40 sm:w-40" />
      <div className="relative z-10 flex h-24 w-40 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xl shadow-blue-900/5 sm:h-32 sm:w-48 sm:rounded-2xl">
        <div className="absolute -right-3 -top-3 rounded-lg border border-blue-100/50 bg-blue-50 p-2 shadow-lg sm:-right-4 sm:-top-4 sm:rounded-xl sm:p-2.5">
          <Send className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
        </div>
        <div className="absolute -bottom-3 -left-3 rounded-lg border border-slate-100 bg-slate-50 p-2 shadow-lg sm:-bottom-4 sm:-left-4 sm:rounded-xl sm:p-2.5">
          <Send className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
        </div>
        <div className="flex w-full flex-col gap-2 px-4 sm:gap-2.5 sm:px-6">
          <div className="h-1.5 w-full rounded-full bg-slate-100 sm:h-2" />
          <div className="h-1.5 w-3/4 rounded-full bg-slate-100 sm:h-2" />
          <div className="h-1.5 w-5/6 rounded-full bg-slate-100 sm:h-2" />
        </div>
      </div>
    </div>
  );
});

const SmsIllustration = memo(function SmsIllustration() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="relative flex h-48 w-28 shrink-0 flex-col rounded-[1.5rem] border-[4px] border-slate-800 bg-white shadow-xl sm:h-60 sm:w-36 sm:rounded-[2rem] sm:border-[6px] sm:shadow-2xl">
        <div className="absolute left-1/2 top-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-slate-800 sm:top-2 sm:h-1.5 sm:w-8" />
        <div className="flex h-full w-full flex-col justify-center gap-3 p-2.5 pt-6 sm:gap-4 sm:p-3 sm:pt-8">
          <div className="self-start rounded-xl rounded-tl-sm bg-slate-100 px-2.5 py-1.5 shadow-sm sm:rounded-2xl sm:px-3 sm:py-2">
            <div className="h-1 w-10 rounded-full bg-slate-300 sm:h-1.5 sm:w-12" />
          </div>
          <div className="self-end rounded-xl rounded-tr-sm bg-blue-600 px-2.5 py-1.5 text-white shadow-sm sm:rounded-2xl sm:px-3 sm:py-2">
            <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </div>
          <div className="self-start rounded-xl rounded-tl-sm bg-slate-100 px-2.5 py-1.5 shadow-sm sm:rounded-2xl sm:px-3 sm:py-2">
            <div className="h-1 w-14 rounded-full bg-slate-300 sm:h-1.5 sm:w-16" />
          </div>
          <div className="self-end rounded-xl rounded-tr-sm bg-blue-600 px-2.5 py-1.5 text-white shadow-sm sm:rounded-2xl sm:px-3 sm:py-2">
            <div className="mt-0.5 h-1 w-6 rounded-full bg-blue-200 sm:h-1.5 sm:w-8" />
          </div>
        </div>
      </div>
    </div>
  );
});

const MarketingIllustration = memo(function MarketingIllustration() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="relative flex h-40 w-56 shrink-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-blue-900/5 sm:h-48 sm:w-72 sm:rounded-xl sm:shadow-2xl">
        <div className="flex h-6 w-full items-center border-b border-slate-100 bg-slate-50 px-3 sm:h-8 sm:px-4">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 sm:h-2 sm:w-2" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 sm:h-2 sm:w-2" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 sm:h-2 sm:w-2" />
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between p-4 pt-5 sm:p-5 sm:pt-6">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-blue-500 border-r-slate-100 sm:h-16 sm:w-16 sm:border-[5px]">
            <BarChart3 className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
          </div>
          <div className="flex h-full items-end gap-1.5 sm:gap-2">
            <div className="h-1/3 w-3.5 rounded-t-sm bg-slate-200 sm:w-5" />
            <div className="h-2/3 w-3.5 rounded-t-sm bg-blue-400 sm:w-5" />
            <div className="h-full w-3.5 rounded-t-sm bg-blue-600 sm:w-5" />
          </div>
        </div>
      </div>
    </div>
  );
});

/* -------------------------------- DATA -------------------------------- */

const STATS = [
  { id: 'clients', num: 1400, suffix: '+', label: 'Clients Served', icon: Users },
  { id: 'years',   num: 11,   suffix: '',  label: 'Years Experience', icon: Award },
  { id: 'happy',   num: 95,   suffix: '%', label: 'Satisfaction', icon: Smile },
];

const OVERVIEW_CARDS = [
  { id: 'email', title: 'Email Marketing', description: 'Premium spam-free email services tailored for global outreach.', icon: Mail, href: '/email-marketing' },
  { id: 'bulk', title: 'Bulk Services', description: 'Industry-leading bulk email and SMS marketing infrastructure.', icon: Mails, href: '/bulk-email-services' },
  { id: 'smtp', title: 'SMTP Server', description: 'Dedicated, professional SMTP servers for high deliverability.', icon: Server, href: '/smtp-server-services' },
];

const TABS_DATA = [
  { id: 'smtp', label: 'SMTP Server', href: '/smtp-server-services', title: 'Precision SMTP Routing', Visual: SmtpIllustration, description: 'Bypass standard limits with our dedicated SMTP servers. Process thousands of emails efficiently, attract new clients, and maintain critical relationships with zero latency and maximum uptime.' },
  { id: 'bulk-email', label: 'Bulk Email', href: '/bulk-email-services', title: 'Inbox-First Deliverability', Visual: BulkEmailIllustration, description: 'Scale your outreach with our high-deliverability bulk email infrastructure. Automated warm-up protocols and IP pooling ensure your campaigns bypass spam filters reliably.' },
  { id: 'bulk-sms', label: 'SMS Gateway', href: '/bulk-sms-marketing', title: 'Enterprise SMS Gateway', Visual: SmsIllustration, description: 'Cut through the noise with a 98% open rate. Our global SMS gateway offers fast delivery and robust APIs to trigger transactional alerts or blast promotional campaigns instantly.' },
  { id: 'email-marketing', label: 'Marketing Suite', href: '/email-marketing', title: 'Intelligent Workflows', Visual: MarketingIllustration, description: 'Build campaigns with our intuitive editor, automate complex customer journeys, and track success with real-time analytics. Boost engagement with smart A/B testing.' },
];

/* ------------------------------ STAT NUMBER ------------------------------ */

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const t0 = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - t0) / 1500, 1);
            setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="text-xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
      {n >= 1000 ? n.toLocaleString() : String(n)}{suffix}
    </span>
  );
}

/* ------------------------------ COMPONENT ------------------------------ */

export default function CompleteSolutions() {
  const [activeTabId, setActiveTabId] = useState(TABS_DATA[0].id);
  const activeData = TABS_DATA.find((t) => t.id === activeTabId) ?? TABS_DATA[0];
  const ActiveVisual = activeData.Visual;

  const handleTabClick = useCallback((id: string) => setActiveTabId(id), []);

  return (
    // Reduced outer padding slightly so it sits perfectly inside a laptop screen view
    <section aria-labelledby="solutions-heading" className="w-full bg-[#fafafa] py-10 font-sans sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase sm:mb-4 sm:px-3 sm:py-1">
            <Activity className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Complete Infrastructure
          </div>
          <h2 id="solutions-heading" className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Scale your outreach <span className="text-slate-400">seamlessly.</span>
          </h2>
        </header>

        {/* ULTRA-MINIMAL STATS GRID */}
        <div className="mx-auto mb-10 max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:mb-16 sm:rounded-3xl">
          <div className="grid grid-cols-3 gap-px">
            {STATS.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center justify-center bg-white p-3 text-center sm:p-8">
                <stat.icon className="mb-1.5 h-4 w-4 text-blue-600 sm:mb-3 sm:h-6 sm:w-6" strokeWidth={1.5} />
                <AnimatedNumber value={stat.num} suffix={stat.suffix} />
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400 sm:mt-2 sm:font-medium sm:tracking-widest lg:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BENTO-STYLE OVERVIEW CARDS */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:mb-16 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {OVERVIEW_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.id} href={card.href} className="group relative flex flex-col items-start justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl sm:p-7">
                <div className="mb-6 sm:mb-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 sm:mb-5 sm:h-12 sm:w-12 sm:rounded-xl">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900 sm:mb-3 sm:text-lg">{card.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">{card.description}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-sm">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* INTERACTIVE STAGE (TABS REDESIGNED) */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-[2rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-slate-200">

            {/* Nav Index */}
            <div className="flex overflow-x-auto border-b border-slate-200 p-2 scrollbar-hide lg:col-span-4 lg:flex-col lg:border-b-0 lg:p-6">
              {TABS_DATA.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex shrink-0 items-center justify-between whitespace-nowrap rounded-lg px-4 py-3 text-left transition-all sm:rounded-xl sm:px-5 sm:py-3.5 ${
                      isActive
                        ? 'bg-blue-50/50 text-blue-700'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="text-xs font-semibold sm:text-sm">{tab.label}</span>
                    {isActive && <div className="ml-4 hidden h-1.5 w-1.5 rounded-full bg-blue-600 lg:block" />}
                  </button>
                );
              })}
            </div>

            {/* Presentation Stage - Tighter padding for laptop screen containment */}
            <div className="grid grid-cols-1 items-center gap-6 p-4 sm:p-8 lg:col-span-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
              <div className="relative flex h-[260px] w-full items-center justify-center sm:h-[320px] lg:h-full">
                <div className="relative z-10 flex w-full items-center justify-center">
                    <ActiveVisual />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div key={activeData.id} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
                  <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                    <h3 className="text-base font-bold text-slate-900 sm:text-xl lg:text-2xl">{activeData.title}</h3>
                  </div>
                  <p className="mb-5 max-w-2xl text-xs leading-relaxed text-slate-500 sm:mb-6 sm:text-sm lg:text-base">
                    {activeData.description}
                  </p>
                  <Link href={activeData.href} className="inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/25 sm:rounded-xl sm:px-6 sm:py-3 sm:text-sm">
                    Deploy {activeData.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}