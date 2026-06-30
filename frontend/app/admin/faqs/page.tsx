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
  HelpCircle,
  Save,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
  createdAt?: any;
}

const EMPTY: Omit<FAQ, "id" | "createdAt"> = {
  question: "",
  answer: "",
  order: 0,
  active: true,
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1d5cf5] focus:bg-white focus:ring-2 focus:ring-[#1d5cf5]/15";
const labelCls =
  "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";

function Modal({
  item,
  onClose,
  onSave,
}: {
  item: Partial<FAQ> | null;
  onClose: () => void;
  onSave: (data: Omit<FAQ, "id" | "createdAt">) => Promise<void>;
}) {
  const isEdit = !!item?.id;
  const [form, setForm] = useState<Omit<FAQ, "id" | "createdAt">>({
    ...EMPTY,
    ...(item ?? {}),
  });
  const [saving, setSaving] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((p) => ({
      ...p,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-10">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-bold text-slate-900">
            {isEdit ? "Edit FAQ" : "Add FAQ"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className={labelCls}>Question *</label>
            <input
              name="question"
              required
              value={form.question}
              onChange={handleChange}
              placeholder="e.g. What is your email deliverability rate?"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Answer *</label>
            <textarea
              name="answer"
              required
              rows={5}
              value={form.answer}
              onChange={handleChange}
              placeholder="Write a clear, concise answer…"
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Display Order</label>
              <input
                name="order"
                type="number"
                min={0}
                value={form.order}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col justify-end">
              <label className={labelCls}>Visibility</label>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors duration-100 active:opacity-75 ${
                  form.active
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                {form.active ? (
                  <ToggleRight className="h-5 w-5" />
                ) : (
                  <ToggleLeft className="h-5 w-5" />
                )}
                {form.active ? "Visible" : "Hidden"}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-100 active:opacity-80 hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<Partial<FAQ> | null | false>(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "faqs"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQ)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const save = useCallback(
    async (data: Omit<FAQ, "id" | "createdAt">) => {
      if ((modal as FAQ)?.id) {
        await updateDoc(doc(db, "faqs", (modal as FAQ).id), data);
      } else {
        await addDoc(collection(db, "faqs"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }
      setModal(false);
    },
    [modal]
  );

  const remove = useCallback(async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "faqs", id));
    setDeleting(null);
  }, []);

  const toggleActive = useCallback(async (item: FAQ) => {
    await updateDoc(doc(db, "faqs", item.id), { active: !item.active });
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">FAQs</h1>
            <p className="mt-1 text-sm text-slate-500">
              {items.length} question{items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setModal({})}
            className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add FAQ
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
            <HelpCircle
              className="h-12 w-12 text-slate-200"
              strokeWidth={1.5}
            />
            <div>
              <p className="font-semibold text-slate-600">No FAQs yet</p>
              <p className="mt-1 text-sm text-slate-400">
                Add frequently asked questions to help your visitors.
              </p>
            </div>
            <button
              onClick={() => setModal({})}
              className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-5 py-2.5 text-sm font-bold text-white transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" /> Add First FAQ
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1d5cf5]/10 text-xs font-bold text-[#1d5cf5]">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">
                      {item.question}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {item.answer}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => toggleActive(item)}
                      title={item.active ? "Hide" : "Show"}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-100 active:opacity-70 ${
                        item.active
                          ? "text-emerald-500 hover:bg-emerald-50"
                          : "text-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {item.active ? (
                        <ToggleRight className="h-5 w-5" />
                      ) : (
                        <ToggleLeft className="h-5 w-5" />
                      )}
                    </button>
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
