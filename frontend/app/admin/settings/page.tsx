"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Save,
  Loader2,
  CheckCircle2,
  Settings,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Globe,
} from "lucide-react";

interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  contactEmail: string;
  phone: string;
  address: string;
  whatsapp: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

const DEFAULT: SiteSettings = {
  name: "DigitalAka",
  tagline: "Enterprise SMTP & Bulk Email Delivery Infrastructure",
  description: "DigitalAka is a full-service digital agency specialising in SMTP, Bulk Email, and digital marketing.",
  contactEmail: "hello@digitalaka.com",
  phone: "+91 98765 43210",
  address: "India — serving clients globally",
  whatsapp: "https://wa.me/919876543210",
  twitter: "https://twitter.com/digitalaka",
  linkedin: "https://linkedin.com/company/digitalaka",
  instagram: "https://instagram.com/digitalaka",
};

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/15";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d5cf5]/10">
          <Icon className="h-4 w-4 text-[#1d5cf5]" strokeWidth={1.8} />
        </div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [form, setForm]       = useState<SiteSettings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    getDoc(doc(db, "settings", "site")).then((snap) => {
      if (snap.exists()) {
        setForm({ ...DEFAULT, ...(snap.data() as SiteSettings) });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await setDoc(doc(db, "settings", "site"), {
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
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Manage site-wide configuration stored in Firestore</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-100 active:opacity-80 ${
            saved
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-[#1d5cf5] hover:bg-blue-700"
          } disabled:opacity-60`}
        >
          {saving ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
          ) : saved ? (
            <><CheckCircle2 className="h-4 w-4" /> Saved!</>
          ) : (
            <><Save className="h-4 w-4" /> Save Settings</>
          )}
        </button>
      </div>

      {/* Site Identity */}
      <Section title="Site Identity" icon={Settings}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Site Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="DigitalAka" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tagline</label>
              <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="Your brand tagline" className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Site Description</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your business in 1-2 sentences for SEO…"
              className={inputCls + " resize-none"}
            />
          </div>
        </div>
      </Section>

      {/* Contact Info */}
      <Section title="Contact Information" icon={Mail}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>
                <Mail className="inline h-3 w-3 mr-1 mb-0.5" />Email Address
              </label>
              <input name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} placeholder="hello@digitalaka.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>
                <Phone className="inline h-3 w-3 mr-1 mb-0.5" />Phone Number
              </label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>
                <MapPin className="inline h-3 w-3 mr-1 mb-0.5" />Address / Location
              </label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="India — serving globally" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>
                <MessageSquare className="inline h-3 w-3 mr-1 mb-0.5" />WhatsApp Link
              </label>
              <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="https://wa.me/91…" className={inputCls} />
            </div>
          </div>
        </div>
      </Section>

      {/* Social Links */}
      <Section title="Social Media Links" icon={Globe}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelCls}>Twitter / X</label>
            <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="https://twitter.com/…" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>LinkedIn</label>
            <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/…" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Instagram</label>
            <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="https://instagram.com/…" className={inputCls} />
          </div>
        </div>
      </Section>

      {/* Firestore note */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Note:</strong> Settings are stored in Firestore under <code className="rounded bg-blue-100 px-1 py-0.5">settings/site</code>.
          The website currently reads from <code className="rounded bg-blue-100 px-1 py-0.5">lib/constants.ts</code>. Update that file or
          add Firestore reads to your public pages to reflect changes live.
        </p>
      </div>

      {/* Sticky save button on mobile */}
      <div className="sticky bottom-0 flex justify-end sm:hidden">
        <button
          type="submit"
          disabled={saving}
          className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors duration-100 active:opacity-80 ${
            saved ? "bg-emerald-500" : "bg-[#1d5cf5]"
          } disabled:opacity-60`}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
