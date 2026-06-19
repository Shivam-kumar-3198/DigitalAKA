'use client';

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
  SiFacebook,
  SiX,
  SiLinkedin,
} from 'react-icons/si';
import { ShieldCheck, Globe, Mail, Phone, ArrowRight, MapPin } from 'lucide-react';

// Fault‑tolerant icon wrapper
function SafeIcon({
  icon: IconComponent,
  fallback,
  className,
}: {
  icon: React.ComponentType<any> | undefined;
  fallback: string;
  className?: string;
}) {
  if (typeof IconComponent === 'function') {
    return <IconComponent className={className} />;
  }
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white/60 ${className ?? ''}`}
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

  const locations = [
    'Mumbai',
    'Chennai',
    'Delhi',
    'Kolkata',
    'Bangalore',
    'Ghaziabad',
  ];

  const regions = ['Spain', 'Germany', 'France', 'USA', 'UK'];

  const legal = [
    'Anti Spam Policy',
    'Terms & Conditions',
    'Refund Policy',
    'Privacy Policy',
  ];

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
    { name: 'Facebook', href: '#', icon: SiFacebook, fallback: 'FB' },
    { name: 'X', href: '#', icon: SiX, fallback: 'X' },
    { name: 'LinkedIn', href: '#', icon: SiLinkedin, fallback: 'IN' },
  ];

  return (
    <footer className="relative bg-[#030b1a] text-white overflow-hidden border-t border-white/5">
      {/* Immersive background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-10 lg:pt-24">
        
        {/* Top CTA Banner - Adds a premium SaaS feel */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl shadow-blue-900/20">
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
            className="group flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] whitespace-nowrap"
          >
            Get Started Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Column 1: Brand & Identity (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6 lg:pr-8">
            <Link href="/" className="inline-block group">
              <img
                src="https://digitalaka.com/wp-content/uploads/2024/06/digitalaka-logo.webp"
                alt="DigitalAka"
                className="h-9 w-auto brightness-0 invert opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Premium email delivery and outreach infrastructure built for extreme scale. 
              We ensure your messages land in the inbox, every single time.
            </p>
            
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300 pt-2">
              <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-400" /> Secure
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
                <Globe className="h-4 w-4 text-blue-400" /> Global Network
              </span>
            </div>

            {/* Socials naturally fit under the brand */}
            <div className="flex items-center gap-3 pt-4">
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

          {/* Column 2: Services (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {services.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="group flex items-center transition-colors hover:text-blue-400"
                  >
                    <span className="h-px w-0 bg-blue-400 transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Presence (Spans 2 columns) */}
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
                  {locations.slice(0, 4).map((item) => ( // Trimmed visually, full list functional via 'view all' or flex
                    <li key={item}>
                      <Link href="#" className="transition-colors hover:text-white">{item}</Link>
                    </li>
                  ))}
                  <li className="pt-1 text-xs text-blue-400 hover:text-blue-300 cursor-pointer">+ More Cities</li>
                </ul>
              </div>

              <div>
                <h5 className="mb-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Globe className="h-3 w-3" /> Global
                </h5>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  {regions.map((region) => (
                    <span key={region} className="rounded-md bg-white/5 px-2 py-1 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Legal (Spans 3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h4 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white">
                Contact Support
              </h4>
              <div className="space-y-4 text-sm text-slate-300">
                <a href="tel:+910000000000" className="group flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium">+91 00000 00000</span>
                </a>
                <a href="mailto:support@digitalaka.com" className="group flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
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
                    <Link href="#" className="transition-colors hover:text-white hover:underline decoration-white/30 underline-offset-4">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Global Payments Ribbon (Moves clutter away from vertical columns) */}
        <div className="mt-16 rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <span className="text-sm font-medium text-slate-400 whitespace-nowrap">
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

        {/* Final Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 text-xs text-slate-500 md:flex-row">
          <p>© {currentYear} DigitalAka. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed for <span className="text-slate-300 font-medium">Performance</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse ml-1"></span>
          </p>
        </div>

      </div>
    </footer>
  );
}