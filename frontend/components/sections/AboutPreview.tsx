'use client';

import { useState } from 'react';
import { ABOUT } from '@/lib/constants'; // Preserved your original import
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap, Server, Mail, ShieldCheck } from 'lucide-react';

// --- PRICING DATA ---

const SMTP_PLANS = [
  {
    name: 'Trial Plan', 
    price: '$50',
    limitAmount: '1,000',
    limitSuffix: 'Emails / Hour',
    popular: false,
  },
  {
    name: 'Standard SMTP',
    price: '$145',
    limitAmount: '1,500',
    limitSuffix: 'Emails / Hour',
    popular: false,
  },
  {
    name: 'Premium SMTP',
    price: '$185',
    limitAmount: '3,000',
    limitSuffix: 'Emails / Hour',
    popular: true, 
  },
  {
    name: 'Professional SMTP',
    price: '$250',
    limitAmount: '5,000',
    limitSuffix: 'Emails / Hour',
    popular: false,
  },
];

const BULK_PLANS = [
  {
    name: 'Plan 25K',
    price: '₹1,500', 
    limitAmount: '25,000',
    limitSuffix: 'Total Emails',
    popular: false,
  },
  {
    name: 'Plan 50K',
    price: '₹2,500',
    limitAmount: '50,000',
    limitSuffix: 'Total Emails',
    popular: false,
  },
  {
    name: 'Plan 100K',
    price: '₹3,500',
    limitAmount: '100,000',
    limitSuffix: 'Total Emails',
    popular: true,
  },
  {
    name: 'Plan 500K',
    price: '₹10,000',
    limitAmount: '500,000',
    limitSuffix: 'Total Emails',
    popular: false,
  },
];

