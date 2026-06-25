"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname                          = usePathname();
  const [width, setWidth]                 = useState(0);
  const [phase, setPhase]                 = useState<"idle" | "running" | "done">("idle");
  const prevPath                          = useRef(pathname);
  const doneTimer                         = useRef<ReturnType<typeof setTimeout>>();
  const navigating                        = useRef(false);

  /* ── Detect any internal-link click → start bar ── */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        /^https?:\/\//.test(href)
      ) return;
      if (href === pathname) return;

      clearTimeout(doneTimer.current);
      navigating.current = true;
      setPhase("running");
      setWidth(65);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  /* ── Pathname changed → snap to 100% then hide ── */
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    if (!navigating.current) return;
    navigating.current = false;

    setWidth(100);
    setPhase("done");
    doneTimer.current = setTimeout(() => {
      setPhase("idle");
      setWidth(0);
    }, 500);

    return () => clearTimeout(doneTimer.current);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] h-[3px] bg-[#1d5cf5]"
      style={{
        width: `${width}%`,
        opacity: phase === "idle" ? 0 : 1,
        boxShadow:
          phase !== "idle"
            ? "0 0 10px rgba(29,92,245,0.7), 0 0 4px rgba(29,92,245,0.5)"
            : "none",
        transition:
          phase === "idle"
            ? "opacity 0.3s ease, width 0s 0.3s"
            : phase === "running"
            ? "width 2s cubic-bezier(0.08,0.6,0.2,1), opacity 0.1s ease"
            : "width 0.25s ease-out, opacity 0.3s 0.3s",
      }}
    />
  );
}
