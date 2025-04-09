"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import Stack from '@mui/material/Stack';

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar
                src="/profile.jpg"
                alt="Casey Friedrich"
                sx={{
                  width: 200,
                  height: 200,
                  border: '4px solid',
                  borderColor: 'primary.main',
                }}
              />
              <Typography variant="h5" component="h2" gutterBottom>
                Casey Friedrich
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Full Stack Web Developer & WCAG Accessibility Expert
              </Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Inverness, Florida, United States
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    CaseyRFriedrich@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    github.com/SudoCasey
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" paragraph>
              Dynamic Full Stack Web Developer specializing in WCAG accessibility with 6 years of experience in enhancing web solutions & leading clients to remediate accessibility violations and improve website sales.
            </Typography>
            <Typography variant="body1" paragraph>
              Spearheaded the remediation of 200+ client websites using advanced techniques in HTML, CSS, and JavaScript frameworks such as React, leading to 50% improved accessibility on average.
            </Typography>
            <Typography variant="body1" paragraph>
              Implemented bespoke web applications using WordPress, Shopify, BigCommerce for scalable client solutions on over 200 projects, while collaborating with clients to strategize and enhance website overhauls, resulting in improved SEO and increased sales conversion rates using data-driven techniques.
            </Typography>
            <Typography variant="body1">
              Directed integration of CRM tools within internal teams utilizing agile methodologies, assuaging customer concerns and boosting satisfaction by 30%. Architected scalable RESTful APIs optimizing dynamic data handling using Node.js and Express to improve response times by 40%.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 