'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function FAQ() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const q = query(
          collection(db, 'faqs'),
          where('active', '==', true),
          orderBy('order', 'asc')
        );
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQItem)));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFAQs();
  }, []);

  if (!loading && items.length === 0) return null;

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

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
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
        )}
      </div>
    </section>
  );
}
