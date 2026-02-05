"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import { useBackgroundEffect } from '../contexts/BackgroundEffectContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    let timeoutId = null;

    // Clean up existing effect first (before loading new modules)
    const cleanupEffect = () => {
      if (vantaEffect.current) {
        try {
          // Check if destroy method exists and container is still valid
          if (typeof vantaEffect.current.destroy === 'function') {
            // Clear the container's children manually to avoid DOM errors
            if (containerRef.current && containerRef.current.firstChild) {
              try {
                while (containerRef.current.firstChild) {
                  containerRef.current.removeChild(containerRef.current.firstChild);
                }
              } catch (e) {
                // Ignore DOM errors during cleanup
              }
            }
            vantaEffect.current.destroy();
          }
        } catch (e) {
          // Ignore cleanup errors - effect might already be destroyed
        }
        vantaEffect.current = null;
      }
      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };

    // Clean up before loading new modules
    cleanupEffect();

    // Load THREE.js FIRST, then Vanta - Vanta needs THREE to be available
    import('three').then((THREE_MODULE) => {
      if (!mounted) return;

      // Extract THREE.js immediately
      let THREE_JS = null;
      
      const isTHREENamespace = (obj) => {
        try {
          if (!obj || typeof obj !== 'object') return false;
          return typeof obj.PerspectiveCamera === 'function' &&
                 typeof obj.Scene === 'function' &&
                 typeof obj.WebGLRenderer === 'function' &&
                 typeof obj.Vector3 === 'function';
        } catch (e) {
          return false;
        }
      };
      
      // Try all possible extraction patterns
      const candidates = [
        THREE_MODULE,
        THREE_MODULE?.default,
        THREE_MODULE?.default?.default,
        THREE_MODULE?.THREE,
        THREE_MODULE?.default?.THREE,
        typeof window !== 'undefined' ? window.THREE : null,
      ];
      
      if (THREE_MODULE && typeof THREE_MODULE === 'object') {
        for (const key in THREE_MODULE) {
          if (THREE_MODULE.hasOwnProperty(key)) {
            candidates.push(THREE_MODULE[key]);
          }
        }
      }
      
      for (const candidate of candidates) {
        if (isTHREENamespace(candidate)) {
          THREE_JS = candidate;
          break;
        }
      }
      
      if (!THREE_JS && THREE_MODULE && typeof THREE_MODULE === 'object') {
        const keys = Object.keys(THREE_MODULE);
        if (keys.length > 50 && typeof THREE_MODULE.PerspectiveCamera === 'function') {
          THREE_JS = THREE_MODULE;
        }
      }
      
      if (!THREE_JS) {
        console.error('❌ THREE.js extraction failed');
        return;
      }
      
      // CRITICAL: Set THREE on window BEFORE loading Vanta
      if (typeof window !== 'undefined') {
        window.THREE = THREE_JS;
        console.log('✓ THREE set on window.THREE (before Vanta load)');
      }
      
      // NOW load Vanta after THREE is available
      const vantaModule = isDark 
        ? import('vanta/dist/vanta.net.min.js')
        : import('vanta/dist/vanta.dots.min.js');
      
      return Promise.all([Promise.resolve(THREE_JS), vantaModule]);
    }).then(([THREE_JS, VANTA_MODULE]) => {
      if (!mounted || !containerRef.current) return;

      // Small delay to ensure DOM is ready
      timeoutId = setTimeout(() => {
        if (!mounted || !containerRef.current) return;

        // THREE_JS is already extracted and set on window above
        // Just verify it's still valid
        if (!THREE_JS || typeof THREE_JS !== 'object' || typeof THREE_JS.PerspectiveCamera !== 'function') {
          // Fallback to window.THREE if THREE_JS is somehow lost
          THREE_JS = (typeof window !== 'undefined' && window.THREE) || THREE_JS;
          
          if (!THREE_JS || typeof THREE_JS.PerspectiveCamera !== 'function') {
            console.error('❌ THREE_JS is invalid after extraction');
            return;
          }
        }
        
        console.log('✓ THREE_JS ready for Vanta:', {
          hasPerspectiveCamera: !!THREE_JS.PerspectiveCamera,
          hasScene: !!THREE_JS.Scene,
          window_THREE_set: typeof window !== 'undefined' && !!window.THREE,
        });
        
        // Extract VANTA
        let VANTA = null;
        if (VANTA_MODULE) {
          if (VANTA_MODULE.default) {
            VANTA = VANTA_MODULE.default;
          } else if (VANTA_MODULE.NET || VANTA_MODULE.DOTS) {
            VANTA = VANTA_MODULE;
          } else {
            VANTA = VANTA_MODULE;
          }
        }
        
        // Fallback to window.VANTA
        if ((!VANTA || (!VANTA.NET && !VANTA.DOTS)) && typeof window !== 'undefined' && window.VANTA) {
          VANTA = window.VANTA;
        }
        
        // Validate VANTA
        if (!VANTA || (!VANTA.NET && !VANTA.DOTS)) {
          console.error('VANTA.js extraction failed');
          return;
        }

        // Initialize the appropriate effect
        try {
          if (isDark) {
            // Dark mode: Use NET effect
            const backgroundColor = hslToRgb(220, 35, 3);
            const lineColor = [119, 119, 119];
            const points = isMobile ? 4.00 : 6.00;
            const maxDistance = isMobile ? 35.00 : 27.00;
            const spacing = isMobile ? 35.00 : 20.00;

            if (VANTA.NET) {
              // CRITICAL: Final validation right before use - must be a valid THREE namespace
              if (!THREE_JS || typeof THREE_JS !== 'object' || typeof THREE_JS.PerspectiveCamera !== 'function') {
                console.error('❌ CRITICAL: THREE_JS is invalid right before NET initialization', {
                  THREE_JS_exists: !!THREE_JS,
                  THREE_JS_type: typeof THREE_JS,
                  THREE_JS_isObject: typeof THREE_JS === 'object',
                  hasPerspectiveCamera: !!THREE_JS?.PerspectiveCamera,
                  PerspectiveCamera_type: typeof THREE_JS?.PerspectiveCamera,
                });
                return;
              }
              
              // Use window.THREE (which we set above) or THREE_JS as fallback
              const THREE_FOR_VANTA = (typeof window !== 'undefined' && window.THREE) || THREE_JS;
              
              // Double-check it's still valid
              if (!THREE_FOR_VANTA || !THREE_FOR_VANTA.PerspectiveCamera) {
                console.error('❌ CRITICAL: THREE_FOR_VANTA is invalid', {
                  window_THREE_exists: typeof window !== 'undefined' && !!window.THREE,
                  THREE_JS_exists: !!THREE_JS,
                });
                return;
              }
              
              console.log('✓ Initializing Vanta NET with THREE:', {
                hasPerspectiveCamera: !!THREE_FOR_VANTA.PerspectiveCamera,
                hasScene: !!THREE_FOR_VANTA.Scene,
                isWindowTHREE: THREE_FOR_VANTA === (typeof window !== 'undefined' ? window.THREE : null),
              });
              
              vantaEffect.current = VANTA.NET({
                el: containerRef.current,
                THREE: THREE_FOR_VANTA,
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
            }
          } else {
            // Light mode: Use DOTS effect
            const primaryColor = hslToRgb(210, 98, 48);
            const backgroundColor = hslToRgb(0, 0, 99);
            const color1Hex = primaryColor[0] * 0x10000 + primaryColor[1] * 0x100 + primaryColor[2];
            const color2Hex = primaryColor[0] * 0x10000 + primaryColor[1] * 0x100 + primaryColor[2];
            const backgroundColorHex = backgroundColor[0] * 0x10000 + backgroundColor[1] * 0x100 + backgroundColor[2];

            if (VANTA.DOTS) {
              // CRITICAL: Final validation right before use - must be a valid THREE namespace
              if (!THREE_JS || typeof THREE_JS !== 'object' || typeof THREE_JS.PerspectiveCamera !== 'function') {
                console.error('❌ CRITICAL: THREE_JS is invalid right before DOTS initialization', {
                  THREE_JS_exists: !!THREE_JS,
                  THREE_JS_type: typeof THREE_JS,
                  THREE_JS_isObject: typeof THREE_JS === 'object',
                  hasPerspectiveCamera: !!THREE_JS?.PerspectiveCamera,
                  PerspectiveCamera_type: typeof THREE_JS?.PerspectiveCamera,
                });
                return;
              }
              
              // Use window.THREE (which we set above) or THREE_JS as fallback
              const THREE_FOR_VANTA = (typeof window !== 'undefined' && window.THREE) || THREE_JS;
              
              // Double-check it's still valid
              if (!THREE_FOR_VANTA || !THREE_FOR_VANTA.PerspectiveCamera) {
                console.error('❌ CRITICAL: THREE_FOR_VANTA is invalid', {
                  window_THREE_exists: typeof window !== 'undefined' && !!window.THREE,
                  THREE_JS_exists: !!THREE_JS,
                });
                return;
              }
              
              console.log('✓ Initializing Vanta DOTS with THREE:', {
                hasPerspectiveCamera: !!THREE_FOR_VANTA.PerspectiveCamera,
                hasScene: !!THREE_FOR_VANTA.Scene,
                isWindowTHREE: THREE_FOR_VANTA === (typeof window !== 'undefined' ? window.THREE : null),
              });
              
              vantaEffect.current = VANTA.DOTS({
                el: containerRef.current,
                THREE: THREE_FOR_VANTA,
                mouseControls: true,
                touchControls: true,
                gyroControls: isMobile,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: color1Hex,
                color2: color2Hex,
                backgroundColor: backgroundColorHex,
                spacing: 26.00,
              });
            }
          }
        } catch (error) {
          console.error('Error initializing Vanta.js effect:', error);
        }
      }, 150);
    }).catch((error) => {
      console.error('Error loading Vanta.js or THREE.js:', error);
    });

    return () => {
      mounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      cleanupEffect();
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
