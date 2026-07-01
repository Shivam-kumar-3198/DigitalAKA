'use client';

import { useState, useCallback } from 'react';
import { ABOUT } from '@/lib/constants';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap, Server, Mail, ShieldCheck, Activity } from 'lucide-react';

/* -------------------------------- DATA -------------------------------- */

const SMTP_PLANS = [
  { name: 'Trial Plan', price: '$50', limitAmount: '1,000', limitSuffix: 'Emails / Hour', popular: false },
  { name: 'Standard SMTP', price: '$145', limitAmount: '1,500', limitSuffix: 'Emails / Hour', popular: false },
  { name: 'Premium SMTP', price: '$185', limitAmount: '3,000', limitSuffix: 'Emails / Hour', popular: true },
  { name: 'Professional SMTP', price: '$250', limitAmount: '5,000', limitSuffix: 'Emails / Hour', popular: false },
];

const BULK_PLANS = [
  { name: 'Plan 25K', price: '₹1,500', limitAmount: '25,000', limitSuffix: 'Total Emails', popular: false },
  { name: 'Plan 50K', price: '₹2,500', limitAmount: '50,000', limitSuffix: 'Total Emails', popular: false },
  { name: 'Plan 100K', price: '₹3,500', limitAmount: '100,000', limitSuffix: 'Total Emails', popular: true },
  { name: 'Plan 500K', price: '₹10,000', limitAmount: '500,000', limitSuffix: 'Total Emails', popular: false },
];

const PLAN_FEATURES = ['High Deliverability', 'Secure Infrastructure', '24/7 Priority Support'];

const DEFAULT_STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '80+', label: 'Happy Clients' },
  { value: '7+', label: 'Years Experience' },
];

/* ----------------------------- VISUAL PANEL ----------------------------- */

function InfrastructureVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] ring-1 ring-slate-200/50 sm:rounded-[2.5rem] sm:p-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:28px_28px]" />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-100/50 blur-[60px] sm:h-64 sm:w-64 sm:blur-[80px]" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between sm:mb-6">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 sm:gap-2">
            <Activity className="h-3.5 w-3.5 text-emerald-500 sm:h-4 sm:w-4" />
            System Status
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 ring-1 ring-emerald-200 sm:px-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            Operational
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          {[
            { Icon: Mail, label: 'SMTP Relay', load: 'w-full', tint: 'text-blue-600' },
            { Icon: Server, label: 'Delivery Engine', load: 'w-3/4', tint: 'text-blue-600' },
            { Icon: ShieldCheck, label: 'Security Layer', load: 'w-5/6', tint: 'text-emerald-500' },
          ].map(({ Icon, label, load, tint }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/60 p-3 shadow-sm backdrop-blur-md transition-all hover:bg-white sm:gap-4 sm:p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100 sm:h-10 sm:w-10">
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${tint}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1.5 text-xs font-bold text-slate-700 sm:mb-2 sm:text-sm">{label}</p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 sm:h-1.5">
                  <div className={`h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500 ${load}`} />
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <span className="h-1 w-1 rounded-full bg-emerald-400 motion-safe:animate-pulse sm:h-1.5 sm:w-1.5" />
                <span className="h-1 w-1 rounded-full bg-emerald-400 motion-safe:animate-pulse [animation-delay:120ms] sm:h-1.5 sm:w-1.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 shadow-lg shadow-blue-500/20 sm:mt-6 sm:p-5">
          <div>
            <div className="flex items-center gap-1.5 text-xl font-black text-white sm:gap-2 sm:text-3xl">
              100%
              <CheckCircle2 className="h-4 w-4 text-blue-200 sm:h-6 sm:w-6" />
            </div>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-widest text-blue-100/90 sm:mt-1">
              Enterprise Commitment
            </p>
          </div>
          <ShieldCheck className="h-8 w-8 text-white/80 sm:h-12 sm:w-12" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ MAIN PAGE ------------------------------ */

export default function AboutAndPricingPage() {
  const [pricingType, setPricingType] = useState<'smtp' | 'bulk'>('smtp');
  const activePlans = pricingType === 'smtp' ? SMTP_PLANS : BULK_PLANS;
  const stats = ABOUT?.stats ?? DEFAULT_STATS;

  const selectSmtp = useCallback(() => setPricingType('smtp'), []);
  const selectBulk = useCallback(() => setPricingType('bulk'), []);

  return (
    <div className="w-full overflow-x-hidden bg-[#fafcff] font-sans">

      {/* ============ ABOUT ============ */}
      <section className="relative w-full py-12 sm:py-24 lg:py-32" id="about" aria-labelledby="about-heading">
        <div className="pointer-events-none absolute inset-0 z-0 flex justify-end">
          <div className="h-[300px] w-[300px] -translate-y-1/4 translate-x-1/4 bg-gradient-to-bl from-blue-500/10 to-transparent blur-[80px] sm:h-[600px] sm:w-[600px] sm:blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

          {/* LEFT - PERFECTLY CENTERED FOR MOBILE */}
          <div className="flex flex-col items-center text-center pt-4 sm:items-start sm:text-left sm:pt-0">
            <span className="mx-auto mb-4 inline-flex w-max items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 shadow-sm sm:mx-0 sm:mb-6 sm:px-3.5 sm:py-1.5">
              Company Profile
            </span>

            <h2 id="about-heading" className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.5rem]">
              {ABOUT?.headline || 'Driving Global Email Infrastructure'}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-600 sm:mx-0 sm:mt-6 sm:text-lg">
              {ABOUT?.subheadline || 'DigitalAka provides enterprise-grade email delivery solutions, empowering businesses to reach their audiences with unmatched reliability.'}
            </p>

            <dl className="mt-8 grid w-full grid-cols-3 divide-x divide-slate-200/60 border-y border-slate-200/60 py-6 sm:mt-10 sm:py-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center px-1.5 text-center sm:px-4">
                  <dd className="text-xl font-black tracking-tight text-slate-950 sm:text-4xl">{stat.value}</dd>
                  <dt className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 sm:mt-1.5">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex w-full justify-center sm:mt-10 sm:justify-start">
              <Link
                href="/about"
                className="inline-flex h-12 w-full max-w-[220px] items-center justify-center rounded-full border border-slate-900 bg-slate-950 px-6 text-xs font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95 sm:h-14 sm:w-auto sm:max-w-none sm:px-8 sm:text-sm"
              >
                About DigitalAka
              </Link>
            </div>
          </div>

          {/* RIGHT (Lighter Visual Panel) */}
          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-lg lg:max-w-none">
            <InfrastructureVisual />
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="relative w-full overflow-hidden border-t border-slate-100 bg-white pt-16 pb-8 sm:pt-24 sm:pb-10 lg:pt-32 lg:pb-12" id="pricing" aria-labelledby="pricing-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
            <h2 id="pricing-heading" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 sm:text-lg">
              Choose the perfect plan for your business — whether you need an SMTP relay or a complete bulk email package.
            </p>
          </div>

          <div className="mb-8 flex justify-center sm:mb-16">
            <div role="tablist" aria-label="Pricing type" className="relative grid w-full max-w-[340px] grid-cols-2 rounded-full bg-slate-100/80 p-1 shadow-inner ring-1 ring-slate-200/50 sm:max-w-md sm:p-1.5">
              <button
                role="tab"
                aria-selected={pricingType === 'smtp'}
                onClick={selectSmtp}
                className={`rounded-full py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:py-3 sm:text-sm sm:tracking-normal sm:capitalize ${
                  pricingType === 'smtp' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                SMTP Service
              </button>
              <button
                role="tab"
                aria-selected={pricingType === 'bulk'}
                onClick={selectBulk}
                className={`rounded-full py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:py-3 sm:text-sm sm:tracking-normal sm:capitalize ${
                  pricingType === 'bulk' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/50' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Bulk Service
              </button>
            </div>
          </div>

          {/* HORIZONTAL SCROLL ON MOBILE - ADDED pt-8 TO PREVENT TOP BADGE CLIPPING */}
          <div className="-mx-4 flex snap-x snap-mandatory overflow-x-auto pt-8 pb-8 pl-4 pr-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-x-visible sm:pt-0 sm:pb-0 sm:pl-0 sm:pr-0 lg:grid-cols-4 lg:gap-8 scrollbar-hide">
            {activePlans.map((plan, index) => {
              const isPopular = plan.popular;
              return (
                <article
                  key={`${pricingType}-${index}`}
                  className={`relative mr-4 flex w-[280px] shrink-0 snap-center snap-always flex-col rounded-[2rem] p-6 transition-all duration-300 sm:mr-0 sm:w-auto sm:p-8 ${
                    isPopular
                      ? 'bg-[#0f172a] text-white shadow-[0_20px_60px_rgba(37,99,235,0.15)] ring-1 ring-slate-800 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(37,99,235,0.25)] lg:-translate-y-4'
                      : 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 hover:-translate-y-1 hover:shadow-xl'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6 mt-2">
                    <h3 className={`text-xs font-bold uppercase tracking-widest sm:text-sm ${isPopular ? 'text-blue-400' : 'text-slate-500'}`}>
                      {plan.name}
                    </h3>
                    <div className={`mt-3 text-5xl font-black tracking-tight sm:mt-4 ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                      {plan.price}
                    </div>
                  </div>

                  <div className={`mb-8 rounded-2xl border p-5 sm:p-6 ${isPopular ? 'border-slate-700/50 bg-[#1e293b]/80' : 'border-blue-100/50 bg-blue-50/50'}`}>
                    <p className={`mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${isPopular ? 'text-blue-300' : 'text-blue-600/80'}`}>
                      <Zap className="h-4 w-4 shrink-0" />
                      Sending Limit
                    </p>
                    <p className={`text-3xl font-black tracking-tight ${isPopular ? 'text-white' : 'text-blue-600'}`}>
                      {plan.limitAmount}
                    </p>
                    <p className={`mt-1 text-xs font-medium sm:text-sm ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                      {plan.limitSuffix}
                    </p>
                  </div>

                  <ul className={`mb-8 flex-1 space-y-3.5 text-xs font-medium sm:space-y-4 sm:text-sm ${isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                    {PLAN_FEATURES.map((feat) => (
                      <li key={feat} className="flex items-center gap-3">
                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${isPopular ? 'text-blue-500' : 'text-emerald-500'}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`mt-auto block w-full rounded-xl py-4 text-center text-sm font-bold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      isPopular
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 hover:bg-blue-500'
                        : 'bg-slate-50 text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 hover:ring-slate-300'
                    }`}
                  >
                    Get Started
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-4 text-center sm:mt-16">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm sm:normal-case sm:tracking-normal"
            >
              View Full Pricing Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}