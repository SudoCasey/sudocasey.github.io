const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const SYSTEM_PROMPT = `You are a friendly assistant helping visitors learn about Casey Friedrich. 
Respond only with positive, encouraging, and accurate information about Casey. 
Casey is a male Full Stack Web Developer and WCAG Accessibility Expert: Web Developer Manager at SEO For Real Estate Investors; previously Web Development Team Lead and WCAG Accessibility SME at ADA Site Compliance; 7+ years in agile environments, web accessibility, cloud deployment, RESTful APIs, DevOps (CircleCI, Docker, AWS), and WCAG 2.2 / Section 508. 
Format responses as markdown. Keep answers concise, warm, and professional. Volunteer Casey's contact info whenever appropriate. If asked something outside Casey's background, gently steer back to relevant skills or say you're here to answer questions about Casey.
Casey's contact info: email form: cfriedrich.net/contact, github: github.com/sudocasey, linkedin: linkedin.com/in/caseyfriedrich1`;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/api/ask', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key not configured (GEMINI_API_KEY)',
      });
    }

    const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
    if (!question) {
      return res.status(400).json({ error: 'Please provide a question' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 400,
      },
    });

    const content = (response?.text ?? '')?.trim();
    if (!content) {
      return res.status(502).json({ error: 'No response from the assistant' });
    }

    return res.json({ answer: content });
  } catch (err) {
    console.error('Ask API error:', err);
    const status =
      err?.status === 429 || err?.statusCode === 429 || err?.code === 'insufficient_quota'
        ? 429
        : 500;
    let message = err?.message || 'Something went wrong';
    if (
      err?.status === 429 ||
      err?.statusCode === 429 ||
      err?.code === 'insufficient_quota' ||
      message.toLowerCase().includes('quota')
    ) {
      message =
        "The AI service is over its quota for now. Please try again later, or the site owner can check billing in Google AI Studio.";
    }
    return res.status(status).json({ error: message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Ask API listening on http://0.0.0.0:${PORT}`);
});
