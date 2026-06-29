'use client';

import React from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Allow login page without authentication
  const isLoginPage = pathname === '/admin/login';

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isLoginPage) {
    return children;
  }

  if (!isAuthenticated) {
    return null; // Redirect will happen in useEffect
  }

  return <AdminLayout>{children}</AdminLayout>;
}
