"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['Javascript', 'HTML', 'CSS', 'jQuery', 'Bootstrap', 'React', 'Vue.js', 'React Native', 'Next.js'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'PHP', 'Python', 'Express', 'SQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'CMS & E-commerce',
    skills: ['WordPress', 'Shopify', 'BigCommerce', 'Magento', 'Drupal'],
  },
  {
    title: 'DevOps',
    skills: ['Git', 'GitHub', 'CI/CD', 'CircleCI', 'AWS', 'EC2', 'S3', 'Lambda', 'Docker', 'Jest', 'Jenkins'],
  },
  {
    title: 'Accessibility',
    skills: ['WCAG 2.2', 'Section 508', 'Responsive Design', 'ADA Compliance', 'Axe-core', 'Lighthouse'],
  },
];

export default function Skills() {
  return (
    <Box
      id="skills"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Skills & Expertise
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 6 }}
        >
          A comprehensive overview of my technical and professional capabilities
        </Typography>
        <Grid container spacing={4} justifyContent={'space-evenly'}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  height: '100%',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  {category.title}
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {category.skills.map((skill, skillIndex) => (
                    <Chip
                      key={skillIndex}
                      label={skill}
                      sx={{
                        m: 0.5,
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 