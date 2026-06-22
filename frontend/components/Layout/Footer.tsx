'use client';

import type { ComponentType } from 'react';
import Link from 'next/link';
import {
  SiPaypal,
  SiRazorpay,
  SiPaytm,
  SiBitcoin,
  SiTether,
  SiVisa,
  SiMastercard,
  SiGooglepay,
  SiPhonepe,
  SiStripe,
} from 'react-icons/si';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { ShieldCheck, Globe, Mail, Phone, ArrowRight, MapPin } from 'lucide-react';

// Fault-tolerant icon wrapper
function SafeIcon({
  icon: IconComponent,
  fallback,
  className,
}: {
  icon: ComponentType<any> | undefined;
  fallback: string;
  className?: string;
}) {
  if (typeof IconComponent === 'function') {
    return <IconComponent className={className} />;
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white/60 ${
        className ?? ''
      }`}
    >
      {fallback}
    </span>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'Email Blast',
    'Cold Email',
    'PowerMTA SMTP',
    'Bulk Mailing',
    'Non-Suspended SMTP',
    'IP Rotation',
    'Outbound Server',
  ];

  const locations = ['Mumbai', 'Chennai', 'Delhi', 'Kolkata', 'Bangalore', 'Ghaziabad'];
  const regions = ['Spain', 'Germany', 'France', 'USA', 'UK'];

  const legal = ['Anti Spam Policy', 'Terms & Conditions', 'Refund Policy', 'Privacy Policy'];

  const payments = [
    { name: 'PayPal', icon: SiPaypal },
    { name: 'Razorpay', icon: SiRazorpay },
    { name: 'Stripe', icon: SiStripe },
    { name: 'Visa', icon: SiVisa },
    { name: 'Mastercard', icon: SiMastercard },
    { name: 'Google Pay', icon: SiGooglepay },
    { name: 'PhonePe', icon: SiPhonepe },
    { name: 'Paytm', icon: SiPaytm },
    { name: 'Bitcoin', icon: SiBitcoin },
    { name: 'USDT', icon: SiTether },
  ];

  const socials = [
    { name: 'Facebook', href: '#', icon: FaFacebookF, fallback: 'FB' },
    { name: 'X', href: '#', icon: FaXTwitter, fallback: 'X' },
    { name: 'LinkedIn', href: '#', icon: FaLinkedinIn, fallback: 'IN' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#030b1a] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-full max-w-3xl -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-10 lg:pt-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-blue-900/20 backdrop-blur-md md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to scale your outreach?
            </h3>
            <p className="mt-2 text-sm text-blue-200/70">
              Join thousands of businesses sending billions of emails reliably.
            </p>
          </div>

          <Link
            href="#"
            className="group flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          >
            Get Started Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-4 lg:pr-8">
            <Link href="/" className="inline-block group">
              <img
                src="https://digitalaka.com/wp-content/uploads/2024/06/digitalaka-logo.webp"
                alt="DigitalAka"
                className="h-9 w-auto rounded-lg bg-white px-2 py-1 opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
              />
            </Link>

            <p className="text-sm leading-relaxed text-slate-400">
              Premium email delivery and outreach infrastructure built for extreme scale.
              We ensure your messages land in the inbox, every single time.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-400" /> Secure
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
                <Globe className="h-4 w-4 text-blue-400" /> Global Network
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ name, href, icon, fallback }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={name}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-blue-400 hover:bg-blue-500/20 hover:text-white"
                >
                  <SafeIcon
                    icon={icon}
                    fallback={fallback}
                    className="h-4 w-4 transition-transform group-hover:scale-110"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {services.map((item) => (
                <li key={item}>
                  <Link href="#" className="group flex items-center transition-colors hover:text-blue-400">
                    <span className="mr-0 h-px w-0 bg-blue-400 transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white">
              Presence
            </h4>

            <div className="space-y-6">
              <div>
                <h5 className="mb-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <MapPin className="h-3 w-3" /> India
                </h5>
                <ul className="space-y-2 text-sm text-slate-400">
                  {locations.slice(0, 4).map((item) => (
                    <li key={item}>
                      <Link href="#" className="transition-colors hover:text-white">
                        {item}
                      </Link>
                    </li>
                  ))}
                  <li className="cursor-pointer pt-1 text-xs text-blue-400 hover:text-blue-300">
                    + More Cities
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="mb-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Globe className="h-3 w-3" /> Global
                </h5>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  {regions.map((region) => (
                    <span
                      key={region}
                      className="cursor-pointer rounded-md border border-white/5 bg-white/5 px-2 py-1 transition-colors hover:bg-white/10"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-3">
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white">
                Contact Support
              </h4>
              <div className="space-y-4 text-sm text-slate-300">
                <a
                  href="tel:+910000000000"
                  className="group -ml-2 flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium">+91 00000 00000</span>
                </a>

                <a
                  href="mailto:support@digitalaka.com"
                  className="group -ml-2 flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-medium">support@digitalaka.com</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Legal
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                {legal.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="underline-offset-4 transition-colors hover:text-white hover:underline decoration-white/30"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <span className="whitespace-nowrap text-sm font-medium text-slate-400">
              Trusted Payment Partners:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              {payments.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  title={name}
                  className="group flex h-10 w-16 items-center justify-center rounded-lg border border-white/10 bg-[#07132b] transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-900/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                >
                  <Icon className="h-5 w-5 text-slate-500 transition-colors group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 text-xs text-slate-500 md:flex-row">
          <p>© {currentYear} DigitalAka. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed for <span className="font-medium text-slate-300">Performance</span>
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}