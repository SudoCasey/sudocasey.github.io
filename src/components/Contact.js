"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Contact() {
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      height: 'auto',
      '& input': {
        padding: '14px',
      },
      '& textarea': {
        padding: '14px',
      }
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Get in Touch
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 6 }}
        >
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                required
                sx={inputSx}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
                sx={inputSx}
              />
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
                sx={inputSx}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                required
                sx={inputSx}
              />
              <Button
                variant="contained"
                size="large"
                sx={{ alignSelf: 'flex-start' }}
              >
                Send Message
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Connect with me
              </Typography>
              <Stack spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
                <Button
                  variant="outlined"
                  startIcon={<LocationOnIcon />}
                  fullWidth
                >
                  Florida, United States
                </Button>
                {/* <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  fullWidth
                >
                  CaseyRFriedrich@gmail.com
                </Button> */}
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  fullWidth
                  component="a"
                  href="https://github.com/SudoCasey"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/SudoCasey
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  fullWidth
                  component="a"
                  href="https://www.linkedin.com/in/casey-friedrich/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/casey-friedrich
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 