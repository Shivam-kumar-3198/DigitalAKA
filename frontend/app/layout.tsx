import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/lib/constants';
import { inter } from '@/lib/fonts';
import ConditionalPublicLayout from '@/components/Layout/ConditionalPublicLayout';

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
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Bulk Email Services & SMTP Provider India`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  logo: {
    '@type': 'ImageObject',
    url: SITE.logo,
    width: 200,
    height: 60,
  },
  image: SITE.logo,
  telephone: SITE.phone,
  email: SITE.contactEmail,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'India',
  },
  areaServed: ['IN', 'US', 'GB', 'DE', 'FR', 'ES'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phone,
    email: SITE.contactEmail,
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [
    SITE.social.twitter,
    SITE.social.linkedin,
    SITE.social.instagram,
    SITE.social.facebook,
  ],
};

const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Main Navigation',
  itemListElement: [
    { '@type': 'SiteNavigationElement', position: 1, name: 'Email Marketing Services India', url: `${SITE.url}/email-marketing` },
    { '@type': 'SiteNavigationElement', position: 2, name: 'Bulk Email Services',            url: `${SITE.url}/bulk-email-services` },
    { '@type': 'SiteNavigationElement', position: 3, name: 'SMTP Server India',              url: `${SITE.url}/smtp-server-services` },
    { '@type': 'SiteNavigationElement', position: 4, name: 'Bulk SMS Marketing',             url: `${SITE.url}/bulk-sms-marketing` },
    { '@type': 'SiteNavigationElement', position: 5, name: 'Pricing',                        url: `${SITE.url}/pricing` },
    { '@type': 'SiteNavigationElement', position: 6, name: 'Blog',                           url: `${SITE.url}/blog` },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description: "India's #1 bulk email services and SMTP server provider",
  inLanguage: 'en-US',
  publisher: {
    '@id': `${SITE.url}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE.url}/?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <ConditionalPublicLayout>
          {children}
        </ConditionalPublicLayout>
      </body>
    </html>
  );
}
