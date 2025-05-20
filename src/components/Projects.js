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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const projects = [
  {
    title: 'Web Dev Toolkit',
    description: 'A modern web crawler built with Next.js, Material-UI, and Puppeteer. This application allows you to crawl websites, take screenshots, discover all pages within a website, and perform WCAG accessibility testing.',
    images: [
      { 
        src: '/images/WebDevToolkit/web_crawler_demo.gif', 
        width: 500, 
        height: 250,
        fullSize: '/images/WebDevToolkit/web_crawler_demo.gif'
      },
      { 
        src: '/images/WebDevToolkit/Web_Dev_Toolkit_1.webp', 
        width: 500, 
        height: 250,
        fullSize: '/images/WebDevToolkit/Web_Dev_Toolkit_1.webp'
      },
      { 
        src: '/images/WebDevToolkit/Web_Dev_Toolkit_2.webp', 
        width: 500, 
        height: 250,
        fullSize: '/images/WebDevToolkit/Web_Dev_Toolkit_2.webp'
      }
    ],
    technologies: ['Next.js', 'Material-UI', 'Puppeteer', 'TypeScript', 'WCAG 2.2'],
    github: 'https://github.com/SudoCasey/Web_Crawler',
    date: 'March 2024'
  },
  {
    title: 'Discord Soundboard Usage Tracker',
    description: 'A Discord bot that tracks soundboard usage in servers, providing detailed statistics and graphs. Features automatic voice channel management and PostgreSQL storage for persistent data tracking.',
    images: [{ 
      src: '/images/Soundboard/soundboard_tracker.webp', 
      width: 500, 
      height: 250,
      fullSize: '/images/Soundboard/soundboard_tracker.png'
    }],
    technologies: ['Node.js', 'Discord.js', 'PostgreSQL', 'Docker', 'Express'],
    github: 'https://github.com/SudoCasey/Soundboard_Usage_Tracker',
    demo: 'https://hub.docker.com/r/snipersrecon/discord_soundboard_usage_tracker',
    date: 'December 2024'
  },
  {
    title: 'ADashboard',
    description: 'A website crawler that crawls individual pages of a website or recursively crawls all pages of a site, checking for WCAG 2.2 accessibility errors, and provides users with a list of accessibility errors & screenshots of each error where applicable.',
    images: [
      { 
        src: '/images/ADAsh/ADAsh1.webp', 
        width: 500, 
        height: 250,
        fullSize: '/images/ADAsh/ADAsh1.png'
      },
      { 
        src: '/images/ADAsh/ADAsh2.webp', 
        width: 500, 
        height: 250,
        fullSize: '/images/ADAsh/ADAsh2.png'
      },
      { 
        src: '/images/ADAsh/ADAsh3.webp', 
        width: 500, 
        height: 250,
        fullSize: '/images/ADAsh/ADAsh3.png'
      },
      { 
        src: '/images/ADAsh/ADAsh4.webp', 
        width: 500, 
        height: 250,
        fullSize: '/images/ADAsh/ADAsh4.png'
      }
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS EC2', 'AWS S3'],
    github: 'https://github.com/SudoCasey/ADAshboard_example',
    demo: 'https://myadash.com/',
    date: 'January 2021 - October 2024'
  },
  {
    title: 'WCAG Color Contrast Tool',
    description: 'A WCAG 2.2-compliant color contrast calculator & color grabbing tool used as a Google Chrome browser plugin. This allows users to immediately check color contrast values on any web page without needing to switch to other pages or tabs.',
    images: [{ 
      src: '/images/CCPlugin/CC_Gif.gif', 
      width: 500, 
      height: 250,
      fullSize: '/images/CCPlugin/CC_Gif.gif'
    }],
    technologies: ['React', 'Chrome Extension API'],
    github: 'https://github.com/SudoCasey/Contrast_Checker_Chrome_Plugin',
    demo: 'https://chromewebstore.google.com/detail/wcag-color-contrast-tool/dlgdkjfbookpeopkfeookihfpobkophe',
    date: 'November 2024 - December 2024'
  }
];

function ProjectCard({ project }) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="project images"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {project.images.map((image, imgIndex) => (
              <Tab key={imgIndex} label={`Image ${imgIndex + 1}`} />
            ))}
          </Tabs>
          <Box 
            onClick={() => handleClickOpen(project.images[value])}
            sx={{ cursor: 'pointer' }}
            ref={imageRef}
          >
            {isVisible && (
              <CardMedia
                component="img"
                width={project.images[value].width}
                height={project.images[value].height}
                srcSet={`
                  ${project.images[value].src.replace('.webp', '-250.webp')} 250w,
                  ${project.images[value].src.replace('.webp', '-500.webp')} 500w,
                  ${project.images[value].src.replace('.webp', '-1000.webp')} 1000w
                `}
                sizes="(max-width: 600px) 250px, (max-width: 900px) 500px, 1000px"
                image={project.images[value].src}
                alt={`${project.title} - Image ${value + 1}`}
                loading="lazy"
                sx={{
                  objectFit: 'cover',
                  objectPosition: 'top'
                }}
              />
            )}
          </Box>
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
            {project.demo && (
              <Button
                variant="contained"
                size="small"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            selectedImage.fullSize.endsWith('.gif') ? (
              <img
                src={selectedImage.fullSize}
                alt={`${project.title} - Full Size Image`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            ) : (
              <img
                src={selectedImage.fullSize}
                srcSet={`
                  ${selectedImage.fullSize.replace('.webp', '-250.webp')} 250w,
                  ${selectedImage.fullSize.replace('.webp', '-500.webp')} 500w,
                  ${selectedImage.fullSize.replace('.webp', '-1000.webp')} 1000w
                `}
                sizes="(max-width: 600px) 250px, (max-width: 900px) 500px, 1000px"
                alt={`${project.title} - Full Size Image`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

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
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 