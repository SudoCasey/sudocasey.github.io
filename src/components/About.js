"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { alpha } from '@mui/material/styles';
import AccordionContactForm from './AccordionContactForm';

export default function About() {
  const [isVisible, setIsVisible] = React.useState(false);
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '150px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <Box
      id="about"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 6, sm: 12 },
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
                backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.75),
                padding: 3,
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[2],
                height: { md: '100%' },
              }}
              ref={imageRef}
            >
              {isVisible && (
                <Avatar
                  src="/images/Casey/CaseyFriedrich_Headshot2.webp"
                  srcSet={`
                    /images/Casey/CaseyFriedrich_Headshot2-250.webp 250w,
                    /images/Casey/CaseyFriedrich_Headshot2-500.webp 500w,
                    /images/Casey/CaseyFriedrich_Headshot2-1000.webp 1000w
                  `}
                  sizes="(max-width: 600px) 180px, (max-width: 900px) 200px, 400px"
                  alt="Casey Friedrich"
                  sx={{
                    width: { xs: 180, sm: 200, md: 200 },
                    height: { xs: 180, sm: 200, md: 200 },
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                  loading="lazy"
                />
              )}
              <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                Casey Friedrich
              </Typography>
              <Typography variant="subtitle2" component="h3" color="text.secondary">
                <Stack
                  component="span"
                  display="block"
                  alignItems={{ xs: 'center', sm: 'flex-start' }}
                  sx={{ width: '100%', gap: 0.25 }}
                >
                  <Box component="span" sx={{ display: 'block', textAlign: { xs: 'center', sm: 'left' } }}>Full Stack Web Developer</Box>
                  <Box component="span" sx={{ display: 'block', textAlign: { xs: 'center', sm: 'left' } }}>WCAG Accessibility Expert</Box>
                  <Box component="span" sx={{ display: 'block', textAlign: { xs: 'center', sm: 'left' } }}>Problem Solver</Box>
                </Stack>
              </Typography>
              <AccordionContactForm />
              <Stack spacing={2} sx={{ alignItems: { xs: 'center', md: 'stretch' }, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Florida, United States
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <GitHubIcon color="action" />
                  <Link
                    href="https://github.com/sudocasey"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
                  >
                    github.com/sudocasey
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <LinkedInIcon color="action" />
                  <Link
                    href="https://www.linkedin.com/in/caseyfriedrich1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
                  >
                    linkedin.com/in/caseyfriedrich1
                  </Link>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.75),
                padding: 3,
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[2],
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1" paragraph>
                Dynamic Full-stack Web Developer and Systems Engineer with 7+ years of
                experience building and maintaining web applications in Agile environments,
                with a focus on accessibility, performance, and scalable development.
                Currently serving as Systems Engineer for NASA NCAPS at N4 Solutions LLC,
                where I support NASA's web platforms through the NASA Consolidated
                Applications and Platform Services (NCAPS) team. I maintain and update
                websites, applications, and plugins while using React, HTML/CSS, JavaScript,
                and PHP to develop tools that support NASA missions.
              </Typography>

              <Typography variant="body1" paragraph>
                Previously, I served as Web Developer Manager at{" "}
                <Link
                  href="https://seoforrealestateinvestors.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SEO For Real Estate Developers
                </Link>
                , where I led a development team building and maintaining SEO-optimized
                websites for real estate investment businesses. I mentored developers,
                established coding standards and workflows, and implemented KPI tracking
                to improve team efficiency. I also developed <em>AudioNibbles</em>, an
                AI-powered text-to-speech WordPress plugin, and created accessible
                WordPress templates to accelerate development and client delivery.
              </Typography>

              <Typography variant="body1" paragraph>
                Before that, I spent 6 years at{" "}
                <Link
                  href="https://adasitecompliance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ADA Site Compliance
                </Link>
                , progressing from Junior Front-end Developer to Web Development Team Lead,
                Full-stack Web Developer, and WCAG Accessibility SME. I led Agile
                development teams, architected RESTful APIs that improved web application
                performance and database fetch speeds by 80%, and implemented DevOps
                pipelines using CircleCI, Docker, and AWS. I also directed development of
                the{" "}
                <Link
                  href="https://cfriedrich.net/#ADAshboard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ADAshboard
                </Link>
                , a proprietary accessibility scanning platform built with React,
                Node.js, and MongoDB.
              </Typography>

              <Typography variant="body1">
                As a WCAG 2.2 and Section 508 Subject Matter Expert, I spearheaded
                accessibility remediation for more than 200 client websites, increasing
                WCAG 2.2 compliance by an average of 50% while improving usability for
                users with disabilities. I have also developed and launched 15+ bespoke
                web applications using React, PHP, WordPress, and Shopify, contributing
                to improved SEO and sales conversions. My technical experience spans
                JavaScript, React, Next.js, Node.js, PHP, Python, SQL, MongoDB, AWS,
                Docker, WordPress, Shopify, and BigCommerce.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 