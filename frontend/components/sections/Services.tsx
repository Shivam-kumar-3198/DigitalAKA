'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  BarChart3, 
  MessageSquare,
  Users, 
  Award, 
  Smile,
  Mail, 
  Mails, 
  Server,
  ArrowRight
} from 'lucide-react';

// --- UNIFIED BLUE THEME ILLUSTRATIONS ---

const SmtpIllustration = () => (
  <div className="relative flex w-full items-center justify-center gap-4 sm:gap-6 animate-in fade-in zoom-in-95 duration-500">
    {[1, 2, 3].map((server) => (
      <div 
        key={server} 
        className={`relative h-48 sm:h-56 w-20 sm:w-24 overflow-hidden rounded-xl bg-slate-800 shadow-2xl transition-all duration-500 ${
          server === 2 ? '-translate-y-4 sm:-translate-y-6 shadow-blue-900/20' : 'translate-y-2'
        }`}
      >
        <div className="mt-12 h-6 w-full bg-blue-500" />
        <div className="absolute bottom-6 left-0 flex w-full justify-center gap-2">
          {/* Status lights unified to brand blue */}
          <div className="h-1.5 w-3 rounded-full bg-blue-400 animate-pulse" />
          <div className="h-1.5 w-3 rounded-full bg-blue-400 animate-pulse delay-75" />
          <div className="h-1.5 w-3 rounded-full bg-blue-400 animate-pulse delay-150" />
        </div>
      </div>
    ))}
  </div>
);

const BulkEmailIllustration = () => (
  <div className="relative flex w-full items-center justify-center animate-in fade-in zoom-in-95 duration-500">
    <div className="absolute h-40 w-40 rounded-full bg-blue-100/50 blur-3xl" />
    <div className="relative z-10 flex h-32 w-48 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-900/5">
      <div className="absolute -right-6 -top-6 rounded-xl bg-blue-50 p-4 shadow-lg border border-blue-100/50">
        <Send className="h-8 w-8 text-blue-600" />
      </div>
      <div className="absolute -left-4 -bottom-4 rounded-xl bg-slate-50 p-3 shadow-lg border border-slate-100">
        <Send className="h-6 w-6 text-slate-400" />
      </div>
      <div className="flex flex-col gap-3 px-6 w-full">
        <div className="h-2 w-full rounded-full bg-slate-100" />
        <div className="h-2 w-3/4 rounded-full bg-slate-100" />
        <div className="h-2 w-5/6 rounded-full bg-slate-100" />
      </div>
    </div>
  </div>
);

const SmsIllustration = () => (
  <div className="relative flex w-full items-center justify-center animate-in fade-in zoom-in-95 duration-500">
    <div className="relative h-64 w-36 rounded-[2rem] border-[6px] border-slate-800 bg-white shadow-2xl">
      <div className="absolute left-1/2 top-2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-slate-800" />
      <div className="flex h-full w-full flex-col gap-4 p-4 pt-8">
        <div className="self-start rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2 shadow-sm">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>
        <div className="self-end rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2 shadow-sm text-white">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="self-start rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2 shadow-sm">
          <div className="h-1.5 w-16 rounded-full bg-slate-300" />
        </div>
        <div className="self-end rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2 shadow-sm text-white">
          <div className="h-1.5 w-8 rounded-full bg-blue-200 mt-1" />
        </div>
      </div>
    </div>
  </div>
);

const MarketingIllustration = () => (
  <div className="relative flex w-full items-center justify-center animate-in fade-in zoom-in-95 duration-500">
    <div className="relative h-56 w-72 sm:w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/5 flex flex-col">
      <div className="flex h-10 w-full items-center border-b border-slate-100 bg-slate-50 px-4">
        {/* Monochromatic UI dots */}
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
      </div>
      <div className="flex flex-1 items-end justify-between p-6 pt-8">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-blue-500 border-r-slate-100">
          <BarChart3 className="h-8 w-8 text-slate-400" />
        </div>
        <div className="flex h-full items-end gap-2">
          <div className="h-1/3 w-6 rounded-t-sm bg-slate-200" />
          <div className="h-2/3 w-6 rounded-t-sm bg-blue-400" />
          <div className="h-full w-6 rounded-t-sm bg-blue-600" />
        </div>
      </div>
    </div>
  </div>
);

// --- STATIC DATA ---

const STATS = [
  { value: '1,400', label: 'Clients Served', icon: Users },
  { value: '11', label: 'Years of Experience', icon: Award },
  { value: '95', label: 'Happy Clients (%)', icon: Smile },
];

const OVERVIEW_CARDS = [
  {
    id: 'email',
    title: 'Email Marketing',
    description: 'Digitalaka provides email marketing software worldwide. We offer premium spam-free email services.',
    icon: Mail,
    href: '#',
  },
  {
    id: 'bulk',
    title: 'Bulk Email Services',
    description: 'Digitalaka is a best email marketing company in India we offer bulk email marketing and bulk SMS.',
    icon: Mails,
    href: '#',
  },
  {
    id: 'smtp',
    title: 'SMTP Server',
    description: 'Top SMTP Servers worldwide. We offer professional SMTP servers for bulk email marketing services.',
    icon: Server,
    href: '#',
  },
];

