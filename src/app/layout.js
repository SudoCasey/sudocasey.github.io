import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Script from 'next/script';
import { Inter } from 'next/font/google';

// Performance: Optimize font loading
const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap', // Show fallback font immediately, swap when loaded
  variable: '--font-inter',
  fallback: ['system-ui', 'arial'], // Fallback fonts
  adjustFontFallback: true, // Automatically adjust fallback font metrics
});

export const metadata = {
  title: 'Casey Friedrich',
  description: 'Personal portfolio and blog of Casey Friedrich',
  metadataBase: new URL('https://cfriedrich.net'),
  // Performance: Add robots metadata
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
    description: 'Personal portfolio and blog of Casey Friedrich',
    images: '/images/Casey/CaseyFriedrich_Headshot2-1000.webp',
    type: 'website',
    siteName: 'Casey Friedrich',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casey Friedrich',
    description: 'Personal portfolio and blog of Casey Friedrich',
    images: '/images/Casey/CaseyFriedrich_Headshot2-1000.webp',
  },
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
        
        {/* Performance: Viewport and rendering optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1976d2" />
        
        {/* Performance: Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body style={{ fontFamily: 'var(--font-inter)' }}>
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
