"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SERVICES } from "@/lib/constants";
import Icon, { IconName } from "@/components/ui/Icon";

interface FirestoreService {
  title: string;
  description: string;
  iconName: string;
  active: boolean;
  order: number;
}

// Shape that matches constants.ts format
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export default function ServicesGrid() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Fetch all services — filter and sort client-side to avoid
        // Firestore composite index requirement (where + orderBy on different fields)
        const snap = await getDocs(collection(db, "services"));

        if (!snap.empty) {
          const all = snap.docs
            .map((d) => ({ id: d.id, ...(d.data() as FirestoreService) }))
            .filter((s) => s.active !== false)        // show active ones (default true)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

          setServices(
            all.map((s) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              iconName: s.iconName ?? "Zap",
            }))
          );
        } else {
          // Nothing in Firestore yet — fall back to constants.ts
          setServices(SERVICES);
        }
      } catch {
        // Firestore unreachable or rules block — fall back gracefully
        setServices(SERVICES);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <div
          key={service.id}
          className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <Icon
              name={service.iconName as IconName}
              className="h-6 w-6"
            />
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-bold text-slate-900">
              {service.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
