import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for using cfriedrich.net and related portfolio content.',
  alternates: {
    canonical: '/terms/',
  },
  openGraph: {
    title: 'Terms of Service | Casey Friedrich',
    description: 'Terms governing use of Casey Friedrich’s portfolio site.',
    url: `${SITE_URL}/terms/`,
  },
  twitter: {
    title: 'Terms of Service | Casey Friedrich',
    description: 'Terms governing use of Casey Friedrich’s portfolio site.',
  },
};

export default function TermsLayout({ children }) {
  return children;
}
