import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import { CONTACT, SITE } from "@/lib/constants";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with DigitalAka. We respond within 24 hours.",
};

const INFO = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: CONTACT.address,
    href: null,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat directly with our team",
    href: SITE.social.whatsapp,
  },
];

export default function ContactPage() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#fafcff] py-24 sm:py-32">
      {/* Ambient dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Page heading */}
        <div className="mb-14 text-center lg:mb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#1d5cf5]">
            Contact Us
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {CONTACT.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
            {CONTACT.subheading}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">

          {/* ── Left: Contact details ── */}
          <div className="flex flex-col gap-4">
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1d5cf5]/8 text-[#1d5cf5]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mt-0.5 block text-sm font-semibold text-slate-800 transition-colors hover:text-[#1d5cf5]"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Response time badge */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1d5cf5] to-blue-700 p-6 text-white">
              <div className="mb-2 flex items-center gap-2">
                <Clock size={16} strokeWidth={2} className="text-blue-200" />
                <p className="text-sm font-bold">Quick Response Guaranteed</p>
              </div>
              <p className="text-xs leading-relaxed text-blue-200">
                Our team typically responds within 2 business hours. For urgent
                requirements, reach us via WhatsApp or call us directly.
              </p>
            </div>
          </div>

          {/* ── Right: Form card ── */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_32px_rgba(0,0,0,0.08)] ring-1 ring-slate-100 sm:p-8 lg:p-10">
            <h2 className="text-xl font-bold text-slate-900">
              Send us a message
            </h2>
            <p className="mb-8 mt-1 text-sm text-slate-500">
              Fill in the details below and we will get back to you as soon as
              possible.
            </p>
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
