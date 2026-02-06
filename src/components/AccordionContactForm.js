'use client';

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DEFAULT_ACCESS_KEY = '1f45b1ce-4dfc-4711-bee8-200c051b7a55';

export default function AccordionContactForm({
  accessKey = DEFAULT_ACCESS_KEY,
  submitName = 'Portfolio accordion',
  successMessage = 'Thanks! Your message was sent.',
  errorMessageFallback = 'Failed to send. Try the Contact page or LinkedIn.',
  snackbarDuration = 3000,
  sx,
}) {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [expandedByUser, setExpandedByUser] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState({ type: '', message: '' });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);
  const theme = useTheme();
  const formRef = React.useRef(null);

  const successBg = theme.palette.mode === 'dark' ? '#0d3312' : '#1b5e20';
  const errorBg = theme.palette.mode === 'dark' ? '#6d1515' : '#b71c1c';
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
      formDataToSend.append('name', submitName);
      formDataToSend.append('email', email);
      formDataToSend.append('message', message);
      formDataToSend.append('access_key', accessKey);
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
      const errorMsg = err.message || errorMessageFallback;
      setStatus({ type: 'error', message: errorMsg });
      setErrorSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <Accordion
          expanded={accordionExpanded}
          onChange={handleAccordionChange}
          sx={{ width: '100%', '&:before': { display: 'none' } }}
        >
          <AccordionSummary
            tabIndex={-1}
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
              name="email"
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
          </AccordionDetails>
        </Accordion>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          role="alert"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: successBg,
            color: '#fff',
            '& .MuiAlert-icon': { color: '#fff' },
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          role="alert"
          onClose={() => setErrorSnackbarOpen(false)}
          severity="error"
          sx={{
            width: '100%',
            backgroundColor: errorBg,
            color: '#fff',
            '& .MuiAlert-icon': { color: '#fff' },
          }}
        >
          {status.type === 'error' ? status.message : ''}
        </Alert>
      </Snackbar>
    </Box>
  );
}
