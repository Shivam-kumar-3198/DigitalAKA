"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Briefcase,
  ExternalLink,
  Save,
} from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  tech: string | string[];
  liveUrl: string;
  slug: string;
  order: number;
  createdAt?: any;
}

const EMPTY: Omit<PortfolioItem, "id" | "createdAt"> = {
  title: "", category: "", thumbnail: "", description: "",
  challenge: "", solution: "", tech: "", liveUrl: "", slug: "", order: 0,
};

const CATEGORIES = [
  "Web Development", "UI/UX Design", "Branding", "SEO", "Digital Marketing",
  "Mobile App", "E-commerce",
];

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/15";
const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";

function Modal({
  item,
  onClose,
  onSave,
}: {
  item: Partial<PortfolioItem> | null;
  onClose: () => void;
  onSave: (data: Omit<PortfolioItem, "id" | "createdAt">) => Promise<void>;
}) {
  const isEdit = !!item?.id;
  const [form, setForm] = useState<Omit<PortfolioItem, "id" | "createdAt">>({
    ...EMPTY,
    ...(item ?? {}),
    tech: Array.isArray((item as any)?.tech)
      ? (item as any).tech.join(", ")
      : ((item as any)?.tech ?? ""),
  });
  const [saving, setSaving] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-10">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-bold text-slate-900">
            {isEdit ? "Edit Portfolio Item" : "Add Portfolio Item"}
          </h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Title *</label>
              <input name="title" required value={form.title} onChange={handleChange} placeholder="Project name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category *</label>
              <select name="category" required value={form.category} onChange={handleChange} className={inputCls + " cursor-pointer"}>
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Slug *</label>
              <input name="slug" required value={form.slug} onChange={handleChange} placeholder="project-slug" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Live URL</label>
              <input name="liveUrl" type="url" value={form.liveUrl} onChange={handleChange} placeholder="https://…" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Thumbnail URL</label>
            <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="/images/portfolio/project.jpg" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Short Description *</label>
            <textarea name="description" required rows={2} value={form.description} onChange={handleChange} placeholder="One-line project overview…" className={inputCls + " resize-none"} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Challenge</label>
              <textarea name="challenge" rows={3} value={form.challenge} onChange={handleChange} placeholder="What problem did you solve?" className={inputCls + " resize-none"} />
            </div>
            <div>
              <label className={labelCls}>Solution</label>
              <textarea name="solution" rows={3} value={form.solution} onChange={handleChange} placeholder="How did you solve it?" className={inputCls + " resize-none"} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Technologies (comma-separated)</label>
            <input name="tech" value={form.tech} onChange={handleChange} placeholder="Next.js, Tailwind CSS, Stripe" className={inputCls} />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-100 active:opacity-80 hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [items, setItems]       = useState<PortfolioItem[]>([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState<Partial<PortfolioItem> | null | false>(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as PortfolioItem)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const save = useCallback(async (data: Omit<PortfolioItem, "id" | "createdAt">) => {
    const payload = {
      ...data,
      tech: Array.isArray(data.tech)
        ? data.tech
        : data.tech.split(",").map((t: string) => t.trim()).filter(Boolean),
    };
    if ((modal as PortfolioItem)?.id) {
      await updateDoc(doc(db, "portfolio", (modal as PortfolioItem).id), payload);
    } else {
      await addDoc(collection(db, "portfolio"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
    }
    setModal(false);
  }, [modal]);

  const remove = useCallback(async (id: string) => {
    if (!confirm("Delete this portfolio item?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "portfolio", id));
    setDeleting(null);
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Portfolio</h1>
            <p className="mt-1 text-sm text-slate-500">{items.length} projects</p>
          </div>
          <button
            onClick={() => setModal({})}
            className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
            <Briefcase className="h-12 w-12 text-slate-200" strokeWidth={1.5} />
            <div>
              <p className="font-semibold text-slate-600">No portfolio items yet</p>
              <p className="mt-1 text-sm text-slate-400">Add your first project to showcase your work.</p>
            </div>
            <button
              onClick={() => setModal({})}
              className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-5 py-2.5 text-sm font-bold text-white transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" /> Add First Project
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-colors duration-100 hover:border-slate-200 hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Briefcase className="h-12 w-12 text-slate-300" strokeWidth={1.5} />
                    </div>
                  )}
                  {/* Category badge */}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 backdrop-blur-sm shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {item.description}
                  </p>

                  {Array.isArray(item.tech) && item.tech.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tech.slice(0, 3).map((t: string) => (
                        <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                          {t}
                        </span>
                      ))}
                      {item.tech.length > 3 && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                          +{item.tech.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 border-t border-slate-100 px-4 py-3">
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Live
                    </a>
                  )}
                  <div className="flex-1" />
                  <button
                    onClick={() => setModal(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-100 active:opacity-70 hover:bg-[#1d5cf5]/10 hover:text-[#1d5cf5]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    disabled={deleting === item.id}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-100 active:opacity-70 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                  >
                    {deleting === item.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal !== false && (
        <Modal
          item={modal || null}
          onClose={() => setModal(false)}
          onSave={save}
        />
      )}
    </>
  );
}
