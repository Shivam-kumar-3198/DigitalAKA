"use client";

import { useState, FormEvent } from "react";
import { Eye, EyeOff, Zap, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      // redirect handled by admin layout useEffect
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0b1628]">
      {/* Left decorative panel */}
      <div className="relative hidden lg:flex lg:w-[45%] flex-col items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1d5cf5]/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative z-10 px-12 text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1d5cf5] shadow-[0_0_40px_rgba(29,92,245,0.5)]">
              <Zap className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            DigitalAka
          </h1>
          <p className="mt-3 text-base text-slate-400">
            Admin Control Centre
          </p>

          <div className="mt-10 space-y-4 text-left">
            {[
              { icon: ShieldCheck, text: "Secured with Firebase Authentication" },
              { icon: ShieldCheck, text: "Manage contacts, portfolio & content" },
              { icon: ShieldCheck, text: "Real-time Firestore data sync" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1d5cf5]/20">
                  <Icon className="h-4 w-4 text-[#5b8fff]" strokeWidth={2} />
                </div>
                <span className="text-sm text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
      </div>

      {/* Right login form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d5cf5]">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-white">DigitalAka Admin</span>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm shadow-2xl">
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="mt-1 text-sm text-slate-400">
              Sign in to manage your digital platform
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@digitalaka.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#1d5cf5] focus:ring-2 focus:ring-[#1d5cf5]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#1d5cf5] focus:ring-2 focus:ring-[#1d5cf5]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d5cf5] py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(29,92,245,0.35)] transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_10px_25px_rgba(29,92,245,0.45)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d5cf5]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign In to Admin Panel"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              Access restricted to authorised administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
