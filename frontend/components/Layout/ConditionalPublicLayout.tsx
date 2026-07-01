"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Header from "./Header";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import BackToTop from "@/components/ui/BackToTop";
import NavigationProgress from "@/components/ui/NavigationProgress";

// Footer contains react-icons/si (3000+ icon pack). Lazy-loading it keeps
// react-icons out of layout.js and into its own deferred chunk.
const Footer = dynamic(() => import("./Footer"));

export default function ConditionalPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <NavigationProgress />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
