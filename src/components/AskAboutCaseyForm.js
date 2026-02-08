'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ReactMarkdown from 'react-markdown';

const TYPING_INTERVAL_MS = 12;
const CHARS_PER_TICK = 2;

function TypingMarkdown({ text, onComplete }) {
  const [visibleLength, setVisibleLength] = React.useState(0);
  const isComplete = visibleLength >= text.length;

  React.useEffect(() => {
    if (!text.length) return;
    setVisibleLength(0);
    const len = text.length;
    let next = 0;
    const id = setInterval(() => {
      next = Math.min(next + CHARS_PER_TICK, len);
      setVisibleLength(next);
      if (next >= len) {
        clearInterval(id);
        onComplete?.();
      }
    }, TYPING_INTERVAL_MS);
    return () => clearInterval(id);
  }, [text]);

  const visible = text.slice(0, visibleLength);

  return (
    <Box component="span" className="markdown-body chat-response-body" sx={{ display: 'block' }}>
      <ReactMarkdown>{visible}</ReactMarkdown>
      {!isComplete && (
        <Box
          component="span"
          className="typing-cursor"
          sx={{
            display: 'inline-block',
            width: 2,
            height: '1em',
            backgroundColor: 'currentColor',
            marginLeft: 0.5,
            verticalAlign: 'text-bottom',
            animation: 'typing-blink 0.8s step-end infinite',
            '@keyframes typing-blink': {
              '50%': { opacity: 0 },
            },
          }}
          aria-hidden
        />
      )}
    </Box>
  );
}

const DEFAULT_ASK_API =
  typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ASK_API_URL
    ? process.env.NEXT_PUBLIC_ASK_API_URL
    : '/api/ask';

export default function AskAboutCaseyForm({
  apiUrl = DEFAULT_ASK_API,
  placeholder = 'Ask AI a question about Casey...',
  submitLabel = 'Ask',
  maxWidth = 420,
  sx,
}) {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const requestInFlightRef = React.useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    if (requestInFlightRef.current) return;
    requestInFlightRef.current = true;
    setError('');
    setAnswer('');
    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const raw = await res.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        if (res.status === 404) {
          throw new Error(
            '404: API Usage Limit Reached. Please try again later.'
          );
        }
        throw new Error(
          res.ok
            ? 'Invalid response from the Ask API.'
            : `Ask API returned non-JSON (${res.status}). Is the API running and reachable?`
        );
      }
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setAnswer(data.answer || '');
      setQuestion('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
      requestInFlightRef.current = false;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '100%', maxWidth, pt: 1, ...sx }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="stretch">
        <TextField
          fullWidth
          size="small"
          placeholder={placeholder}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: (theme) => theme.palette.background.paper,
            },
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={loading}
          sx={{ minWidth: 90 }}
        >
          {loading ? <CircularProgress size={24} /> : submitLabel}
        </Button>
      </Stack>
      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      {answer && (
        <Box
          className="ai-chat-response"
          sx={{
            mt: 1.5,
            textAlign: 'left',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 2px 8px rgba(0,0,0,0.3)'
                : '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.12)'
                : 'rgba(0,0,0,0.08)',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
            '& .chat-response-body': {
              '& p': { margin: '0 0 0.5em', '&:last-child': { marginBottom: 0 } },
              '& ul, & ol': { margin: '0.25em 0', paddingLeft: '1.25em' },
              '& li': { marginBottom: '0.25em' },
              '& strong': { fontWeight: 700 },
              '& em': { fontStyle: 'italic' },
              '& code': {
                fontFamily: 'monospace',
                fontSize: '0.9em',
                padding: '0.15em 0.35em',
                borderRadius: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
              },
              '& pre': {
                margin: '0.5em 0',
                padding: 1,
                borderRadius: 1,
                overflow: 'auto',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                '& code': { padding: 0, backgroundColor: 'transparent' },
              },
              '& a': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
              '& h1, & h2, & h3': { margin: '0.5em 0 0.25em', fontSize: '1em', fontWeight: 600 },
            },
          }}
        >
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderBottom: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(0,0,0,0.06)',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                animation: 'pulse-dot 1.2s ease-in-out infinite',
                '@keyframes pulse-dot': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                },
              }}
            />
            <Box
              component="span"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'text.secondary',
                letterSpacing: '0.04em',
              }}
            >
              AI Response:
            </Box>
          </Box>
          <Box sx={{ px: 2, py: 1.5 }}>
            <TypingMarkdown text={answer} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
