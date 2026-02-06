"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { alpha } from '@mui/material/styles';

const WEB3FORMS_ACCESS_KEY = '1f45b1ce-4dfc-4711-bee8-200c051b7a55';

export default function About() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [expandedByUser, setExpandedByUser] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState({ type: '', message: '' });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const imageRef = React.useRef(null);
  const formRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const messageInputRef = React.useRef(null);

  const accordionExpanded = expandedByUser;

  React.useEffect(() => {
    const el = emailInputRef.current;
    if (el) el.setCustomValidity(email.trim() ? '' : 'Please enter your email');
  }, [email]);

  React.useEffect(() => {
    const el = messageInputRef.current;
    if (el) el.setCustomValidity(message.trim() ? '' : 'Please enter your message');
  }, [message]);

  const handleAccordionChange = (_, isExpanded) => {
    setExpandedByUser(isExpanded);
  };

  const handleFormBlur = () => {
    setTimeout(() => {
      if (formRef.current && !formRef.current.contains(document.activeElement)) {
        setExpandedByUser(false);
      }
    }, 0);
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setExpandedByUser(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', 'Portfolio accordion');
      formDataToSend.append('email', email);
      formDataToSend.append('message', message);
      formDataToSend.append('access_key', WEB3FORMS_ACCESS_KEY);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json();
      if (data.success) {
        setSnackbarOpen(true);
        setEmail('');
        setMessage('');
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to send. Try the Contact page or LinkedIn.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Typography variant="subtitle2" component="h3" color="text.secondary" sx={{ textAlign: 'center' }}>
                <List >
                  <ListItem sx={{py:0.25}}>Full Stack Web Developer</ListItem>
                  <ListItem sx={{py:0.25}}>WCAG Accessibility Expert</ListItem>
                  <ListItem sx={{py:0.25}}>Problem Solver</ListItem>
                </List>
              </Typography>
              <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <Accordion
                  expanded={accordionExpanded}
                  onChange={handleAccordionChange}
                  sx={{ width: '100%', '&:before': { display: 'none' } }}
                >
                  <AccordionSummary
                  tabIndex="-1"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="quick-contact-content"
                    id="quick-contact-header"
                    sx={{
                      minHeight: 56,
                      paddingRight: 1,
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                        paddingRight: 1,
                        marginRight: 0,
                        alignItems: 'center',
                      },
                      '& .MuiAccordionSummary-expandIconWrapper': { marginLeft: 0 },
                    }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      required={accordionExpanded}
                      inputRef={emailInputRef}
                      label={accordionExpanded ? 'Email' : 'Message me...'}
                      placeholder={accordionExpanded ? 'Email' : 'Message me...'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setExpandedByUser(true)}
                      onBlur={handleFormBlur}
                      onClick={(e) => e.stopPropagation()}
                      autoComplete="email"
                      sx={{
                        '& .MuiInputLabel-outlined': {
                          '&.MuiInputLabel-sizeSmall': {
                            transform: 'translate(14px, 7px) scale(1)',
                          },
                          '&.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -9px) scale(0.75)',
                          },
                        },
                      }}
                    />
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      flexDirection: 'column',
                      gap: 2,
                      pt: 0,
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      maxRows={4}
                      required
                      inputRef={messageInputRef}
                      label="Message"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={handleFormBlur}
                      name="message"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      sx={{ mt: 1 }}
                      onBlur={handleFormBlur}
                    >
                      {isSubmitting ? 'Sending…' : 'Send'}
                    </Button>
                    {status.type === 'error' && status.message && (
                      <Typography variant="caption" color="error.main" sx={{ display: 'block' }}>
                        {status.message}
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Florida, United States
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GitHubIcon color="action" />
                  <Link
                    href="https://github.com/sudocasey"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
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
              Dynamic Full-stack Web Developer and Manager with 7+ years of experience in agile environments, excelling in web accessibility and cloud deployment strategies. Currently serving as Web Developer Manager at SEO For Real Estate Investors, where I direct a development team in building and maintaining SEO-optimized websites for real estate investment businesses.
            </Typography>
            <Typography variant="body1" paragraph>
              Previously, as Web Development Team Lead and WCAG Accessibility SME at ADA Site Compliance, I mentored and led teams of developers in agile sprints, promoting coding best practices and accessibility-first development. I architected scalable RESTful APIs that improved web app performance and database fetch speeds by 80% in the <a href="/#ADAshboard">"ADAshboard"</a>, and implemented DevOps pipelines with CircleCI, Docker, and AWS for improved deployment speed and reliability.
            </Typography>
            <Typography variant="body1" paragraph>
              I served as Subject Matter Expert on WCAG 2.2 and Section 508 standards, influencing product design and client compliance strategy. I spearheaded accessibility remediation for over 200 client websites, improving usability for users with disabilities, increasing WCAG 2.2 compliance across websites, mobile apps on iOS & Android, and preventing legal liability by addressing accessibility issues in clients' received legal threats. I also developed and launched 25+ bespoke web applications using React, PHP, WordPress, and Shopify, directly contributing to SEO improvements and higher sales conversions.
            </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: '#1b5e20',
            color: '#fff',
            '& .MuiAlert-icon': { color: '#fff' },
          }}
          role="alert"
        >
          Thanks! Your message was sent.
        </Alert>
      </Snackbar>
    </Box>
  );
} 