"use client";
import * as React from 'react';
import { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../../components/Navbar';
import AppTheme from '../shared-theme/AppTheme';
import Loading from '../../components/Loading';
import PageWrapper from '../../components/PageWrapper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';

// Dynamically import the game component with no SSR
const CookieClickerGame = dynamic(
  () => {
    try {
      // The game will be copied to src/app/cookie-clicker/game during build
      return import('./game/pages/cookieClicker/cookieClicker');
    } catch (error) {
      console.error('Failed to load Cookie Clicker game:', error);
      // Return a placeholder component if import fails
      return Promise.resolve(() => (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error" gutterBottom>
            Game failed to load
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please ensure the game repository is properly set up.
          </Typography>
        </Box>
      ));
    }
  },
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function CookieClickerPage() {
  return (
    <AppTheme>
      <PageWrapper>
        <CssBaseline enableColorScheme />
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Cookie Clicker
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" paragraph>
              Click cookies to earn them, then purchase upgrades to generate cookies automatically!
            </Typography>
          </Box>
          <Suspense fallback={<Loading />}>
            <CookieClickerGame />
          </Suspense>
        </Container>
      </PageWrapper>
    </AppTheme>
  );
}
