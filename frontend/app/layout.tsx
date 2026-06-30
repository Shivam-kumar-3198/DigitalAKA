import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/lib/constants';
import { inter } from '@/lib/fonts';
import { AuthProvider } from '@/contexts/AuthContext';
import ConditionalPublicLayout from '@/components/Layout/ConditionalPublicLayout';
import PageLoader from '@/components/PageLoader';

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}${SITE.logo}`,
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE.contactEmail,
    contactType: 'customer service',
  },
  sameAs: [SITE.social.twitter, SITE.social.linkedin, SITE.social.instagram],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} light`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <PageLoader />
        <AuthProvider>
          <ConditionalPublicLayout>
            {children}
          </ConditionalPublicLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
