import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Script from 'next/script';

export const metadata = {
  title: 'Casey Friedrich',
  description: 'Personal portfolio and blog of Casey Friedrich',
  icons: {
    icon: [
      { url: '/images/Casey/CaseyFriedrich.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/Casey/CaseyFriedrich.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/Casey/CaseyFriedrich.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  openGraph: {
    title: 'Casey Friedrich',
    description: 'Personal portfolio and blog of Casey Friedrich',
    images: '/images/Casey/CaseyFriedrich.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casey Friedrich',
    description: 'Personal portfolio and blog of Casey Friedrich',
    images: '/images/Casey/CaseyFriedrich.jpg',
  },
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        <meta httpEquiv="Expires" content="31536000" />
        <link rel="icon" type="image/jpeg" href="/images/Casey/CaseyFriedrich.jpg" sizes="32x32" />
        <link rel="icon" type="image/jpeg" href="/images/Casey/CaseyFriedrich.jpg" sizes="16x16" />
        <link rel="apple-touch-icon" type="image/jpeg" href="/images/Casey/CaseyFriedrich.jpg" sizes="180x180" />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Script src="/register-sw.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
