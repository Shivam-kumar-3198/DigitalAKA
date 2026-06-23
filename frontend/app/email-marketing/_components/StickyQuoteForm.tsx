'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

type Fields = { firstName: string; email: string; phone: string; message: string };

export default function StickyQuoteForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Fields>({ firstName: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof Fields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Vertical tab trigger */}
      <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close quote form' : 'Get a quote'}
          className="group flex h-40 w-10 flex-col items-center justify-center gap-0.5 rounded-l-2xl bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-xl transition-all duration-200 hover:w-11 hover:from-blue-700 hover:to-blue-800"
        >
          <svg className="mb-1 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {'Get A Quote'.split('').map((char, i) => (
            <span key={i} className="block text-[10px] font-bold uppercase leading-none tracking-wider">
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </button>
      </div>

      {/* Slide-out panel */}
      <div
        className={`fixed right-10 top-1/2 z-40 w-72 -translate-y-1/2 transition-all duration-300 ease-in-out ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-blue-900/10">
          <div className="flex items-start justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
            <div>
              <h3 className="font-bold text-white">Get A Quote</h3>
              <p className="mt-0.5 text-xs text-blue-100">Free · No commitment</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="mt-0.5 text-white/60 transition-colors hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-5">
            {submitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-800">Quote request submitted!</p>
                <p className="mt-1 text-xs text-gray-500">We'll contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="First Name *"
                  required
                  value={form.firstName}
                  onChange={update('firstName')}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={form.email}
                  onChange={update('email')}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                />
                <input
                  type="tel"
                  placeholder="Phone / Mobile"
                  value={form.phone}
                  onChange={update('phone')}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  value={form.message}
                  onChange={update('message')}
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
