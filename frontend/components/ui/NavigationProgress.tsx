"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname                          = usePathname();
  const [width, setWidth]                 = useState(0);
  const [phase, setPhase]                 = useState<"idle" | "running" | "done">("idle");
  const prevPath                          = useRef(pathname);
  const doneTimer                         = useRef<ReturnType<typeof setTimeout>>();

  /* ── Detect any internal-link click → start bar ── */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      // Skip: empty, hash-only, external, mailto, tel
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        /^https?:\/\//.test(href)
      ) return;
      // Skip same page
      if (href === pathname) return;

      clearTimeout(doneTimer.current);

      // Reset to 0 without animation, then kick off crawl
      setPhase("idle");
      setWidth(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setPhase("running");
          setWidth(65);
        }),
      );
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  /* ── Pathname changed → snap to 100% then hide ── */
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    if (phase !== "running") return;

    setWidth(100);
    setPhase("done");
    doneTimer.current = setTimeout(() => {
      setPhase("idle");
      setWidth(0);
    }, 500);

    return () => clearTimeout(doneTimer.current);
  }, [pathname, phase]);

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
