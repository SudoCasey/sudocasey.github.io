import { SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Contact',
  description:
    'Contact Casey Friedrich for project inquiries, collaborations, or opportunities — form, LinkedIn, GitHub, and Bluesky.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact | Casey Friedrich',
    description:
      'Get in touch with Casey Friedrich: message form and social links.',
    url: `${SITE_URL}/contact/`,
  },
  twitter: {
    title: 'Contact | Casey Friedrich',
    description:
      'Get in touch with Casey Friedrich: message form and social links.',
  },
};

export default function ContactLayout({ children }) {
  return children;
}
