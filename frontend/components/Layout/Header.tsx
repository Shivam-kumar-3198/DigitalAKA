'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Search from './Search';
import MobileMenu from './MobileMenu';
import Button from '@/components/ui/Button';

const NAVIGATION = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/bulk-email-services',
    dropdown: [
      { label: 'Bulk Email Services', href: '/bulk-email-services' },
      { label: 'SMTP Server Services', href: '/smtp-server-services' },
      { label: 'Email Marketing', href: '/email-marketing' },
      { label: 'Bulk SMS Marketing', href: '/bulk-sms-marketing' },
      { label: 'Voice SMS Service', href: '/voice-sms-service' },
      { label: 'Super Email Reseller', href: '/super-email-reseller' },
      { label: 'Bulk Email Reseller Plan', href: '/bulk-email-reseller-plan' },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
    dropdown: [
      { label: 'SMTP INR Pricing', href: '/smtp-inr-pricing' },
      { label: 'Bulk Email Services Plan', href: '/bulk-email-services-plan' },
      { label: 'Voice SMS Service Plan', href: '/voice-sms-service-plan' },
      { label: 'SEO Packages', href: '/seo-packages' },
      { label: 'SMS Plan', href: '/sms-plan' },
    ],
  },
  {
    label: 'Company',
    href: '/about',
    dropdown: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
    ],
  },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-2 sm:pt-3 pointer-events-none transition-all duration-500">
      <div className="mx-auto flex max-w-[95rem] items-center justify-between px-4 sm:px-6 lg:px-8 pointer-events-auto">

        {/* LEFT MODULE — logo + desktop nav */}
        <div
          className={`flex items-center gap-6 rounded-2xl border border-white/60 bg-white/60 px-5 py-3 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ${
            scrolled ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white/80' : 'shadow-sm'
          }`}
        >
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="https://digitalaka.com/wp-content/uploads/2024/06/digitalaka-logo.webp"
              alt="DigitalAka Logo"
              className="h-10 w-auto object-contain pr-2"
              loading="eager"
            />
          </Link>

          <div className="hidden h-6 w-px bg-gray-200/80 xl:block" />

          <nav className="hidden items-center gap-x-1 xl:flex">
            {NAVIGATION.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="relative flex items-center gap-1 px-3 py-2 text-[14px] font-semibold text-gray-600 transition-colors hover:text-gray-900"
                >
                  {item.label}
                  {item.dropdown && (
                    <svg
                      className="h-3.5 w-3.5 text-gray-400 transition-transform duration-300 group-hover:rotate-180"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <span className="absolute inset-x-3 bottom-1 h-0.5 scale-x-0 rounded-full bg-[#1d5cf5] opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                </Link>

                {item.dropdown && (
                  <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="w-64 overflow-hidden rounded-xl border border-white/60 bg-white/95 p-1.5 shadow-[0_10px_40px_rgb(0,0,0,0.1)] backdrop-blur-xl">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block rounded-lg px-4 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-[#1d5cf5]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* RIGHT MODULE — search, sign in, CTA */}
        <div
          className={`hidden xl:flex items-center gap-4 rounded-2xl border border-white/60 bg-white/60 px-3 py-2 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ${
            scrolled ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white/80' : 'shadow-sm'
          }`}
        >
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Search"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-mono text-gray-400 lg:block">
              ⌘K
            </span>
          </button>

          <div className="h-5 w-px bg-gray-200/80" />

          <Button
            href="/contact"
            size="sm"
            className="group relative overflow-hidden rounded-xl bg-[#1d5cf5] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_14px_0_rgba(29,92,245,0.39)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(29,92,245,0.23)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Book a Demo</span>
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="pointer-events-auto inline-flex items-center justify-center rounded-xl bg-white/80 p-2.5 text-gray-600 shadow-sm backdrop-blur-md transition-colors hover:bg-gray-50 xl:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navigation={NAVIGATION}
      />

      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
