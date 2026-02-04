"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import { useBackgroundEffect } from '../contexts/BackgroundEffectContext';
import { useTheme, useMediaQuery } from '@mui/material/styles';

// Helper function to convert HSL to RGB
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export default function InteractiveBackground() {
  const { enabled } = useBackgroundEffect();
  const theme = useTheme();
  const containerRef = React.useRef(null);
  const vantaEffect = React.useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isDark = theme.palette.mode === 'dark';

  React.useEffect(() => {
    if (!enabled || !containerRef.current) return;

    let mounted = true;

    // Load THREE.js and Vanta.js
    Promise.all([
      import('three'),
      import('vanta/dist/vanta.net.min.js'),
    ]).then(([THREE_MODULE, VANTA_MODULE]) => {
      if (!mounted || !containerRef.current) return;

      // Clean up existing effect
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }

      // Get THREE from the module
      const THREE_JS = THREE_MODULE.default || THREE_MODULE;
      
      // Get VANTA - try different possible export formats
      let VANTA = VANTA_MODULE.default || VANTA_MODULE;
      if (typeof VANTA === 'object' && VANTA.NET) {
        VANTA = VANTA;
      } else if (typeof window !== 'undefined' && window.VANTA) {
        VANTA = window.VANTA;
      }

      // Get colors based on theme
      // Dark mode: dark-blue/black background, #777 gray line color
      // Light mode: nearly-white background, dark-blue/black line color
      const backgroundColor = isDark
        ? hslToRgb(220, 35, 3) // gray[900] - dark-blue/black
        : hslToRgb(0, 0, 99); // background.default - nearly white
      
      // Line color: #777 for dark mode, dark-blue/black for light mode
      const lineColor = isDark
        ? [119, 119, 119] // #777 gray
        : hslToRgb(220, 35, 3); // gray[900] - dark-blue/black

      // Adjust parameters for mobile: fewer points, more spacing
      const points = isMobile ? 4.00 : 6.00;
      const maxDistance = isMobile ? 35.00 : 27.00;
      const spacing = isMobile ? 35.00 : 20.00;

      // Initialize Vanta Net effect
      if (VANTA && VANTA.NET && THREE_JS) {
        try {
          vantaEffect.current = VANTA.NET({
            el: containerRef.current,
            THREE: THREE_JS,
            mouseControls: true,
            touchControls: true,
            gyroControls: isMobile,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: lineColor[0] * 0x10000 + lineColor[1] * 0x100 + lineColor[2],
            backgroundColor: backgroundColor[0] * 0x10000 + backgroundColor[1] * 0x100 + backgroundColor[2],
            points: points,
            maxDistance: maxDistance,
            spacing: spacing,
            showLines: true,
            showDots: false,
          });
        } catch (error) {
          console.error('Error initializing Vanta.js:', error);
        }
      }
    }).catch((error) => {
      console.error('Error loading Vanta.js or THREE.js:', error);
    });

    return () => {
      mounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [enabled, isDark, isMobile]);

  if (!enabled) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
