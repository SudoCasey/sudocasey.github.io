import * as React from 'react';
import { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AppTheme from '../app/shared-theme/AppTheme';
import Loading from '../components/Loading';
import PageWrapper from '../components/PageWrapper';
import Divider from '@mui/material/Divider';
import NavbarSpacer from '../components/NavbarSpacer';
// Import sections directly
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

export const metadata = {
  title: {
    absolute: 'Casey Friedrich',
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Casey Friedrich',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <AppTheme>
      <PageWrapper>
        <CssBaseline enableColorScheme />
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<Loading />}>
            <div>
              <About />
              <Divider />
              <Skills />
              <Divider />
              <Projects />
              <Divider />
              <div style={{ height: '100px' }} />
              <Contact />
              <Footer />
            </div>
          </Suspense>
        </main>

      </PageWrapper>
    </AppTheme>
  );
}