export default function AboutAndPricingPage() {
  const [pricingType, setPricingType] = useState<'smtp' | 'bulk'>('smtp');

  const activePlans = pricingType === 'smtp' ? SMTP_PLANS : BULK_PLANS;

  return (
    <div className="w-full bg-[#fafcff] font-sans overflow-x-hidden">
      
      {/* =========================================
          1. ABOUT SECTION
      ========================================= */}
      <section className="relative w-full py-16 sm:py-24 lg:py-32" id="about">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
          <div className="h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] bg-gradient-to-bl from-blue-500/10 to-transparent blur-[80px] sm:blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Content */}
          <div className="flex flex-col">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 w-max shadow-sm">
              Company Profile
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-950 leading-[1.1]">
              {ABOUT?.heading || "Driving Global Email Infrastructure"}
            </h2>
            
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
              {ABOUT?.story || "DigitalAka provides enterprise-grade email delivery solutions, empowering businesses to reach their audiences with unmatched reliability."}
            </p>

            {/* Stats Grid */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 border-y border-slate-200/60 py-8">
              {(ABOUT?.stats || [
                { value: '1.4K+', label: 'Clients' },
                { value: '11 Yrs', label: 'Experience' },
                { value: '99.9%', label: 'Uptime' }
              ]).map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <Link 
                href="/about" 
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full border border-slate-900 bg-slate-950 px-6 sm:px-8 text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Architecture */}
          <div className="relative mt-4 lg:mt-0">
            {/* Glass Card Container */}
            <div className="relative rounded-3xl bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-slate-900/5 mx-auto max-w-lg lg:max-w-none">
              
              {/* Premium CSS-Based Infrastructure Graphic */}
              <div className="relative h-[320px] sm:h-[450px] w-full overflow-hidden rounded-2xl bg-[#0b1121] flex items-center justify-center">
                
                {/* Tech Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Core Ambient Glow */}
                <div className="absolute h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-blue-600/30 blur-[60px] sm:blur-[80px]"></div>

                {/* Server Racks - Fluid widths for mobile */}
                <div className="relative z-10 flex flex-col gap-3 sm:gap-4 w-full items-center">
                  {[1, 2, 3].map((item) => (
                    <div 
                      key={item} 
                      className={`h-14 sm:h-16 w-[85%] max-w-[16rem] rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 sm:p-4 flex items-center justify-between shadow-2xl transition-transform duration-700 hover:scale-105 ${
                        item === 2 ? '-translate-x-3 sm:-translate-x-5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Server className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0" />
                        <div className="flex flex-col gap-1.5 w-full">
                          <div className="h-1 sm:h-1.5 w-16 sm:w-24 rounded-full bg-slate-700 overflow-hidden">
                            <div className={`h-full rounded-full bg-blue-500 ${item === 2 ? 'w-3/4' : 'w-full'}`}></div>
                          </div>
                          <div className="h-1 w-8 sm:w-12 rounded-full bg-slate-700"></div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <div className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                        <div className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-emerald-400 animate-pulse delay-75"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating "Email" Node - Using percentages so it doesn't break out of container */}
                <div className="absolute top-[10%] right-[10%] rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-3 backdrop-blur-md animate-[bounce_3s_infinite_ease-in-out]">
                  <Mail className="h-4 w-4 sm:h-6 sm:w-6 text-blue-300" />
                </div>

                {/* Floating "Security" Node */}
                <div className="absolute bottom-[15%] left-[10%] rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-3 backdrop-blur-md animate-[bounce_4s_infinite_ease-in-out] delay-1000">
                  <ShieldCheck className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-400" />
                </div>
              </div>
              
              {/* Floating Detail Badge - Mobile safe positioning */}
              <div className="absolute bottom-4 right-4 sm:-bottom-6 sm:-right-6 rounded-2xl bg-blue-600 p-4 sm:p-6 text-white shadow-2xl max-w-[150px] sm:max-w-[200px] ring-4 ring-white z-20">
                <div className="text-xl sm:text-3xl font-black mb-1 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  100% <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-blue-200" />
                </div>
                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-90 leading-relaxed">
                  Commitment to enterprise security.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* =========================================
          2. NEW PRICING SECTION
      ========================================= */}
      <section className="relative w-full py-16 sm:py-24 lg:py-32 bg-white border-t border-slate-100" id="pricing">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          
          {/* Pricing Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Transparent, Scalable Pricing
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-slate-500 px-4 sm:px-0">
              Choose the perfect plan for your business. Whether you need an SMTP relay or a complete bulk email package, we have you covered.
            </p>
          </div>

          {/* Smart Toggle Switch - Fluid width to prevent mobile overflow */}
          <div className="flex justify-center mb-12 sm:mb-16 px-4">
            <div className="relative flex w-full max-w-[calc(100%-1rem)] sm:max-w-md rounded-full bg-slate-100/80 p-1 sm:p-1.5 shadow-inner ring-1 ring-slate-200/50">
              <button
                onClick={() => setPricingType('smtp')}
                className={`relative flex-1 rounded-full py-2.5 sm:py-3 text-[11px] sm:text-sm font-bold transition-all duration-300 ${
                  pricingType === 'smtp'
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/50'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                SMTP Service
              </button>
              <button
                onClick={() => setPricingType('bulk')}
                className={`relative flex-1 rounded-full py-2.5 sm:py-3 text-[11px] sm:text-sm font-bold transition-all duration-300 ${
                  pricingType === 'bulk'
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/50'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Bulk Email Service
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid - pt-6 prevents mobile badge clipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-md md:max-w-none mx-auto pt-6 lg:pt-0">
            {activePlans.map((plan, index) => {
              const isPopular = plan.popular;
              
              return (
                <div 
                  key={`${pricingType}-${index}`} 
                  className={`animate-in fade-in zoom-in-[0.98] duration-500 relative flex flex-col rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 ${
                    isPopular 
                      ? 'bg-slate-900 text-white ring-1 ring-slate-800 shadow-2xl shadow-blue-900/20 lg:-translate-y-4 hover:shadow-blue-900/40' 
                      : 'bg-white text-slate-900 ring-1 ring-slate-200 shadow-sm hover:shadow-xl'
                  }`}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3.5 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-600/30 whitespace-nowrap z-10">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6 mt-2">
                    <h3 className={`text-sm sm:text-base font-bold uppercase tracking-widest ${isPopular ? 'text-blue-400' : 'text-slate-500'}`}>
                      {plan.name}
                    </h3>
                    <div className="mt-3 sm:mt-4 flex items-baseline text-4xl sm:text-5xl font-black tracking-tight">
                      {plan.price}
                    </div>
                  </div>

                  {/* The Hero Metric (Sending Limit) */}
                  <div className={`mb-8 rounded-2xl p-5 sm:p-6 border ${
                    isPopular 
                      ? 'bg-slate-800/80 border-slate-700/50' 
                      : 'bg-blue-50/50 border-blue-100/50'
                  }`}>
                    <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2 flex items-center gap-1.5 ${
                      isPopular ? 'text-blue-300' : 'text-blue-600/80'
                    }`}>
                      <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                      Sending Limit
                    </p>
                    <p className={`text-2xl sm:text-3xl font-black tracking-tight ${
                      isPopular ? 'text-white' : 'text-blue-600'
                    }`}>
                      {plan.limitAmount}
                    </p>
                    <p className={`text-xs sm:text-sm font-medium mt-1 ${
                      isPopular ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {plan.limitSuffix}
                    </p>
                  </div>

                  {/* Standard Features */}
                  <ul className={`mb-8 flex-1 space-y-3.5 sm:space-y-4 text-xs sm:text-sm font-medium ${
                    isPopular ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 ${isPopular ? 'text-blue-400' : 'text-emerald-500'}`} /> High Deliverability
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 ${isPopular ? 'text-blue-400' : 'text-emerald-500'}`} /> Secure Infrastructure
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 ${isPopular ? 'text-blue-400' : 'text-emerald-500'}`} /> 24/7 Priority Support
                    </li>
                  </ul>

                  {/* Dynamic Nested Button */}
                  <button 
                    className={`mt-auto w-full rounded-xl py-3.5 sm:py-4 text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                      isPopular
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 hover:bg-blue-500'
                        : 'bg-slate-50 text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 hover:ring-slate-300'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>

          {/* Section Bottom CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <Link 
              href="/pricing" 
              className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              View Full Pricing Details
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}