"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import {
  Mail,
  HelpCircle,
  MessageSquareQuote,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  RefreshCw,
  Briefcase,
  Home,
  BadgeDollarSign,
  Users,
  Building2,
} from "lucide-react";

interface RecentContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  read: boolean;
  createdAt: any;
}

interface Stats {
  contacts: number;
  unread: number;
  faqs: number;
  testimonials: number;
  portfolio: number;
  services: number;
}

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
  return `${days}d ago`;
}

const STAT_CARDS = (s: Stats) => [
  {
    label: "Total Contacts",
    value: s.contacts,
    icon: Mail,
    color: "text-[#1d5cf5]",
    bg: "bg-[#1d5cf5]/10",
    href: "/admin/contacts",
  },
  {
    label: "Unread Messages",
    value: s.unread,
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50",
    href: "/admin/contacts",
    badge: s.unread > 0,
  },
  {
    label: "Portfolio Items",
    value: s.portfolio,
    icon: Briefcase,
    color: "text-violet-500",
    bg: "bg-violet-50",
    href: "/admin/portfolio",
  },
  {
    label: "Testimonials",
    value: s.testimonials,
    icon: MessageSquareQuote,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    href: "/admin/testimonials",
  },
  {
    label: "Services",
    value: s.services,
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
    href: "/admin/services",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    contacts: 0,
    unread: 0,
    faqs: 0,
    testimonials: 0,
    portfolio: 0,
    services: 0,
  });
  const [recent, setRecent] = useState<RecentContact[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    try {
      const [
        contactsSnap,
        unreadSnap,
        faqsSnap,
        testimonialsSnap,
        servicesSnap,
        portfolioSnap,
        recentSnap,
      ] = await Promise.all([
        getDocs(collection(db, "contacts")),
        getDocs(query(collection(db, "contacts"), where("read", "==", false))),
        getDocs(collection(db, "faqs")),
        getDocs(collection(db, "testimonials")),
        getDocs(collection(db, "services")),
        getDocs(collection(db, "portfolio")),
        getDocs(
          query(
            collection(db, "contacts"),
            orderBy("createdAt", "desc"),
            limit(5)
          )
        ),
      ]);

      setStats({
        contacts: contactsSnap.size,
        unread: unreadSnap.size,
        faqs: faqsSnap.size,
        testimonials: testimonialsSnap.size,
        services: servicesSnap.size,
        portfolio: portfolioSnap.size,
      });

      setRecent(
        recentSnap.docs.map((d) => ({ id: d.id, ...d.data() } as RecentContact))
      );
    } catch {
      // Collections may be empty on first run
    } finally {
      setLoadingStats(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await fetchData();
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">{today}</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Welcome card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1d5cf5] to-blue-700 p-6 text-white shadow-[0_8px_30px_rgba(29,92,245,0.3)]">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-12 -translate-y-6 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-64 rounded-full bg-blue-800/40 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-blue-200">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Welcome back</span>
          </div>
          <h2 className="mt-2 text-xl font-bold">
            {user?.email?.split("@")[0] ?? "Admin"}
          </h2>
          <p className="mt-1 text-sm text-blue-200">{user?.email}</p>
        </div>
      </div>

      {/* Stats grid — 2 cols mobile, 3 md, 5 xl */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {STAT_CARDS(stats).map(
          ({ label, value, icon: Icon, color, bg, href, badge }) => (
            <Link
              key={label}
              href={href}
              className="group relative flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}
                >
                  <Icon
                    className={`h-5 w-5 ${color}`}
                    strokeWidth={1.8}
                  />
                </div>
                {badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                    !
                  </span>
                )}
              </div>
              <div>
                {loadingStats ? (
                  <div className="h-8 w-12 animate-pulse rounded-lg bg-slate-100" />
                ) : (
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                )}
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  {label}
                </p>
              </div>
              <ArrowRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          )
        )}
      </div>

      {/* Recent contacts */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="font-semibold text-slate-900">Recent Inquiries</h3>
          <Link
            href="/admin/contacts"
            className="flex items-center gap-1 text-xs font-semibold text-[#1d5cf5] hover:underline"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {loadingStats ? (
          <div className="divide-y divide-slate-50">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="h-8 w-8 animate-pulse rounded-full bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                  <div className="h-2.5 w-48 animate-pulse rounded bg-slate-100" />
                </div>
                <div className="h-2.5 w-12 animate-pulse rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Mail className="h-10 w-10 text-slate-200" strokeWidth={1.5} />
            <p className="text-sm text-slate-400">
              No contact submissions yet.
            </p>
            <p className="text-xs text-slate-300">
              They'll appear here once visitors submit the form.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recent.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d5cf5]/10 text-sm font-bold uppercase text-[#1d5cf5]">
                  {c.name?.[0] ?? "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {c.name}
                    </p>
                    {!c.read && (
                      <span className="shrink-0 rounded-full bg-[#1d5cf5] px-2 py-0.5 text-[10px] font-bold text-white">
                        New
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-slate-500">
                    {c.subject} · {c.email}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-xs text-slate-400">
                  {c.read ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                  )}
                  {timeAgo(c.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
          {[
            {
              href: "/admin/contacts",
              label: "Contacts",
              icon: Mail,
              color: "text-[#1d5cf5]",
              bg: "bg-[#1d5cf5]/8",
            },
            {
              href: "/admin/portfolio",
              label: "Portfolio",
              icon: Briefcase,
              color: "text-violet-600",
              bg: "bg-violet-50",
            },
            {
              href: "/admin/services",
              label: "Services",
              icon: Zap,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              href: "/admin/testimonials",
              label: "Testimonials",
              icon: MessageSquareQuote,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              href: "/admin/faqs",
              label: "FAQs",
              icon: HelpCircle,
              color: "text-pink-600",
              bg: "bg-pink-50",
            },
            {
              href: "/admin/hero",
              label: "Hero",
              icon: Home,
              color: "text-sky-600",
              bg: "bg-sky-50",
            },
            {
              href: "/admin/pricing",
              label: "Pricing",
              icon: BadgeDollarSign,
              color: "text-teal-600",
              bg: "bg-teal-50",
            },
            {
              href: "/admin/clients",
              label: "Clients",
              icon: Building2,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
          ].map(({ href, label, icon: Icon, color, bg }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}
              >
                <Icon className={`h-5 w-5 ${color}`} strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