const TABS_DATA = [
  {
    id: 'smtp',
    label: 'SMTP Server',
    title: 'SMTP Server',
    visual: <SmtpIllustration />,
    description: 'SMTP Server is used for effective bulk email marketing services to satisfy the requirement of the customers. Basically SMTP stands for Simple Mail Transfer Protocol and using for sending and receiving the emails. SMTP server takes less time to process thousands of emails and able to send the same email message to numerous of recipients quite simply. Majority of emails can be sent to attracts the new clients and also maintain longtime relationship with existing client to develop the business.',
  },
  {
    id: 'bulk-email',
    label: 'Bulk Email Services',
    title: 'Bulk Email Deliverability',
    visual: <BulkEmailIllustration />,
    description: 'Scale your outreach with our high-deliverability bulk email infrastructure. We ensure your campaigns bypass spam filters and reach the primary inbox reliably. Our dedicated IP pooling and automated warm-up protocols guarantee maximum sender reputation, giving you the peace of mind to focus entirely on your marketing copy and conversions.',
  },
  {
    id: 'bulk-sms',
    label: 'Bulk SMS marketing',
    title: 'Enterprise SMS Gateway',
    visual: <SmsIllustration />,
    description: 'Reach your audience instantly with our enterprise-grade bulk SMS gateway. With a 98% open rate, SMS marketing cuts through the noise. Our platform offers global coverage, lightning-fast delivery speeds, and robust API integration, allowing you to trigger transactional alerts or blast promotional campaigns seamlessly from one unified dashboard.',
  },
  {
    id: 'email-marketing',
    label: 'Email Marketing',
    title: 'Complete Marketing Suite',
    visual: <MarketingIllustration />,
    description: 'Access an end-to-end email marketing software suite designed for modern businesses. Build visually stunning campaigns using our drag-and-drop editor, automate complex customer journey workflows, and track your success with real-time advanced analytics. Watch your engagement rates soar with smart A/B testing and dynamic personalization tags.',
  }
];

export default function CompleteSolutions() {
  const [activeTabId, setActiveTabId] = useState(TABS_DATA[0].id);
  const activeData = TABS_DATA.find(t => t.id === activeTabId) || TABS_DATA[0];

  return (
    <section className="relative w-full bg-[#f8fafc] py-24 sm:py-32 font-sans overflow-hidden">
      {/* Background Decor - Kept strictly to brand blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-100/40 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* --- 1. HEADER --- */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Complete Solution for Email Marketing
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Empowering businesses globally with high-performance delivery infrastructure and marketing tools.
          </p>
        </div>

        {/* --- 2. STATS RIBBON (Unified Theme) --- */}
        <div className="mx-auto mb-20 grid max-w-5xl grid-cols-1 gap-px bg-slate-200/60 rounded-3xl overflow-hidden shadow-sm sm:grid-cols-3 ring-1 ring-slate-900/5 backdrop-blur-sm">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white/90 p-8 text-center transition-colors hover:bg-white">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <stat.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="text-4xl font-bold tracking-tight text-slate-900 drop-shadow-sm">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* --- 3. OVERVIEW CARDS (Always-On Unified Blue Gradient) --- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-32">
          {OVERVIEW_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id} 
                className="group relative rounded-3xl p-[1.5px] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 shadow-sm"
              >
                {/* Always-On Unified Brand Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 opacity-90" />

                {/* The Actual Card Body */}
                <div className="relative flex h-full flex-col justify-between rounded-[22.5px] bg-white p-8 overflow-hidden">
                  
                  {/* Always-on faint ambient glow inside the card matching brand blue */}
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500 blur-3xl opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.10]" />

                  <div className="relative z-10">
                    {/* Unified Gradient Icon Container */}
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20">
                      <IconComponent className="h-6 w-6 stroke-[1.5]" />
                    </div>

                    <h3 className="mb-4 text-xl font-bold text-slate-900 tracking-tight">
                      {card.title}
                    </h3>

                    <p className="text-base leading-relaxed text-slate-500">
                      {card.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="relative z-10 mt-8 pt-6 border-t border-slate-100/80">
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors duration-300 hover:text-blue-700"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* --- 4. INTERACTIVE TABS SECTION --- */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-2xl shadow-blue-900/5 ring-1 ring-slate-200">
          
          {/* Tabs Navigation */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-8 mb-10">
            {TABS_DATA.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'bg-[#f4f6f8] text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Content Area */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Dynamic Visual Illustration Area */}
            <div className="relative flex aspect-square sm:aspect-[4/3] lg:aspect-square w-full items-center justify-center overflow-hidden rounded-3xl bg-[#f8fafc] border border-slate-100 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
              <div className="relative z-10 w-full">
                {activeData.visual}
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center animate-in slide-in-from-right-4 fade-in duration-500" key={activeData.id}>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-8 w-8 text-blue-600 shrink-0" />
                <h3 className="text-3xl font-bold text-slate-900">
                  {activeData.title}
                </h3>
              </div>
              
              <p className="text-lg leading-relaxed text-slate-600 mb-10">
                <strong className="font-bold text-slate-900">
                  {activeData.label}
                </strong>{' '}
                {activeData.description.replace(activeData.label, '')}
              </p>

              <div>
                <button className="rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-600/25 active:translate-y-0">
                  Get Started with {activeData.label}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}