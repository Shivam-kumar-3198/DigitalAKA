'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-24 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1d5cf5] hover:text-[#1d5cf5] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d5cf5] ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4'
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );
}
