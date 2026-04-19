"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const CHAT_PLACEHOLDER_SX = { minHeight: 200, width: '100%', maxWidth: 420 };

/** Loads chat after idle so main-thread work for LCP (hero heading) finishes first. */
function HeroAIChat() {
  const [Form, setForm] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    const load = () => {
      import('@/components/AIChatForm').then((mod) => {
        if (!cancelled) setForm(() => mod.default);
      });
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 3200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const t = window.setTimeout(load, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!Form) {
    return <Box sx={CHAT_PLACEHOLDER_SX} aria-hidden />;
  }

  return <Form />;
}

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 22, sm: 25 },
          pb: { xs: 4, sm: 12 },
        }}
      >
        <Stack
          spacing={3}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            component="h1"
            variant="h2"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: 'center',
              justifyContent: { xs: 'center', lg: 'flex-start' },
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              '@media (min-width: 1200px)': {
                flexDirection: 'row',
              },
            }}
          >
            <Typography
              component="span"
              variant="h2"
              sx={{
                fontSize: 'inherit',
                textAlign: { xs: 'center', lg: 'left' },
              }}
            >
              Hi, I'm&nbsp;
            </Typography>
            <Typography
              component="span"
              variant="h2"
              sx={(theme) => ({
                fontSize: 'inherit',
                textAlign: { xs: 'center', lg: 'left' },
                display: 'inline-block',
                fontWeight: theme.typography.h2.fontWeight,
                /* Limit repaint scope; gradient+clip-text is not fully compositor-only. */
                contain: 'paint',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                backgroundImage:
                  'linear-gradient(105deg, hsl(210, 98%, 38%) 0%, hsl(265, 85%, 48%) 22%, hsl(190, 90%, 36%) 45%, hsl(330, 82%, 52%) 68%, hsl(210, 98%, 42%) 100%)',
                backgroundSize: '280% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                '@keyframes heroNameGradient': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
                animation: 'heroNameGradient 12s linear infinite',
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none',
                  backgroundPosition: '40% 50%',
                },
                /* No shifting gradient on small screens — fewer paints during mobile Lighthouse. */
                '@media (max-width: 899.98px) and (prefers-reduced-motion: no-preference)': {
                  animation: 'none',
                  backgroundPosition: '42% 50%',
                },
                ...theme.applyStyles('dark', {
                  backgroundImage:
                    'linear-gradient(105deg, hsl(210, 100%, 72%) 0%, hsl(275, 95%, 75%) 22%, hsl(175, 85%, 58%) 45%, hsl(320, 90%, 72%) 68%, hsl(210, 100%, 78%) 100%)',
                }),
              })}
            >
              Casey Friedrich
            </Typography>
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '100%' },
            }}
          >
            Full Stack Web Developer & WCAG Accessibility Expert
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            A nerd in all aspects of life. I love to code, learn, and build things. I can't resist a good challenge, and I'm always looking for new ways to improve my skills.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button variant="contained" color="primary" size="large" href="#contact">
              Contact Me
            </Button>
            <Button variant="outlined" color="primary" size="large" href="#projects">
              View My Work
            </Button>
          </Stack>
          <HeroAIChat />
        </Stack>
      </Container>
    </Box>
  );
}
