import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'About',
  description: `About Casey Friedrich — background, story, and how to connect. ${SITE_DESCRIPTION}`,
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About | Casey Friedrich',
    description: `Learn more about Casey Friedrich. ${SITE_DESCRIPTION}`,
    url: `${SITE_URL}/about/`,
  },
  twitter: {
    title: 'About | Casey Friedrich',
    description: `Learn more about Casey Friedrich. ${SITE_DESCRIPTION}`,
  },
};

export default function AboutLayout({ children }) {
  return children;
}
