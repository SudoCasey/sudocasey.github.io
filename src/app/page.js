import * as React from 'react';
import dynamic from 'next/dynamic';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AppTheme from '../app/shared-theme/AppTheme';

// Dynamically import components that aren't immediately visible
const About = dynamic(() => import('../components/About'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const Skills = dynamic(() => import('../components/Skills'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const Projects = dynamic(() => import('../components/Projects'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const Contact = dynamic(() => import('../components/Contact'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function Home() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Navbar />
      <Hero />
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
    </AppTheme>
  );
}
