"use client";
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CloudIcon from '@mui/icons-material/Cloud';
import SendIcon from '@mui/icons-material/Send';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("access_key", "1f45b1ce-4dfc-4711-bee8-200c051b7a55");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again or contact me directly via LinkedIn.',
      });
    } finally {
      setIsSubmitting(false);
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                Send me a Message
              </Typography>
              {status.message && (
                <Alert severity={status.type === 'success' ? 'success' : 'error'}>
                  {status.message}
                </Alert>
              )}
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                disabled={isSubmitting}
                autoComplete="off"
              />
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                disabled={isSubmitting}
                autoComplete="off"
              />
              <TextField
                required
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={6}
                disabled={isSubmitting}
                autoComplete="off"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    alignItems: 'flex-start',
                    paddingTop: '8px',
                    '& textarea': {
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      lineHeight: '1.5',
                    },
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                disabled={isSubmitting}
                sx={{ alignSelf: 'flex-start' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                height: '100%',
              }}
            >
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Connect with me on LinkedIn
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Send me a message on LinkedIn to discuss potential projects, collaborations, or opportunities.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<LinkedInIcon />}
                  href="https://www.linkedin.com/in/caseyfriedrich1/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message Me on LinkedIn
                </Button>
              </Box>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Other Ways to Connect
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
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
                    startIcon={<CloudIcon />}
                    href="https://bsky.app/profile/caseyfriedrich.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bluesky
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 