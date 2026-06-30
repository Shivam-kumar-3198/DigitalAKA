"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import NavigationProgress from "@/components/ui/NavigationProgress";

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
    </>
  );
}
