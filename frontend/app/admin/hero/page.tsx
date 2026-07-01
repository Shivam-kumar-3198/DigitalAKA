"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Save, Loader2, CheckCircle2, Home, ExternalLink } from "lucide-react";

interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCta: string;
  primaryCtaLink: string;
}

const DEFAULT: HeroContent = {
  headline: "Enterprise SMTP & Bulk Email Delivery Infrastructure.",
  subheadline:
    "DigitalAka processes millions of requests with ultra-low latency. We automate your Bulk Email, SMTP, and SMS routing for absolute inbox supremacy.",
  primaryCta: "Deploy Now",
  primaryCtaLink: "/pricing",
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/15";
const labelCls =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";

export default function HeroPage() {
  const [form, setForm] = useState<HeroContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "settings", "hero"))
      .then((snap) => {
        if (snap.exists()) setForm({ ...DEFAULT, ...(snap.data() as HeroContent) });
      })
      .finally(() => setLoading(false));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await setDoc(doc(db, "settings", "hero"), {
      ...form,
      updatedAt: serverTimestamp(),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1d5cf5]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hero Section</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage homepage headline and call-to-action
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <ExternalLink className="h-4 w-4" /> Preview
          </a>
          <button
            type="submit"
            disabled={saving}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-100 active:opacity-80 disabled:opacity-60 ${
              saved
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-[#1d5cf5] hover:bg-blue-700"
            }`}
          >
            {saving ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
            ) : saved ? (
              <><CheckCircle2 className="h-4 w-4" /> Saved!</>
            ) : (
              <><Save className="h-4 w-4" /> Save</>
            )}
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d5cf5]/10">
            <Home className="h-4 w-4 text-[#1d5cf5]" strokeWidth={1.8} />
          </div>
          <h3 className="font-semibold text-slate-900">Hero Content</h3>
        </div>
        <div className="space-y-5 p-6">
          <div>
            <label className={labelCls}>Headline *</label>
            <input
              name="headline"
              required
              value={form.headline}
              onChange={handleChange}
              placeholder="Your main hero headline…"
              className={inputCls}
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Large bold text at the top of the homepage.
            </p>
          </div>

          <div>
            <label className={labelCls}>Subheadline</label>
            <textarea
              name="subheadline"
              rows={3}
              value={form.subheadline}
              onChange={handleChange}
              placeholder="Supporting text below the headline…"
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Primary CTA Button Text</label>
              <input
                name="primaryCta"
                value={form.primaryCta}
                onChange={handleChange}
                placeholder="Deploy Now"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Primary CTA Link</label>
              <input
                name="primaryCtaLink"
                value={form.primaryCtaLink}
                onChange={handleChange}
                placeholder="/pricing"
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Live Preview
        </p>
        <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 text-center">
          <h2 className="text-2xl font-extrabold leading-tight text-slate-900">
            {form.headline || "Your headline…"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            {form.subheadline || "Your subheadline…"}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <span className="rounded-full bg-[#1d5cf5] px-6 py-2.5 text-sm font-bold text-white shadow-sm">
              {form.primaryCta || "CTA"}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-700">
              Talk to an Expert
            </span>
          </div>
        </div>
      </div>

      {/* Mobile sticky save */}
      <div className="sticky bottom-0 flex justify-end sm:hidden">
        <button
          type="submit"
          disabled={saving}
          className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors duration-100 active:opacity-80 disabled:opacity-60 ${
            saved ? "bg-emerald-500" : "bg-[#1d5cf5]"
          }`}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save"}
        </button>
      </div>
    </form>
  );
}
