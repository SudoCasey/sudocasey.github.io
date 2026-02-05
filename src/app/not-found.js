"use client";
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppTheme from './shared-theme/AppTheme';
import PageWrapper from '../components/PageWrapper';
import NavbarSpacer from '../components/NavbarSpacer';
import Divider from '@mui/material/Divider';
import NextLink from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotFound() {
  return (
    <Container maxWidth="lg">
      <AppTheme>
        <PageWrapper>
          <CssBaseline enableColorScheme />
          <Navbar />
          <NavbarSpacer />
          <Divider />
          <Box
            sx={{
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              py: { xs: 8, sm: 12 },
              gap: 4,
            }}
          >
            <Box>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                  fontWeight: 700,
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #42a5f5 30%, #66bb6a 90%)'
                      : 'linear-gradient(45deg, #1976d2 30%, #388e3c 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                404
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 4,
                }}
              >
                The page you're looking for doesn't exist or has been moved.
                Use the navigation above or the buttons below to find your way back.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                size="large"
                component={NextLink}
                href="/"
                startIcon={<HomeIcon />}
                sx={{
                  minWidth: { xs: '100%', sm: '200px' },
                }}
              >
                Go Home
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => window.history.back()}
                startIcon={<ArrowBackIcon />}
                sx={{
                  minWidth: { xs: '100%', sm: '200px' },
                }}
              >
                Go Back
              </Button>
            </Box>
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Quick Links:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="text"
                  component={NextLink}
                  href="/"
                  size="small"
                >
                  Home
                </Button>
                <Button
                  variant="text"
                  component={NextLink}
                  href="/contact"
                  size="small"
                >
                  Contact
                </Button>
                <Button
                  variant="text"
                  component={NextLink}
                  href="/#about"
                  size="small"
                >
                  About
                </Button>
                <Button
                  variant="text"
                  component={NextLink}
                  href="/#skills"
                  size="small"
                >
                  Skills
                </Button>
                <Button
                  variant="text"
                  component={NextLink}
                  href="/#projects"
                  size="small"
                >
                  Projects
                </Button>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Footer />
        </PageWrapper>
      </AppTheme>
    </Container>
  );
}
