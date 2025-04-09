import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import LogoCollection from '../../components/LogoCollection';
import Highlights from '../../components/Highlights';
import Pricing from '../../components/Pricing';
import Features from '../../components/Features';
import Testimonials from '../../components/Testimonials';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';
import AppTheme from '../shared-theme/AppTheme';

export const dynamic = 'force-static';

export default function MarketingPage() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Navbar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
