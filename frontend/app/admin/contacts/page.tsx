"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Mail,
  Trash2,
  Eye,
  Search,
  CheckCircle2,
  Clock,
  X,
  Phone,
  MessageSquare,
  Filter,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: any;
}

type FilterType = "all" | "unread" | "read";

function timeAgo(ts: any): string {
  if (!ts) return "—";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function DetailModal({
  contact,
  onClose,
  onMarkRead,
  onDelete,
}: {
  contact: Contact;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d5cf5]/10 text-base font-bold uppercase text-[#1d5cf5]">
              {contact.name?.[0] ?? "?"}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{contact.name}</p>
              <p className="text-xs text-slate-500">{contact.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Phone className="h-3 w-3" /> Phone
              </div>
              <p className="text-sm text-slate-800">{contact.phone || "—"}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Filter className="h-3 w-3" /> Subject
              </div>
              <p className="text-sm text-slate-800">{contact.subject || "—"}</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <MessageSquare className="h-3 w-3" /> Message
            </div>
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>

          <p className="text-right text-xs text-slate-400">{timeAgo(contact.createdAt)}</p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <button
            onClick={() => { onDelete(contact.id); onClose(); }}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition-colors duration-100 active:opacity-75 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
          {!contact.read && (
            <button
              onClick={() => { onMarkRead(contact.id); onClose(); }}
              className="flex items-center gap-2 rounded-xl bg-[#1d5cf5] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-100 active:opacity-80 hover:bg-blue-700"
            >
              <CheckCircle2 className="h-4 w-4" /> Mark as Read
            </button>
          )}
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-100 hover:bg-slate-50"
          >
            <Mail className="h-4 w-4" /> Reply
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<FilterType>("all");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const markRead = useCallback(async (id: string) => {
    await updateDoc(doc(db, "contacts", id), { read: true });
  }, []);

  const remove = useCallback(async (id: string) => {
    setDeleting(id);
    await deleteDoc(doc(db, "contacts", id));
    setDeleting(null);
  }, []);

  const filtered = contacts.filter((c) => {
    const matchFilter =
      filter === "all" ||
      (filter === "unread" && !c.read) ||
      (filter === "read" && c.read);
    const matchSearch =
      !search ||
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.subject?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contact Submissions</h1>
            <p className="mt-1 text-sm text-slate-500">
              {contacts.length} total · {unreadCount} unread
            </p>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or subject…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#1d5cf5] focus:ring-2 focus:ring-[#1d5cf5]/15"
            />
          </div>
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            {(["all", "unread", "read"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors duration-100 active:opacity-75 ${
                  filter === f
                    ? "bg-[#1d5cf5] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f}
                {f === "unread" && unreadCount > 0 && (
                  <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="divide-y divide-slate-50">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                    <div className="h-2.5 w-48 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Mail className="h-12 w-12 text-slate-200" strokeWidth={1.5} />
              <p className="text-sm text-slate-500">
                {search || filter !== "all" ? "No matching contacts found." : "No contacts yet."}
              </p>
            </div>
          ) : (
            <>
              {/* Table header */}
              <div className="hidden grid-cols-[auto_1fr_1fr_1fr_auto_auto] items-center gap-4 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:grid">
                <span className="w-9" />
                <span>Name</span>
                <span>Subject</span>
                <span>Email</span>
                <span>When</span>
                <span>Actions</span>
              </div>

              <div className="divide-y divide-slate-50">
                {filtered.map((c) => (
                  <div
                    key={c.id}
                    className={`grid grid-cols-1 items-center gap-x-4 gap-y-1 px-6 py-4 transition hover:bg-slate-50 sm:grid-cols-[auto_1fr_1fr_1fr_auto_auto] ${
                      !c.read ? "bg-blue-50/30" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d5cf5]/10 text-sm font-bold uppercase text-[#1d5cf5]">
                      {c.name?.[0] ?? "?"}
                    </div>

                    {/* Name */}
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex sm:hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d5cf5]/10 text-xs font-bold uppercase text-[#1d5cf5]">
                        {c.name?.[0] ?? "?"}
                      </div>
                      <span className="truncate text-sm font-semibold text-slate-900">
                        {c.name}
                      </span>
                      {!c.read && (
                        <span className="shrink-0 rounded-full bg-[#1d5cf5] px-1.5 py-0.5 text-[9px] font-bold text-white">
                          New
                        </span>
                      )}
                    </div>

                    {/* Subject */}
                    <p className="truncate text-sm text-slate-600">{c.subject}</p>

                    {/* Email */}
                    <a
                      href={`mailto:${c.email}`}
                      className="truncate text-xs text-slate-400 hover:text-[#1d5cf5] transition"
                    >
                      {c.email}
                    </a>

                    {/* Time */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      {c.read ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      )}
                      {timeAgo(c.createdAt)}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setSelected(c); if (!c.read) markRead(c.id); }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-100 active:opacity-70 hover:bg-[#1d5cf5]/10 hover:text-[#1d5cf5]"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {!c.read && (
                        <button
                          onClick={() => markRead(c.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-100 active:opacity-70 hover:bg-emerald-50 hover:text-emerald-600"
                          title="Mark as read"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => remove(c.id)}
                        disabled={deleting === c.id}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-100 active:opacity-70 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <DetailModal
          contact={selected}
          onClose={() => setSelected(null)}
          onMarkRead={markRead}
          onDelete={remove}
        />
      )}
    </>
  );
}
