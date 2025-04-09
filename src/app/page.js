import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AppTheme from '../app/shared-theme/AppTheme';

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
