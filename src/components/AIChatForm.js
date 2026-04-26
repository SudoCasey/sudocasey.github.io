'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const TYPING_INTERVAL_MS = 12;
const CHARS_PER_TICK = 2;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

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
      <Box component="span" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {visible}
      </Box>
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

const IS_DEV = process.env.NODE_ENV === 'development';

const DEFAULT_ASK_API = IS_DEV
  ? '/api/ask'
  : (process.env.NEXT_PUBLIC_ASK_API_URL || 'https://chat.cfriedrich.net/v1/chat');

export default function AIChatForm({
  apiUrl = DEFAULT_ASK_API,
  placeholder = 'Ask Casey\'s AI a question about him...',
  submitLabel = 'Ask',
  maxWidth = 420,
  sx,
}) {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [messageTimestamps, setMessageTimestamps] = React.useState([]);
  const requestInFlightRef = React.useRef(false);
  const submittedMessageCountRef = React.useRef(0);
  const [loadingMessage, setLoadingMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;

    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;
    const recent = messageTimestamps.filter((t) => t > windowStart);
    if (recent.length >= RATE_LIMIT_MAX) {
      setError('Rate limit: please wait a moment before asking more questions.');
      return;
    }
    const updatedTimestamps = [...recent, now];
    setMessageTimestamps(updatedTimestamps);

    if (requestInFlightRef.current) return;
    requestInFlightRef.current = true;
    const isFirstMessage = submittedMessageCountRef.current === 0;
    submittedMessageCountRef.current += 1;
    setLoadingMessage(isFirstMessage ? 'Booting up…' : 'Thinking…');
    setError('');
    setAnswer('');
    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: q }],
          stream: false,
        }),
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
      const answerText =
        (data && data.message && data.message.content) ||
        data.answer ||
        data.content ||
        '';
      if (!answerText) {
        throw new Error('Ask API returned an empty response.');
      }
      setAnswer(answerText);
      setQuestion('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
      requestInFlightRef.current = false;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth,
        pt: 1,
        px: 1.5,
        py: 1.5,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        ...sx,
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="stretch">
        <TextField
          fullWidth
          size="small"
          placeholder={placeholder}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          autoComplete="off"
          label="Ask Casey's AI a question about him..."
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={loading}
          sx={{ minWidth: 90, height: '100%' }}
        >
          {loading ? <CircularProgress size={24} /> : submitLabel}
        </Button>
      </Stack>
      {loading && loadingMessage && (
        <Box
          sx={{
            mt: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            py: 1,
            px: 1.5,
            borderRadius: 2,
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.12)'
                : 'rgba(0,0,0,0.08)',
            backgroundColor: 'background.paper',
          }}
        >
          <CircularProgress size={18} thickness={5} sx={{ color: 'primary.main' }} />
          <Typography
            variant="body2"
            component="span"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {loadingMessage}
          </Typography>
        </Box>
      )}
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
            backgroundColor: 'background.paper',
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
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(0,0,0,0.08)',
              },
              '& pre': {
                margin: '0.5em 0',
                padding: 1,
                borderRadius: 1,
                overflow: 'auto',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.06)',
                '& code': { padding: 0, backgroundColor: 'transparent' },
              },
              '& a': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
              '& h1, & h2, & h3': {
                margin: '0.5em 0 0.25em',
                fontSize: '1em',
                fontWeight: 600,
              },
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

