"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const projects = [
  {
    title: 'ADashboard',
    description: 'A website crawler that crawls individual pages of a website or recursively crawls all pages of a site, checking for WCAG 2.2 accessibility errors, and provides users with a list of accessibility errors & screenshots of each error where applicable.',
    image: '/project1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS EC2', 'AWS S3'],
    github: 'https://github.com/SudoCasey/ADashboard',
    demo: 'https://myadash.com/',
    date: 'January 2021 - October 2024'
  },
  {
    title: 'WCAG Color Contrast Tool',
    description: 'A WCAG 2.2-compliant color contrast calculator & color grabbing tool used as a Google Chrome browser plugin. This allows users to immediately check color contrast values on any web page without needing to switch to other pages or tabs.',
    image: '/project2.jpg',
    technologies: ['React', 'Chrome Extension API'],
    github: 'https://chromewebstore.google.com/detail/wcag-color-contrast-tool/dlgdkjfbookpeopkfeookihfpobkophe',
    demo: 'https://chromewebstore.google.com/detail/wcag-color-contrast-tool/dlgdkjfbookpeopkfeookihfpobkophe',
    date: 'November 2024 - December 2024'
  }
];

export default function Projects() {
  return (
    <Box
      id="projects"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Projects
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 6 }}
        >
          A selection of my recent work and contributions
        </Typography>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {project.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    {project.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText',
                        }}
                      />
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      size="small"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 