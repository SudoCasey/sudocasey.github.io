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
    skills: ['Javascript', 'HTML', 'CSS', 'jQuery', 'Bootstrap', 'React', 'Vue.js', 'React Native'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'PHP', 'Python', 'Express', 'SQL', 'MongoDB'],
  },
  {
    title: 'CMS & E-commerce',
    skills: ['WordPress', 'Shopify', 'BigCommerce', 'Magento'],
  },
  {
    title: 'DevOps & Tools',
    skills: ['Git', 'GitHub', 'CI/CD', 'AWS', 'EC2', 'S3', 'Jenkins', 'Jest'],
  },
  {
    title: 'Accessibility',
    skills: ['WCAG 2.2', 'Section 508', 'Responsive Design', 'ADA Compliance'],
  },
  {
    title: 'Soft Skills',
    skills: ['Customer Service', 'Team Leadership', 'Project Management', 'Problem Solving'],
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
        <Grid container spacing={4}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  height: '100%',
                }}
              >
                <Typography variant="h6" gutterBottom>
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