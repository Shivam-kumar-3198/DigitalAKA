'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
}

export default function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpanded(null);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggle = (label: string) =>
    setExpanded((prev) => (prev === label ? null : label));

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-[49] bg-black/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <Link href="/" onClick={onClose} className="flex items-center">
            <img
              src="https://digitalaka.com/wp-content/uploads/2024/06/digitalaka-logo.webp"
              alt="DigitalAka"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const hasDropdown = !!item.dropdown?.length;
              const isExpanded = expanded === item.label;

              return (
                <li key={item.label}>
                  {hasDropdown ? (
                    <>
                      {/* Parent toggle */}
                      <button
                        onClick={() => toggle(item.label)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.label}
                        <svg
                          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Sub-items */}
                      <ul
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <li>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#1d5cf5] transition hover:bg-blue-50"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 5l7 7-7 7" />
                            </svg>
                            View All {item.label}
                          </Link>
                        </li>
                        {item.dropdown!.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={onClose}
                              className="flex items-center gap-2 rounded-lg px-4 py-2.5 pl-5 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                            >
                              <span className="h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center rounded-xl px-4 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="border-t border-gray-100 px-5 py-5 space-y-3">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl bg-[#1d5cf5] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-700"
          >
            Book a Demo
          </Link>
        </div>
      </aside>
    </>
  );
}
