"use client";
import * as React from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AIChatForm = dynamic(() => import('@/components/AIChatForm'), {
  ssr: false,
  loading: () => (
    <Box sx={{ minHeight: 200, width: '100%', maxWidth: 420 }} aria-hidden />
  ),
});

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
                flexDirection: 'row'
              }
            }}
          >
            <Typography
              component="span"
              variant="h2"
              sx={{
                fontSize: 'inherit',
                textAlign: { xs: 'center', lg: 'left' }
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
                animation: 'heroNameGradient 10s ease-in-out infinite',
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none',
                  backgroundPosition: '40% 50%',
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
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="#contact"
            >
              Contact Me
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="#projects"
            >
              View My Work
            </Button>
          </Stack>
          <AIChatForm />
        </Stack>
      </Container>
    </Box>
  );
}
