'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[#fafcff] pt-24 sm:pt-28 pb-16 sm:pb-20 text-slate-900 selection:bg-[#1d5cf5] selection:text-white">
      
      {/* =========================================
          AMBIENT BACKGROUND
          ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute top-0 w-full h-[500px] sm:h-[700px] bg-gradient-to-b from-[#1d5cf5]/[0.03] to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] sm:[background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000_60%,transparent_100%)] opacity-40"></div>
      </div>

      {/* =========================================
          MAIN EDITORIAL CONTENT
          ========================================= */}
      <div className="relative z-20 mx-auto max-w-[900px] px-4 sm:px-6 text-center">
        <h1 
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.1] transition-all duration-1000 transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          Enterprise SMTP & Bulk Email <br className="hidden md:block" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1d5cf5] via-blue-500 to-cyan-500 pb-1 pr-1">
            Delivery Infrastructure.
          </span>
        </h1>
        
        <p className={`mx-auto mt-4 sm:mt-6 max-w-2xl text-[15px] sm:text-[1.125rem] font-normal sm:font-medium text-slate-500 leading-relaxed transition-all duration-1000 delay-150 transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          DigitalAka processes millions of requests with ultra-low latency. We automate your Bulk Email, SMTP, and SMS routing for absolute inbox supremacy.
        </p>

        <div className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-1000 delay-300 transform-gpu ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Link 
            href="/pricing" 
            className="flex w-full sm:w-auto h-12 sm:h-14 items-center justify-center rounded-full bg-[#1d5cf5] px-8 sm:px-10 text-[13px] sm:text-sm font-medium sm:font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(29,92,245,0.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_25px_rgba(29,92,245,0.35)]"
          >
            Deploy Now
          </Link>
          <Link 
            href="/demo" 
            className="flex w-full sm:w-auto h-12 sm:h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 sm:px-10 text-[13px] sm:text-sm font-medium sm:font-bold tracking-wide text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>

      {/* =========================================
          RESPONSIVE NETWORK DIAGRAM
          ========================================= */}
      <div className="relative z-10 mx-auto mt-12 sm:mt-20 flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 lg:block lg:h-[520px] lg:w-full lg:max-w-[1200px]">
        
        {/* -----------------------------------------
            THE WIRES (Desktop Only)
            ----------------------------------------- */}
        <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1200 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="flow-in" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1d5cf5" stopOpacity="0" />
                <stop offset="50%" stopColor="#1d5cf5" stopOpacity="1" />
                <stop offset="100%" stopColor="#1d5cf5" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="flow-out" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round">
              <path d="M 280,90 C 450,90 450,260 600,260" />
              <path d="M 340,410 C 480,410 480,260 600,260" />
              <path d="M 600,260 C 750,260 750,110 940,110" />
              <path d="M 600,260 C 750,260 750,400 860,400" />
            </g>
            <g strokeLinecap="round">
              <path d="M 280,90 C 450,90 450,260 600,260" stroke="url(#flow-in)" strokeWidth="3" className="animate-data-flow" style={{ strokeDasharray: '60 800' }} />
              <path d="M 340,410 C 480,410 480,260 600,260" stroke="url(#flow-in)" strokeWidth="3" className="animate-data-flow delay-[1s]" style={{ strokeDasharray: '80 800' }} />
              <path d="M 600,260 C 750,260 750,110 940,110" stroke="url(#flow-out)" strokeWidth="3" className="animate-data-flow delay-[0.5s]" style={{ strokeDasharray: '70 800' }} />
              <path d="M 600,260 C 750,260 750,400 860,400" stroke="url(#flow-out)" strokeWidth="3" className="animate-data-flow delay-[1.5s]" style={{ strokeDasharray: '90 800' }} />
            </g>
          </svg>
        </div>

        {/* -----------------------------------------
            THE UI CARDS (With Gradient Borders)
            ----------------------------------------- */}

        {/* 1. Performance Metrics */}
        <div className={`relative w-full rounded-[17px] p-[1px] bg-gradient-to-br from-slate-200 via-white to-blue-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] lg:absolute lg:left-0 lg:top-[20px] lg:w-[280px] z-10 transition-all duration-1000 delay-500 transform-gpu lg:hover:-translate-y-1 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="h-full w-full rounded-2xl bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl font-semibold sm:font-black text-slate-300 tracking-tight sm:tracking-tighter">12<span className="text-sm sm:text-base text-slate-300 font-medium sm:font-bold ml-0.5">%</span></span>
              <div className="flex flex-col text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-[9px] font-medium sm:font-bold text-slate-400 uppercase tracking-widest">Without Us</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-normal sm:font-semibold text-slate-400">Inbox Rate</span>
              </div>
              <div className="h-4 w-7 sm:h-5 sm:w-9 rounded-full bg-slate-50 border border-red-200 relative ml-2 shrink-0">
                <div className="absolute left-[2px] sm:left-[3px] top-[2px] sm:top-[3px] h-[10px] w-[10px] sm:h-[12px] sm:w-[12px] rounded-full bg-red-500 shadow-sm"></div>
              </div>
            </div>
            <div className="h-px w-full bg-slate-100 mb-3 sm:mb-4"></div>
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-semibold sm:font-black text-[#1d5cf5] tracking-tight sm:tracking-tighter">99<span className="text-sm sm:text-base font-medium sm:font-bold ml-0.5">%</span></span>
              <div className="flex flex-col text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[9px] font-medium sm:font-bold text-slate-800 uppercase tracking-widest">DigitalAka</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-normal sm:font-semibold text-slate-500">Inbox Rate</span>
              </div>
              <div className="h-4 w-7 sm:h-5 sm:w-9 rounded-full bg-[#10b981] relative shadow-inner border border-emerald-500/20 ml-2 shrink-0">
                <div className="absolute right-[2px] sm:right-1 top-[2px] sm:top-[3px] h-[10px] w-[10px] sm:h-[12px] sm:w-[12px] rounded-full bg-white shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Data Sources */}
        <div className={`relative w-full rounded-[17px] p-[1px] bg-gradient-to-br from-slate-200 via-white to-blue-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] lg:absolute lg:bottom-[20px] lg:left-[40px] lg:w-[300px] z-10 transition-all duration-1000 delay-700 transform-gpu lg:hover:-translate-y-1 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="h-full w-full rounded-2xl bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="text-[10px] font-medium sm:font-bold uppercase tracking-widest text-slate-800">Your Campaigns</h3>
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-4">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-[9px] sm:text-[10px] font-normal sm:font-bold text-slate-600 uppercase tracking-wide">Bulk Email</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-4">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                <span className="text-[9px] sm:text-[10px] font-normal sm:font-bold text-slate-600 uppercase tracking-wide">Bulk SMS</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-4">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                <span className="text-[9px] sm:text-[10px] font-normal sm:font-bold text-slate-600 uppercase tracking-wide">Voice SMS</span>
              </div>
              <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-3 sm:p-4">
                 <span className="text-lg sm:text-xl text-slate-300 font-light">+</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Center Hub: DigitalAka Engine */}
        <div className={`relative flex justify-center py-4 lg:py-0 lg:absolute lg:left-[50%] lg:top-[50%] lg:w-max lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 transition-all duration-1000 delay-[900ms] transform-gpu ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="relative flex items-center justify-center rounded-2xl bg-white px-8 sm:px-10 py-4 sm:py-5 shadow-sm lg:shadow-[0_0_40px_rgba(29,92,245,0.15)] border border-blue-100 lg:ring-1 lg:ring-[#1d5cf5]/20">
            <div className="absolute -inset-4 -z-10 hidden lg:block rounded-3xl bg-blue-50/50 border border-blue-100/30"></div>
            <div className="absolute -inset-10 -z-20 hidden lg:block animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-blue-200/50"></div>
            <img 
              src="https://digitalaka.com/wp-content/uploads/2024/06/digitalaka-logo.webp" 
              alt="DigitalAka Engine" 
              className="h-6 sm:h-8 lg:h-10 w-auto object-contain relative z-10"
            />
          </div>
        </div>

        {/* 4. Top Right: Security Proxy */}
        <div className={`relative w-full rounded-[17px] p-[1px] bg-gradient-to-br from-slate-200 via-white to-emerald-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-center lg:absolute lg:right-4 lg:top-0 lg:w-[250px] z-10 transition-all duration-1000 delay-500 transform-gpu lg:hover:-translate-y-1 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="h-full w-full rounded-2xl bg-white p-4 sm:p-6">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 text-[10px] font-medium sm:font-bold uppercase tracking-widest text-slate-800">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Secured SMTP Proxy
            </div>
            <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-emerald-50 relative border border-emerald-100">
               <div className="absolute inset-0 rounded-full border border-[#10b981]/30 animate-[spin_4s_linear_infinite] border-dashed"></div>
               <svg className="h-5 w-5 sm:h-7 sm:w-7 text-[#10b981]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
          </div>
        </div>

        {/* 5. Bottom Right: Endpoints */}
        <div className={`relative w-full rounded-[17px] p-[1px] bg-gradient-to-br from-slate-200 via-white to-emerald-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] lg:absolute lg:bottom-[20px] lg:right-[24px] lg:w-[320px] z-10 transition-all duration-1000 delay-700 transform-gpu lg:hover:-translate-y-1 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="h-full w-full rounded-2xl bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h3 className="text-[10px] font-medium sm:font-bold uppercase tracking-widest text-slate-800">Endpoint Routing</h3>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex items-center gap-3 sm:gap-4 rounded-lg border border-slate-100 bg-slate-50 p-2 sm:p-3">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded bg-white shadow-sm border border-slate-100">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] sm:text-[11px] font-medium sm:font-bold text-slate-700 uppercase tracking-widest">Mobile Devices</span>
                    <span className="text-[9px] text-emerald-600 font-normal sm:font-bold uppercase">200ms</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1 rounded-full mt-1 sm:mt-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[98%]"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 rounded-lg border border-slate-100 bg-slate-50 p-2 sm:p-3">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded bg-white shadow-sm border border-slate-100">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] sm:text-[11px] font-medium sm:font-bold text-slate-700 uppercase tracking-widest">User Inboxes</span>
                    <span className="text-[9px] text-emerald-600 font-normal sm:font-bold uppercase">150ms</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1 rounded-full mt-1 sm:mt-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[99%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded CSS for data flow path animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flow {
          from { stroke-dashoffset: 800; }
          to { stroke-dashoffset: -800; }
        }
        .animate-data-flow {
          animation: flow 4s linear infinite;
        }
      `}} />
    </section>
  );
}