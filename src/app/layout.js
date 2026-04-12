import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Script from 'next/script';
import { inter } from '@/lib/fonts';
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
  themeColor: '#1976d2',
};

export default function RootLayout(props) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Performance: Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.web3forms.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://bsky.app" />
        
        {/* Performance: Preload critical resources */}
        <link
          rel="preload"
          href="/images/Casey/CaseyFriedrich_Headshot2-250.webp"
          as="image"
          type="image/webp"
        />
        
        {/* Favicons */}
        <link rel="icon" type="image/webp" href="/images/Casey/CaseyFriedrich_Headshot_favicon-32x32.webp" sizes="32x32" />
        <link rel="icon" type="image/webp" href="/images/Casey/CaseyFriedrich_Headshot_favicon-16x16.webp" sizes="16x16" />
        <link rel="apple-touch-icon" type="image/webp" href="/images/Casey/CaseyFriedrich_Headshot-250.webp" sizes="180x180" />
        
        {/* Performance: Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body style={{ fontFamily: 'var(--font-inter)' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Script 
          src="/register-sw.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
