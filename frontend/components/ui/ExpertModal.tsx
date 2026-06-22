'use client';

import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface ExpertModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ExpertModal({ open, onClose }: ExpertModalProps) {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef             = useRef<HTMLInputElement>(null);

  /* Lock body scroll & focus first field when open */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    firstInputRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Expert enquiry:', form);
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    /* Reset after close animation */
    setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }, 300);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="expert-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 id="expert-modal-title" className="text-lg font-bold text-slate-900">
              Talk to an Expert
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              We'll get back to you within a few hours.
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="ml-4 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" strokeWidth={1.5} />
              <p className="text-lg font-bold text-slate-900">Request received!</p>
              <p className="text-sm text-slate-500">
                One of our experts will reach out to you shortly.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 rounded-full bg-[#1d5cf5] px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="expert-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="expert-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/20"
                  />
                </div>
                <div>
                  <label htmlFor="expert-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="expert-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="expert-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phone
                </label>
                <input
                  id="expert-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/20"
                />
              </div>

              <div>
                <label htmlFor="expert-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  How can we help? <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="expert-message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your email volume, current setup, or any specific questions…"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#1d5cf5] py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(29,92,245,0.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_25px_rgba(29,92,245,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Request Expert Call
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
