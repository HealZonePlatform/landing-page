import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Unbounded } from 'next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import StructuredData from '@/components/StructuredData';
import { Suspense } from 'react';

const brasikaDisplay = localFont({
  src: '../../public/fonts/brasika/DFVNBrasikaDisplay/OpenType-PS/DFVN Brasika Display.otf',
  variable: '--font-headline',
  display: 'swap',
  weight: '400',
  style: 'normal',
});

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

// src/app/layout.tsx
import Script from 'next/script';
// ...

// .online

{/* <head>
  <StructuredData />
  <Script
    id="cookiebot"
    strategy="beforeInteractive"
    src="https://consent.cookiebot.com/uc.js"
    data-cbid="b392c331-ece3-4272-a8a6-d784bd82cde3"
    data-blockingmode="auto"
  />
</head> */}

// .ngrok
// The raw <head> block with <script> tags was removed because JSX/TSX files cannot contain literal HTML <head> sections
// outside of a component; the unescaped `{}` in the script caused the "Unexpected token" compile error.
// To include these scripts correctly, add them inside the RootLayout head using next/script, for example:
//
<head>
  <Script
    id="iubenda-config"
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={{
      __html: `var _iub = _iub || []; _iub.csConfiguration = {"siteId":4300417,"cookiePolicyId":88998866,"lang":"en","storage":{"useSiteId":true}};`,
    }}
  />
  <Script src="https://cs.iubenda.com/autoblocking/4300417.js" strategy="beforeInteractive" />
  <Script src="//cdn.iubenda.com/cs/gpp/stub.js" strategy="beforeInteractive" />
  <Script src="//cdn.iubenda.com/cs/iubenda_cs.js" strategy="beforeInteractive" />
</head>
//
// Add the above Script elements inside the <head> of the RootLayout component to restore functionality.

/**
 * Global metadata configuration for the Horizon Skincare landing page.
 *
 * The metadata values here are tailored for the Vietnamese audience,
 * aligning with the updated branding and using the new custom domain
 * `horizonskincare.online`. OpenGraph and Twitter tags ensure rich
 * previews when links are shared on social media. The `lang` attribute
 * of the `<html>` element is set to `vi` for better accessibility and
 * SEO in Vietnamese search results.
 */
export const metadata: Metadata = {
  title: {
    default: 'Horizon Skincare AI | Nâng Tầm Hành Trình Chăm Sóc Da',
    template: '%s | Horizon Skincare AI',
  },
  description:
    'Nâng tầm hành trình chăm sóc da với phân tích AI chính xác và lộ trình cá nhân hoá.',
  keywords: [
    'AI skincare',
    'phân tích da',
    'chăm sóc da cá nhân',
    'công nghệ làm đẹp',
    'skincare routine',
    'ứng dụng chăm sóc da',
  ],
  authors: [{ name: 'Horizon Skincare' }],
  creator: 'Horizon Skincare',
  publisher: 'Horizon Skincare',
  openGraph: {
    title: 'Horizon Skincare AI | Nâng Tầm Hành Trình Chăm Sóc Da',
    description:
      'Nâng tầm hành trình chăm sóc da với phân tích AI chính xác và lộ trình cá nhân hoá.',
    url: 'https://horizonskincare.online/',
    siteName: 'Horizon Skincare AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Horizon Skincare AI - Nâng Tầm Hành Trình Chăm Sóc Da',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horizon Skincare AI | Nâng Tầm Hành Trình Chăm Sóc Da',
    description:
      'Nâng tầm hành trình chăm sóc da với phân tích AI chính xác và lộ trình cá nhân hoá.',
    images: ['/og-image.jpg'],
    creator: '@horizonskincare',
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
  alternates: {
    canonical: 'https://horizonskincare.online/',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: '/picture/Iconlogo.png',
    shortcut: '/picture/Iconlogo.png',
    apple: '/picture/Iconlogo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${unbounded.variable} ${brasikaDisplay.variable}`}>
      <head>
        {/* Structured data improves SEO and helps search engines understand your site. */}
        <StructuredData />
      </head>
      <body className="bg-brand-background text-brand-ink">
        {/* Global site tag for Google Analytics, injected only when the
            corresponding environment variable is provided. */}
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
