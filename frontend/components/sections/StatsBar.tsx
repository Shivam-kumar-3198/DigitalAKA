'use client';

import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface StatItem {
  value: string;
  label: string;
}

const DEFAULT_STATS: StatItem[] = [
  { value: '150+', label: 'Projects Completed' },
  { value: '80+', label: 'Happy Clients' },
  { value: '7+', label: 'Years Experience' },
  { value: '99%', label: 'Inbox Deliverability' },
];

function CountUp({ target }: { target: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          // Parse numeric part
          const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
          const suffix = target.replace(/[0-9.]/g, '');
          if (isNaN(numeric)) {
            setDisplay(target);
            return;
          }
          const duration = 1800;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(ease * numeric);
            setDisplay(`${current}${suffix}`);
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsBar() {
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'site'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data?.stats) && data.stats.length > 0) {
          setStats(data.stats as StatItem[]);
        }
      }
    });
    return unsub;
  }, []);

  return (
    <section className="w-full bg-[#0f172a] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${
                idx < stats.length - 1
                  ? 'lg:border-r lg:border-white/[0.08]'
                  : ''
              }`}
            >
              <dd className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                <CountUp target={stat.value} />
              </dd>
              <dt className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
