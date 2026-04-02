import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for cfriedrich.net — how visitor information is collected and used.',
  alternates: {
    canonical: '/privacy/',
  },
  openGraph: {
    title: 'Privacy Policy | Casey Friedrich',
    description: 'Privacy practices for Casey Friedrich’s portfolio site.',
    url: `${SITE_URL}/privacy/`,
  },
  twitter: {
    title: 'Privacy Policy | Casey Friedrich',
    description: 'Privacy practices for Casey Friedrich’s portfolio site.',
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}
