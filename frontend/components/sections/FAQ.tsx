'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'What is bulk email marketing and how does it work?',
    answer:
      'Bulk email marketing is the process of sending large volumes of emails to a targeted list of subscribers simultaneously. With DigitalAka, you upload your contact list, design your email campaign, and our SMTP infrastructure delivers it reliably at scale — tracking opens, clicks, and bounces in real time.',
  },
  {
    id: '2',
    question: 'How many emails can I send per day?',
    answer:
      'Our plans support sending from 10,000 to 10 million+ emails per day depending on the tier. Enterprise clients get dedicated IP addresses and custom sending limits. Contact us for a plan tailored to your volume requirements.',
  },
  {
    id: '3',
    question: 'Will my emails land in the inbox or spam folder?',
    answer:
      'Inbox delivery depends on sender reputation, content quality, and list hygiene. DigitalAka provides dedicated IPs, SPF/DKIM/DMARC setup guidance, and real-time bounce handling to maximize deliverability and keep your sender score high.',
  },
  {
    id: '4',
    question: 'Do you provide an SMTP relay service?',
    answer:
      'Yes. DigitalAka offers a high-throughput SMTP relay you can plug into any application, CRM, or marketing tool using standard SMTP credentials. No code changes are needed — just update your SMTP host, port, and credentials.',
  },
  {
    id: '5',
    question: 'Is there a free trial available?',
    answer:
      'Yes — new accounts get a free trial so you can test deliverability, dashboard features, and API integration before committing to a paid plan. No credit card required to start.',
  },
  {
    id: '6',
    question: 'Can I track email opens, clicks, and bounces?',
    answer:
      'Absolutely. Every campaign comes with a real-time analytics dashboard showing open rates, click-through rates, bounce rates, unsubscribes, and geographic breakdowns so you can optimise future sends.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="w-full bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Everything you need to know about our email and SMS infrastructure.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item) => {
            const isOpen = open === item.id;
            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-blue-200 bg-blue-50/50 shadow-sm'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`text-sm font-semibold sm:text-base ${isOpen ? 'text-[#1d5cf5]' : 'text-slate-900'}`}>
                    {item.question}
                  </span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? 'bg-[#1d5cf5] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center">
          <p className="text-base font-semibold text-slate-800">Still have questions?</p>
          <p className="mt-1 text-sm text-slate-500">Our team replies within minutes — not days.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#1d5cf5] px-7 text-sm font-bold text-white shadow-[0_4px_14px_rgba(29,92,245,0.3)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Talk to Our Team
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-green-200 bg-white px-7 text-sm font-bold text-green-700 transition-all hover:-translate-y-0.5 hover:bg-green-50"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
