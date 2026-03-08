import { NextResponse } from 'next/server';

const DEV_CHAT_URL = 'http://192.168.50.246:9988/v1/chat';
const PROD_CHAT_URL = 'https://snipersrecon69.asuscomm.com:9988/v1/chat';

const CHAT_API_URL =
  process.env.NODE_ENV === 'development' ? DEV_CHAT_URL : PROD_CHAT_URL;

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));

    let messages = [];

    if (Array.isArray(body?.messages) && body.messages.length > 0) {
      messages = body.messages;
    } else if (typeof body?.question === 'string') {
      const question = body.question.trim();
      if (!question) {
        return NextResponse.json(
          { error: 'Please provide a question' },
          { status: 400 }
        );
      }
      messages = [{ role: 'user', content: question }];
    } else {
      return NextResponse.json(
        { error: 'Please provide a question' },
        { status: 400 }
      );
    }

    const upstreamRes = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        stream: false,
      }),
    });

    const text = await upstreamRes.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      return NextResponse.json(
        {
          error: `Chat API returned non-JSON (${upstreamRes.status}). Is the API running and reachable?`,
        },
        { status: upstreamRes.ok ? 502 : upstreamRes.status || 502 }
      );
    }

    if (!upstreamRes.ok) {
      return NextResponse.json(
        {
          error:
            data.error ||
            `Chat API request failed (${upstreamRes.status}). Is the API running and reachable?`,
        },
        { status: upstreamRes.status }
      );
    }

    const answer =
      data?.message?.content || data?.answer || data?.content || '';

    if (!answer) {
      return NextResponse.json(
        { error: 'Chat API returned an empty response.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer });
  } catch (err) {
    console.error('Ask API route error:', err);
    return NextResponse.json(
      {
        error:
          'Something went wrong while contacting the chat service. Please try again later.',
      },
      { status: 500 }
    );
  }
}

