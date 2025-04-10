"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';

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
    },
    '& .MuiInputLabel-outlined': {
      backgroundColor: 'background.default',
      px: 1,
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
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/SudoCasey"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  href="https://www.linkedin.com/in/caseyfriedrich1/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<XIcon />}
                  href="https://twitter.com/SudoCasey"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </Button>
              </Stack>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <EmailIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                  CaseyRFriedrich@gmail.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 