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
  MessageSquareQuote,
  Save,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  active: boolean;
  order: number;
  createdAt?: any;
}

const EMPTY: Omit<Testimonial, "id" | "createdAt"> = {
  quote: "", author: "", role: "", active: true, order: 0,
};

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/15";
const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";

function Modal({
  item,
  onClose,
  onSave,
}: {
  item: Partial<Testimonial> | null;
  onClose: () => void;
  onSave: (data: Omit<Testimonial, "id" | "createdAt">) => Promise<void>;
}) {
  const isEdit = !!item?.id;
  const [form, setForm] = useState<Omit<Testimonial, "id" | "createdAt">>({
    ...EMPTY,
    ...(item ?? {}),
  });
  const [saving, setSaving] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-bold text-slate-900">
            {isEdit ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className={labelCls}>Quote / Review *</label>
            <textarea
              name="quote"
              required
              rows={4}
              value={form.quote}
              onChange={handleChange}
              placeholder="What did the client say…"
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Author Name *</label>
              <input name="author" required value={form.author} onChange={handleChange} placeholder="John Smith" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Role / Company</label>
              <input name="role" value={form.role} onChange={handleChange} placeholder="CEO, Acme Corp" className={inputCls} />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">Active</p>
              <p className="text-xs text-slate-400">Show on the website</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
              className="transition hover:opacity-80"
            >
              {form.active ? (
                <ToggleRight className="h-8 w-8 text-[#1d5cf5]" strokeWidth={1.5} />
              ) : (
                <ToggleLeft className="h-8 w-8 text-slate-300" strokeWidth={1.5} />
              )}
            </button>
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
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [items, setItems]       = useState<Testimonial[]>([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState<Partial<Testimonial> | null | false>(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const save = useCallback(async (data: Omit<Testimonial, "id" | "createdAt">) => {
    if ((modal as Testimonial)?.id) {
      await updateDoc(doc(db, "testimonials", (modal as Testimonial).id), data);
    } else {
      await addDoc(collection(db, "testimonials"), {
        ...data,
        createdAt: serverTimestamp(),
      });
    }
    setModal(false);
  }, [modal]);

  const remove = useCallback(async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "testimonials", id));
    setDeleting(null);
  }, []);

  const toggleActive = useCallback(async (item: Testimonial) => {
    await updateDoc(doc(db, "testimonials", item.id), { active: !item.active });
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
            <p className="mt-1 text-sm text-slate-500">
              {items.length} total · {items.filter((i) => i.active).length} active
            </p>
          </div>
          <button
            onClick={() => setModal({})}
            className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Testimonial
          </button>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="divide-y divide-slate-50">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-5">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-48 animate-pulse rounded bg-slate-100" />
                    <div className="h-2.5 w-64 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <MessageSquareQuote className="h-12 w-12 text-slate-200" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-slate-600">No testimonials yet</p>
                <p className="mt-1 text-sm text-slate-400">Add client reviews to build social proof.</p>
              </div>
              <button
                onClick={() => setModal({})}
                className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-5 py-2.5 text-sm font-bold text-white transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" /> Add First Testimonial
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 px-6 py-5 transition hover:bg-slate-50 ${
                    !item.active ? "opacity-50" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold uppercase text-emerald-700">
                    {item.author?.[0] ?? "?"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-900">{item.author}</p>
                      <span className="text-slate-300">·</span>
                      <p className="text-sm text-slate-500">{item.role}</p>
                      {item.active ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleActive(item)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-100 active:opacity-70 ${
                        item.active
                          ? "text-emerald-500 hover:bg-emerald-50"
                          : "text-slate-300 hover:bg-slate-100 hover:text-slate-500"
                      }`}
                      title={item.active ? "Deactivate" : "Activate"}
                    >
                      {item.active ? (
                        <ToggleRight className="h-5 w-5" strokeWidth={1.8} />
                      ) : (
                        <ToggleLeft className="h-5 w-5" strokeWidth={1.8} />
                      )}
                    </button>
                    <button
                      onClick={() => setModal(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-100 active:opacity-70 hover:bg-[#1d5cf5]/10 hover:text-[#1d5cf5]"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      disabled={deleting === item.id}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-100 active:opacity-70 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                    >
                      {deleting === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
