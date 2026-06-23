'use client';

import { useState } from 'react';

const ITEMS = [
  { id: 'cost-effective', label: 'Cost-effective' },
  { id: 'audience-targeted', label: 'Audience Targeted' },
  { id: 'economic-remunerative', label: 'Economic and Remunerative' },
  { id: 'demonstrable', label: 'Demonstrable' },
  { id: 'acquire-goals', label: 'Acquire Different Goals' },
];

export default function TableOfContents() {
  const [open, setOpen] = useState(true);

  return (
    <nav
      aria-label="Table of contents"
      className="my-8 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 to-indigo-50/60"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="toc-list"
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/40"
      >
        <span className="flex items-center gap-2.5 text-[15px] font-semibold text-gray-900">
          <svg
            className="h-4 w-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Table of Contents
        </span>
        <svg
          className={`h-5 w-5 text-blue-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ol id="toc-list" className="border-t border-blue-100/60 px-6 py-4 space-y-3">
          {ITEMS.map((item, i) => (
            <li key={item.id} className="flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white shadow-sm">
                {i + 1}
              </span>
              <a
                href={`#${item.id}`}
                className="text-sm font-medium text-blue-700 underline-offset-2 transition-colors hover:text-blue-900 hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
