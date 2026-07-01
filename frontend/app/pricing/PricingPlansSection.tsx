"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string;
  highlighted: boolean;
  active: boolean;
  order: number;
}

export default function PricingPlansSection() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, "pricing"), orderBy("order", "asc"))).then(
      (snap) => {
        setPlans(
          snap.docs
            .map((d) => ({ id: d.id, ...d.data() } as PricingPlan))
            .filter((p) => p.active)
        );
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="h-5 w-24 animate-pulse rounded bg-slate-100" />
                <div className="mt-2 h-3 w-40 animate-pulse rounded bg-slate-100" />
                <div className="mt-4 h-10 w-28 animate-pulse rounded bg-slate-100" />
                <div className="mt-6 space-y-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-3 w-full animate-pulse rounded bg-slate-100" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (plans.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Compare Our Plans
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Pick the plan that fits your sending volume — upgrade or cancel any time.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const features = plan.features
              ? plan.features.split("\n").map((f) => f.trim()).filter(Boolean)
              : [];

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-[#1d5cf5] text-white shadow-2xl shadow-[#1d5cf5]/30 scale-[1.02]"
                    : "border border-gray-200 bg-white shadow-sm"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-white shadow">
                    Most Popular
                  </span>
                )}

                <h3
                  className={`text-lg font-bold ${
                    plan.highlighted ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>

                {plan.description && (
                  <p
                    className={`mt-1 text-sm leading-relaxed ${
                      plan.highlighted ? "text-blue-200" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                )}

                <div className="mt-5 flex items-end gap-1">
                  <span
                    className={`text-4xl font-extrabold tracking-tight ${
                      plan.highlighted ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`mb-1 text-sm ${
                        plan.highlighted ? "text-blue-200" : "text-gray-500"
                      }`}
                    >
                      / {plan.period}
                    </span>
                  )}
                </div>

                {features.length > 0 && (
                  <ul className="mt-7 flex-1 space-y-3">
                    {features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2.5 text-sm ${
                          plan.highlighted ? "text-blue-100" : "text-gray-600"
                        }`}
                      >
                        <svg
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            plan.highlighted ? "text-blue-300" : "text-emerald-500"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href="/contact"
                  className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition ${
                    plan.highlighted
                      ? "bg-white text-[#1d5cf5] hover:bg-blue-50"
                      : "bg-[#1d5cf5] text-white hover:bg-blue-700"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
