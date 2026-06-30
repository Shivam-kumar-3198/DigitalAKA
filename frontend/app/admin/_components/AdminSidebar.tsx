"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  HelpCircle,
  MessageSquareQuote,
  Zap,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV = [
  { href: "/admin",              label: "Dashboard",    icon: LayoutDashboard, exact: true },
  { href: "/admin/contacts",     label: "Contacts",     icon: Mail },
  { href: "/admin/faqs",         label: "FAQs",         icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/services",     label: "Services",     icon: Zap },
  { href: "/admin/settings",     label: "Settings",     icon: Settings },
];

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { signOut, user } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
  }

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.06] px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d5cf5] shadow-[0_0_12px_rgba(29,92,245,0.5)]">
          <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">DigitalAka</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <ul className="space-y-0.5">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname?.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNav}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-100 ${
                    isActive
                      ? "bg-[#1d5cf5] text-white shadow-[0_4px_14px_rgba(29,92,245,0.4)]"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-200"
                  }`}
                >
                  <Icon
                    className="h-[18px] w-[18px] shrink-0"
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  <span>{label}</span>
                  {isActive && (
                    <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info */}
      {user && (
        <div className="mx-3 mb-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1d5cf5]/20 text-xs font-bold text-[#5b8fff] uppercase">
              {user.email?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-300">
                {user.email}
              </p>
              <p className="text-[10px] text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="border-t border-white/[0.06] px-3 pb-4 pt-3 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          onClick={onNav}
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-100 hover:bg-white/[0.06] hover:text-slate-200"
        >
          <Globe className="h-[18px] w-[18px]" strokeWidth={1.8} />
          View Website
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-100 active:opacity-75 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0c1930] text-white shadow-lg md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0b1628] transition-transform duration-200 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
        <SidebarContent onNav={() => setOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 bg-[#0b1628] md:flex md:flex-col">
        <SidebarContent />
      </aside>
    </>
  );
}
