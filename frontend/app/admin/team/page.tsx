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
  Users,
  Save,
  ToggleLeft,
  ToggleRight,
  Linkedin,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin: string;
  active: boolean;
  order: number;
  createdAt?: any;
}

const EMPTY: Omit<TeamMember, "id" | "createdAt"> = {
  name: "",
  role: "",
  bio: "",
  photo: "",
  linkedin: "",
  active: true,
  order: 0,
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
  item: Partial<TeamMember> | null;
  onClose: () => void;
  onSave: (data: Omit<TeamMember, "id" | "createdAt">) => Promise<void>;
}) {
  const isEdit = !!item?.id;
  const [form, setForm] = useState<Omit<TeamMember, "id" | "createdAt">>({
    ...EMPTY,
    ...(item ?? {}),
  });
  const [saving, setSaving] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-bold text-slate-900">
            {isEdit ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Role / Title *</label>
              <input
                name="role"
                required
                value={form.role}
                onChange={handleChange}
                placeholder="Lead Developer"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Short Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={form.bio}
              onChange={handleChange}
              placeholder="A short sentence about this person…"
              className={inputCls + " resize-none"}
            />
          </div>

          <div>
            <label className={labelCls}>Photo URL</label>
            <input
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className={inputCls}
            />
            {form.photo && (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={form.photo}
                  alt="Preview"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <p className="text-[11px] text-slate-400">Photo preview</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>LinkedIn URL</label>
              <input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/…"
                className={inputCls}
              />
            </div>
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
                <ToggleRight
                  className="h-8 w-8 text-[#1d5cf5]"
                  strokeWidth={1.5}
                />
              ) : (
                <ToggleLeft
                  className="h-8 w-8 text-slate-300"
                  strokeWidth={1.5}
                />
              )}
            </button>
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
              {saving
                ? "Saving…"
                : isEdit
                ? "Save Changes"
                : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<Partial<TeamMember> | null | false>(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "team"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const save = useCallback(
    async (data: Omit<TeamMember, "id" | "createdAt">) => {
      if ((modal as TeamMember)?.id) {
        await updateDoc(doc(db, "team", (modal as TeamMember).id), data);
      } else {
        await addDoc(collection(db, "team"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }
      setModal(false);
    },
    [modal]
  );

  const remove = useCallback(async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "team", id));
    setDeleting(null);
  }, []);

  const toggleActive = useCallback(async (item: TeamMember) => {
    await updateDoc(doc(db, "team", item.id), { active: !item.active });
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
            <p className="mt-1 text-sm text-slate-500">
              {items.length} total · {items.filter((i) => i.active).length}{" "}
              active
            </p>
          </div>
          <button
            onClick={() => setModal({})}
            className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Member
          </button>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="divide-y divide-slate-50">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="h-12 w-12 animate-pulse rounded-full bg-slate-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                    <div className="h-2.5 w-48 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <Users className="h-12 w-12 text-slate-200" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-slate-600">
                  No team members yet
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Showcase your team to build trust with visitors.
                </p>
              </div>
              <button
                onClick={() => setModal({})}
                className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-5 py-2.5 text-sm font-bold text-white transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" /> Add First Member
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-6 py-4 transition hover:bg-slate-50 ${
                    !item.active ? "opacity-50" : ""
                  }`}
                >
                  {/* Avatar */}
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1d5cf5]/10 text-base font-bold uppercase text-[#1d5cf5]">
                      {item.name?.[0] ?? "?"}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-900">{item.name}</p>
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
                    {item.bio && (
                      <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                        {item.bio}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {item.linkedin && (
                      <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-100 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => toggleActive(item)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-100 active:opacity-70 ${
                        item.active
                          ? "text-emerald-500 hover:bg-emerald-50"
                          : "text-slate-300 hover:bg-slate-100 hover:text-slate-500"
                      }`}
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
