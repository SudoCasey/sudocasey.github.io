import * as React from 'react';
import { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AppTheme from '../app/shared-theme/AppTheme';
import Loading from '../components/Loading';
import PageWrapper from '../components/PageWrapper';

// Import sections directly
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Divider from '@mui/material/Divider';

export default function Home() {
  return (
    <AppTheme>
      <PageWrapper>
        <CssBaseline enableColorScheme />
        <Navbar />
        <Hero />
        <Suspense fallback={<Loading />}>
          <div>
            <About />
            <Divider />
            <Skills />
            <Divider />
            <Projects />
            <Divider />
            <Contact />
            <Divider />
            <Footer />
          </div>
        </Suspense>
      </PageWrapper>
    </AppTheme>
  );
}
