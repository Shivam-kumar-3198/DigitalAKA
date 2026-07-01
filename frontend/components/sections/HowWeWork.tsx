import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description:
      'We start by understanding your business goals, target audience, and technical requirements through a focused discovery session.',
    color: 'text-[#1d5cf5]',
    bg: 'bg-[#1d5cf5]/10',
    border: 'border-[#1d5cf5]/20',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Strategy & Design',
    description:
      'Our team crafts a data-driven strategy and wireframes tailored to your brand. Every pixel serves a conversion purpose.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200/50',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Build & Integrate',
    description:
      'We engineer your solution with modern tech stacks — fast, secure, and scalable. Full Firestore/SMTP integration included.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/50',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch & Support',
    description:
      'Go live with confidence. We monitor performance post-launch and provide ongoing support to keep you ahead of the curve.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200/50',
  },
];

export default function HowWeWork() {
  return (
    <section className="w-full bg-[#fafcff] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-sm">
            Our Process
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How We Deliver Results
          </h2>
          <p className="mt-4 text-base text-slate-500">
            A proven four-step process that takes your project from idea to a
            live, high-performing digital product.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-start"
                >
                  {/* Icon circle */}
                  <div
                    className={`relative z-10 mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border ${step.border} ${step.bg} shadow-sm transition-transform duration-200 group-hover:-translate-y-1`}
                  >
                    <Icon
                      className={`h-6 w-6 ${step.color}`}
                      strokeWidth={1.8}
                    />
                    <span
                      className={`absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-black shadow-sm ring-1 ring-slate-200 ${step.color}`}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-2 text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
