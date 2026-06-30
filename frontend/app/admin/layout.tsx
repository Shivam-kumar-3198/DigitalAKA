"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (!loading && user && isLoginPage) {
      router.replace("/admin");
    }
  }, [user, loading, isLoginPage, router]);

  // Initial auth resolution spinner (shown on all admin pages)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f0f4f8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#1d5cf5]/20 border-t-[#1d5cf5]" />
          <p className="text-sm text-slate-400">Loading admin panel…</p>
        </div>
      </div>
    );
  }

  // Login page gets a clean full-page layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Not authenticated → show nothing while redirect happens
  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f4f8]">
      <AdminSidebar />

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
          {/* Left: spacer for mobile hamburger */}
          <div className="w-10 md:hidden" />

          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-slate-400">Admin Panel</span>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold text-slate-700">DigitalAka</span>
          </div>

          {/* Right: status badge */}
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">Live</span>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
