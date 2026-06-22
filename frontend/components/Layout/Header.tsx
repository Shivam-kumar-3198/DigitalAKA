'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import Button from '@/components/ui/Button';

// Updated Navigation Structure
const NAVIGATION = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Bulk Email Services', href: '/bulk-email-services' },
      { label: 'SMTP Server Services', href: '/smtp-server-services' },
      { label: 'Email Marketing Service Provider', href: '/email-marketing' },
      { label: 'Bulk SMS Marketing', href: '/bulk-sms-marketing' },
      { label: 'Voice SMS Service', href: '/voice-sms-service' },
      { label: 'Super Email Reseller Program', href: '/super-email-reseller' },
      { label: 'Bulk Email Reseller Plan', href: '/bulk-email-reseller-plan' },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
    dropdown: [
      { label: 'SMTP INR PRICING', href: '/smtp-inr-pricing' },
      { label: 'Bulk Email Services Plan', href: '/bulk-email-services-plan' },
      { label: 'Voice Sms Service Plan', href: '/voice-sms-service-plan' },
      { label: 'SEO Packages', href: '/seo-packages' },
      { label: 'SMS-PLAN', href: '/sms-plan' },
    ],
  },
  {
    label: 'Company',
    href: '/company',
    dropdown: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
    ],
  },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact us', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-2 sm:pt-3 pointer-events-none transition-all duration-500">
      <div className="mx-auto flex max-w-[95rem] items-center justify-between px-4 sm:px-6 lg:px-8 pointer-events-auto">
        
        {/* LEFT MODULE */}
        <div 
          className={`flex items-center gap-6 rounded-2xl border border-white/60 bg-white/60 px-5 py-3 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ${
            scrolled ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white/80' : 'shadow-sm'
          }`}
        >
          {/* Logo Component */}
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src="https://digitalaka.com/wp-content/uploads/2024/06/digitalaka-logo.webp" 
              alt="digitalAka Logo" 
              className="h-10 w-auto object-contain pr-2"
              loading="eager"
            />
          </Link>

          {/* Vertical Separator */}
          <div className="hidden h-6 w-px bg-gray-200/80 xl:block"></div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-x-1 xl:flex">
            {NAVIGATION.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-[14px] font-semibold text-gray-600 transition-colors hover:text-gray-900"
                >
                  {item.label}
                  {item.dropdown && (
                    <svg className="h-3.5 w-3.5 text-gray-400 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <span className="absolute inset-x-3 bottom-1 h-0.5 scale-x-0 rounded-full bg-[#1d5cf5] opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"></span>
                </Link>

                {/* Dropdown Menu Panel */}
                {item.dropdown && (
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    <div className="w-64 overflow-hidden rounded-xl border border-white/60 bg-white/95 p-1.5 shadow-[0_10px_40px_rgb(0,0,0,0.1)] backdrop-blur-xl">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block rounded-lg px-4 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-[#1d5cf5]"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* RIGHT MODULE */}
        <div 
          className={`hidden xl:flex items-center gap-4 rounded-2xl border border-white/60 bg-white/60 px-3 py-2 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ${
            scrolled ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white/80' : 'shadow-sm'
          }`}
        >
          {/* Search Icon */}
          <button className="p-2 text-gray-500 transition-colors hover:text-gray-900" aria-label="Search">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <div className="h-5 w-px bg-gray-200/80"></div>

          <Link href="/login" className="px-2 text-[14px] font-semibold text-gray-600 transition-colors hover:text-gray-900">
            Sign in
          </Link>
          
          <Button 
            href="/contact" 
            size="sm" 
            className="group relative overflow-hidden rounded-xl bg-[#1d5cf5] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_4px_14px_0_rgba(29,92,245,0.39)] transition-all hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(29,92,245,0.23)] hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
            <span className="relative">Book a Demo</span>
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="pointer-events-auto inline-flex items-center justify-center rounded-xl bg-white/80 p-2.5 text-gray-600 shadow-sm backdrop-blur-md transition-colors hover:bg-gray-50 xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} navigation={NAVIGATION} />
    </header>
  );
}