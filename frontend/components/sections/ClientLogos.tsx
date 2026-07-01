'use client';

import { useRef } from 'react';

interface Client {
  name: string;
  logo: string;
  website: string;
}

// Static client logos — update this list when adding/removing clients.
// Previously fetched from Firestore on every public page load which caused
// a permission-denied error and a 3.7s Firestore connection on the critical path.
const CLIENTS: Client[] = [];

export default function ClientLogos() {
  const trackRef = useRef<HTMLDivElement>(null);

  if (CLIENTS.length === 0) return null;

  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="w-full border-y border-slate-100 bg-white py-10 overflow-hidden">
      <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          Trusted by leading companies
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={trackRef}
          className="flex animate-marquee items-center gap-12 whitespace-nowrap"
          style={{ animationDuration: `${CLIENTS.length * 4}s` }}
        >
          {doubled.map((client, idx) => (
            <a
              key={`${client.name}-${idx}`}
              href={client.website || undefined}
              target={client.website ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              title={client.name}
              tabIndex={idx >= CLIENTS.length ? -1 : 0}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-7 max-w-[110px] object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </section>
  );
}
