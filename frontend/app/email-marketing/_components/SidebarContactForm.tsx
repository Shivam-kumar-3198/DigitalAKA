'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

type Fields = { name: string; email: string; phone: string; message: string };

export default function SidebarContactForm() {
  const [form, setForm] = useState<Fields>({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="font-semibold text-green-800">Message received!</p>
        <p className="mt-1 text-sm text-green-600">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
        <h3 className="text-lg font-bold text-white">Get In Touch</h3>
        <p className="mt-0.5 text-xs text-blue-100">Free consultation · We respond within 24 hours</p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your Name *"
            required
            value={form.name}
            onChange={update('name')}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
          <input
            type="email"
            placeholder="Your Email *"
            required
            value={form.email}
            onChange={update('email')}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
          <input
            type="tel"
            placeholder="Phone / Mobile"
            value={form.phone}
            onChange={update('phone')}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={update('message')}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
