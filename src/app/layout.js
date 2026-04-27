import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Script from 'next/script';
import { inter } from '@/lib/fonts';
import { APPEARANCE_MODE_STORAGE_KEY } from '@/lib/appearanceModeStorageKey';
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

const ogImage = '/images/Casey/CaseyFriedrich_Headshot2-1000.webp';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Casey Friedrich',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${ogImage}`,
  jobTitle: 'Full Stack Web Developer',
  description: SITE_DESCRIPTION,
  knowsAbout: [
    'Web development',
    'WCAG accessibility',
    'Full stack development',
    'React',
    'Next.js',
  ],
  sameAs: [
    'https://github.com/sudocasey',
    'https://www.linkedin.com/in/caseyfriedrich1/',
    'https://bsky.app/profile/caseyfriedrich.bsky.social',
  ],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Casey Friedrich',
    template: '%s | Casey Friedrich',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Casey Friedrich',
  referrer: 'origin-when-cross-origin',
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
  icons: {
    icon: [
      { url: '/images/Casey/CaseyFriedrich_Headshot_favicon-32x32.webp', sizes: '32x32', type: 'image/webp' },
      { url: '/images/Casey/CaseyFriedrich_Headshot_favicon-16x16.webp', sizes: '16x16', type: 'image/webp' },
    ],
    apple: [
      { url: '/images/Casey/CaseyFriedrich_Headshot-250.webp', sizes: '180x180', type: 'image/webp' },
    ],
  },
  openGraph: {
    title: 'Casey Friedrich',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    type: 'website',
    siteName: 'Casey Friedrich',
    images: [
      {
        url: ogImage,
        width: 1000,
        height: 1000,
        alt: 'Casey Friedrich — professional headshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casey Friedrich',
    description: SITE_DESCRIPTION,
    images: [ogImage],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  /** Safari (including iOS): document supports both schemes so the UA canvas follows system before JS runs. */
  colorScheme: 'light dark',
  /** iOS Safari 15+ uses media-specific theme-color for the toolbar when appearance follows system. */
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1976d2' },
    { media: '(prefers-color-scheme: dark)', color: '#050509' },
  ],
};

export default function RootLayout(props) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Inter is self-hosted via next/font — avoid fonts.googleapis preconnect (unused + can confuse Lighthouse). */}
        <link rel="dns-prefetch" href="https://api.web3forms.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://bsky.app" />
        <link rel="dns-prefetch" href="https://db1-api.autoa11y.com" />
        
        {/* Favicons */}
        <link rel="icon" type="image/webp" href="/images/Casey/CaseyFriedrich_Headshot_favicon-32x32.webp" sizes="32x32" />
        <link rel="icon" type="image/webp" href="/images/Casey/CaseyFriedrich_Headshot_favicon-16x16.webp" sizes="16x16" />
        <link rel="apple-touch-icon" type="image/webp" href="/images/Casey/CaseyFriedrich_Headshot-250.webp" sizes="180x180" />
        
        {/* Performance: Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body style={{ fontFamily: 'var(--font-inter)' }} suppressHydrationWarning>
        <InitColorSchemeScript
          attribute="data-mui-color-scheme"
          defaultMode="system"
          modeStorageKey={APPEARANCE_MODE_STORAGE_KEY}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {props.children}
        </AppRouterCacheProvider>
        <Script
          src="/register-sw.js"
          strategy="lazyOnload"
        />
        <script
          src="https://db1-api.autoa11y.com/v1/embed/wcag-g174-contrast/latest.js?k=6bc78975525a7e44ffd1d05c55e90436ed16789398301e53"
          async
          data-wcag-g174="1"
          data-wcag-level="AA"
          data-position="br"
          data-label="Contrast"
          data-storage-key="wcagG174"
        />
      </body>
    </html>
  );
}
