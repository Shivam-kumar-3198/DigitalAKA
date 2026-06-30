'use client';

import { 
  BarChart4, 
  LayoutTemplate, 
  MousePointerClick, 
  CalendarClock,
  ShieldCheck,
  Server,
  Settings2,
  Zap,
  Headset,
  MailCheck
} from 'lucide-react';

// ==========================================
// DATA CONSTANTS (Extracted & Polished from Images)
// ==========================================

const FEATURES = [
  {
    title: 'Inside Campaign Insights',
    icon: BarChart4,
    description: 'Inside campaign details are like juice that can help in boosting your campaign. To get to them, all you have to do is visit the overview section in your dashboard.',
  },
  {
    title: 'Marketing Templates',
    icon: LayoutTemplate,
    description: 'Brand messages are delivered perfectly when you have a pre-made marketing template ready to go. Use our top-notch solutions to get access to thousands of premium designs.',
  },
  {
    title: 'Tracking Actions',
    icon: MousePointerClick,
    description: 'From finding out whether an email was opened to checking the precise delivery rate, you can track everything required to make your email campaign a huge success.',
  },
  {
    title: 'Campaign Scheduling', // Corrected from duplicate "Tracking Actions"
    icon: CalendarClock,
    description: 'For maximum impact, there is always a suitable time. The same applies to the scheduling of email campaigns. By scheduling, you implement your strategy perfectly in advance.',
  },
];

const ADVANTAGES = [
  {
    title: 'Improved Deliverability',
    icon: MailCheck,
    description: 'ISPs actively combat spam by blacklisting shared IP addresses. A dedicated SMTP server ensures your sender reputation remains isolated, avoiding the negative impacts of shared email providers and guaranteeing your genuine messages reach the inbox.',
  },
  {
    title: 'Dedicated SMTP Server',
    icon: Server,
    description: 'Sending a huge number of messages in small groups to get around volume limits is monotonous and tedious. With a dedicated SMTP Server, you can send massive volumes of emails with just a single click directly from your software.',
  },
  {
    title: 'Simple Setup',
    icon: Settings2,
    description: 'Setting up an expert SMTP administration doesn’t have to be complicated. It is a basic matter of adjusting your email client’s SMTP settings to securely connect with our infrastructure.',
  },
  {
    title: 'Quicker Delivery',
    icon: Zap,
    description: 'Standard shared SMTP servers experience high volumes of traffic, causing severe delays and postponements. Our devoted, high-performance servers process and send your messages right away without bottlenecks.',
  },
  {
    title: '24/7 Priority Support',
    icon: Headset,
    description: 'With our service, crucial authentication records such as SPF, DKIM, and DMARC are configured within 24 hours. Our dedicated support team is always ready to assist you via call, chat, or conference, 24/7.',
  },
  {
    title: 'Enterprise Security',
    icon: ShieldCheck,
    description: 'Protect your brand identity and data integrity. We implement military-grade encryption and strict compliance protocols to ensure your mailing lists and campaign data remain completely confidential and secure.',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function FeaturesAndBenefits() {
  return (
    <div className="w-full bg-[#fafcff] font-sans selection:bg-blue-500/30">
      
      {/* =========================================
          1. FEATURES SECTION
      ========================================= */}
      <section className="relative w-full pt-16 sm:pt-24 pb-20 sm:pb-32 overflow-hidden border-b border-slate-100 bg-white">
        {/* Soft Background Accent */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
          <div className="h-[600px] w-full max-w-5xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent opacity-70"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-[2rem] sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Features to watch for
            </h2>
            <p className="mt-4 sm:mt-6 text-[15px] sm:text-lg text-slate-500 max-w-2xl mx-auto">
              Everything you need to create, track, and scale your email marketing campaigns from one unified dashboard.
            </p>
          </div>

          {/* Features Grid (2x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative flex flex-col sm:flex-row gap-6 rounded-3xl bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 ring-1 ring-slate-200/80 hover:ring-blue-100 z-10"
                >
                  {/* Icon Container */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================
          2. WHY CHOOSE US SECTION
      ========================================= */}
      <section className="relative w-full pt-16 sm:pt-24 pb-20 sm:pb-32 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-[2rem] sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Why Choose Us
            </h2>
            <p className="mt-4 sm:mt-6 text-[15px] sm:text-lg text-slate-500 max-w-2xl mx-auto">
              We are the most affordable email marketing solution provider. Here are the critical advantages you gain by partnering with our infrastructure.
            </p>
          </div>

          {/* Advantages Grid (3x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ADVANTAGES.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative flex flex-col rounded-[2rem] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/10 overflow-hidden"
                >
                  {/* Dynamic Top Border Accent */}
                  <div className="absolute top-0 left-0 h-1.5 w-full bg-slate-100 transition-colors duration-300">
                    <div className="h-full w-0 bg-blue-600 transition-all duration-500 ease-out group-hover:w-full"></div>
                  </div>

                  <div className="flex items-center gap-4 mb-6 mt-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight">
                      {adv.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-medium">
                    {adv.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}