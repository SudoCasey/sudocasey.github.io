"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CloudIcon from '@mui/icons-material/Cloud';
import SitemarkIcon from './CaseyFriedrichIcon';
import NextLink from 'next/link';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://github.com/SudoCasey">
        Casey Friedrich
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          width: '100%',
        }}
      >
        <SitemarkIcon />
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'center', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/SudoCasey"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://bsky.app/profile/caseyfriedrich.bsky.social"
            aria-label="Bluesky"
            sx={{ alignSelf: 'center' }}
          >
            <CloudIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.linkedin.com/in/caseyfriedrich1/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
            pt: { xs: 4, sm: 8 },
          }}
        >
          <div>
            <Link color="text.secondary" variant="body2" component={NextLink} href="/privacy">
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" variant="body2" component={NextLink} href="/terms">
              Terms of Service
            </Link>
            <Copyright />
          </div>
        </Box>
      </Box>
    </Container>
  );
}
