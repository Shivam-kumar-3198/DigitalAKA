"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const SUBJECTS = [
  "SMTP Server",
  "Bulk Email Service",
  "Bulk SMS",
  "Email Marketing",
  "General Inquiry",
  "Partnership",
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/15";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Contact form:", form);
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle2
          className="h-14 w-14 text-emerald-500"
          strokeWidth={1.5}
        />
        <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
        <p className="max-w-xs text-sm text-slate-500">
          Thank you for reaching out. Our team will respond within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
          }}
          className="mt-2 text-sm font-semibold text-[#1d5cf5] underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Work Email <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-subject"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Subject <span className="text-red-400">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className={inputClass + " appearance-none cursor-pointer"}
          >
            <option value="" disabled>
              Select a topic...
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements, email volume, or any specific questions..."
          className={inputClass + " resize-none"}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1d5cf5] py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(29,92,245,0.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_25px_rgba(29,92,245,0.35)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
}
