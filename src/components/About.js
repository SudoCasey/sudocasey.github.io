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
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

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
                  sizes="(max-width: 600px) 100px, (max-width: 900px) 200px, 400px"
                  alt="Casey Friedrich"
                  sx={{
                    width: { xs: 100, sm: 200, md: 200 },
                    height: { xs: 100, sm: 200, md: 200 },
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                  loading="lazy"
                />
              )}
              <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                Casey Friedrich
              </Typography>
              <Typography variant="subtitle1" component="h3" color="text.secondary" sx={{ textAlign: 'center' }}>
                Full Stack Web Developer & WCAG Accessibility Expert
              </Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Florida, United States
                  </Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    CaseyRFriedrich@gmail.com
                  </Typography>
                </Box> */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon color="action" />
                  <Link
                    href="https://github.com/sudocasey"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
                    underline="hover"
                  >
                    github.com/SudoCasey
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinkedInIcon color="action" />
                  <Link
                    href="https://www.linkedin.com/in/caseyfriedrich1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
                    underline="hover"
                  >
                    linkedin.com/in/caseyfriedrich1
                  </Link>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" paragraph>
              Dynamic Full-stack Web Developer and Team Lead with 6 years of experience in agile environments, excelling in web accessibility and cloud deployment strategies. Architected scalable RESTful APIs enhancing web app performance by 80%, and directed the ADAshboard project from conception to deployment using React, Node.js, and MongoDB.
            </Typography>
            <Typography variant="body1" paragraph>
              As a Web Development Team Lead and WCAG Accessibility SME, I mentored and led teams of front-end and full-stack developers in agile sprints, promoting coding best practices and accessibility-first development. Spearheaded accessibility remediation for over 200 client websites, improving usability for users with disabilities and increasing WCAG 2.2 compliance by an average of 50%.
            </Typography>
            <Typography variant="body1" paragraph>
              Developed and launched 25+ bespoke web applications using React, PHP, WordPress, and Shopify, directly contributing to SEO improvements and higher sales conversions. Integrated CRM tools and analytics dashboards using RESTful API to track accessibility progress and support continuous client improvement.
            </Typography>
            <Typography variant="body1">
              Currently seeking a challenging role to leverage strong technical and leadership skills in enhancing web accessibility and performance, with a focus on creating inclusive digital experiences that benefit all users.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 