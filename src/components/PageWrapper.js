"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { BackgroundEffectProvider, useBackgroundEffect } from '../contexts/BackgroundEffectContext';
import InteractiveBackground from './InteractiveBackground';

function Overlay() {
  const { enabled } = useBackgroundEffect();
  const theme = useTheme();

  if (!enabled) return null;

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
