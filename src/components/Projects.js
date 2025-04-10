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
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const projects = [
  {
    title: 'ADashboard',
    description: 'A website crawler that crawls individual pages of a website or recursively crawls all pages of a site, checking for WCAG 2.2 accessibility errors, and provides users with a list of accessibility errors & screenshots of each error where applicable.',
    images: ['/images/ADAsh/ADAsh1.png', '/images/ADAsh/ADAsh2.png', '/images/ADAsh/ADAsh3.png', '/images/ADAsh/ADAsh4.png'],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS EC2', 'AWS S3'],
    github: 'https://github.com/SudoCasey/ADAshboard_example',
    demo: 'https://myadash.com/',
    date: 'January 2021 - October 2024'
  },
  {
    title: 'WCAG Color Contrast Tool',
    description: 'A WCAG 2.2-compliant color contrast calculator & color grabbing tool used as a Google Chrome browser plugin. This allows users to immediately check color contrast values on any web page without needing to switch to other pages or tabs.',
    images: ['/images/CCPlugin/CC_Gif.gif', '/images/CCPlugin/CC_Plugin2.png'],
    technologies: ['React', 'Chrome Extension API'],
    github: 'https://github.com/SudoCasey/Contrast_Checker_Chrome_Plugin',
    demo: 'https://chromewebstore.google.com/detail/wcag-color-contrast-tool/dlgdkjfbookpeopkfeookihfpobkophe',
    date: 'November 2024 - December 2024'
  }
];

export default function Projects() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState({});

  const handleNext = (index) => {
    setActiveStep((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
  };

  const handleBack = (index) => {
    setActiveStep((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) - 1
    }));
  };

  const handleStepChange = (index, step) => {
    setActiveStep((prev) => ({
      ...prev,
      [index]: step
    }));
  };

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
                <Box sx={{ position: 'relative' }}>
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep[index] || 0}
                    onChangeIndex={(step) => handleStepChange(index, step)}
                    enableMouseEvents
                  >
                    {project.images.map((image, imageIndex) => (
                      <div key={imageIndex}>
                        <Box
                          component="img"
                          sx={{
                            height: 200,
                            display: 'block',
                            overflow: 'hidden',
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top',
                          }}
                          src={image}
                          alt={`${project.title} - Image ${imageIndex + 1}`}
                        />
                      </div>
                    ))}
                  </SwipeableViews>
                  {project.images.length > 1 && (
                    <MobileStepper
                      steps={project.images.length}
                      position="static"
                      activeStep={activeStep[index] || 0}
                      sx={{
                        background: 'rgba(255, 255, 255, 0)',
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        '& .MuiMobileStepper-dot': {
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        },
                        '& .MuiMobileStepper-dotActive': {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        },
                      }}
                      nextButton={
                        <Button
                          size="small"
                          onClick={() => handleNext(index)}
                          disabled={(activeStep[index] || 0) === project.images.length - 1}
                          sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            color: 'rgb(66, 67, 71) !important',
                            '&:hover': {
                              backgroundColor: 'hsl(220, 20%, 25%)',
                              color: 'hsl(220, 35%, 97%) !important',
                            },
                            '&:focus': {
                              backgroundColor: 'hsl(220, 20%, 25%)',
                              color: 'hsl(220, 35%, 97%) !important',
                            },
                            '&.Mui-disabled': {
                              backgroundColor: 'rgba(0, 0, 0, 0.3)',
                              color: 'rgba(255, 255, 255, 0.5) !important',
                            }
                          }}
                        >
                          Next
                          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                      }
                      backButton={
                        <Button
                          size="small"
                          onClick={() => handleBack(index)}
                          disabled={(activeStep[index] || 0) === 0}
                          sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            color: 'rgb(66, 67, 71) !important',
                            '&:hover': {
                              backgroundColor: 'hsl(220, 20%, 25%)',
                              color: 'hsl(220, 35%, 97%) !important',
                            },
                            '&:focus': {
                              backgroundColor: 'hsl(220, 20%, 25%)',
                              color: 'hsl(220, 35%, 97%) !important',
                            },
                            '&.Mui-disabled': {
                              backgroundColor: 'rgba(0, 0, 0, 0.3)',
                              color: 'rgba(255, 255, 255, 0.5) !important',
                            }
                          }}
                        >
                          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                          Back
                        </Button>
                      }
                    />
                  )}
                </Box>
                <CardContent>
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