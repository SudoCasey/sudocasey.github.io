"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BackgroundEffectProvider, useBackgroundEffect } from '../contexts/BackgroundEffectContext';
import InteractiveBackground from './InteractiveBackground';

function Overlay() {
  const { enabled } = useBackgroundEffect();
  const theme = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const matchesMdUp = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: false,
    noSsr: true,
  });

  // Only apply viewport-based UI after mount so SSR + hydration match (no extra sibling vs server).
  const showWebglChrome = mounted && matchesMdUp;

  if (!enabled || !showWebglChrome) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: theme.palette.background.default,
        opacity: 0.85,
      }}
    />
  );
}

function PageContent({ children }) {
  return (
    <>
      <InteractiveBackground />
      <Overlay />
      <Box sx={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
        {children}
      </Box>
    </>
  );
}

export default function PageWrapper({ children }) {
  return (
    <BackgroundEffectProvider>
      <PageContent>{children}</PageContent>
    </BackgroundEffectProvider>
  );
}
