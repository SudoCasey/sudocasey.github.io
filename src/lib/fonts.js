import { Inter } from 'next/font/google';

/** Single Inter instance for layout + MUI theme (avoids duplicate font downloads). */
export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});
