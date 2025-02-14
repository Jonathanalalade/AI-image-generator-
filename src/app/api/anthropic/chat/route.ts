import { AnthropicStream, StreamingTextResponse } from 'ai';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 1024,
    messages: messages,
    stream: true,
  });
  
  const stream = AnthropicStream(response);
  return new StreamingTextResponse(stream);
}
