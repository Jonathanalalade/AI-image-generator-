import { AnthropicStream, StreamingTextResponse, Message } from 'ai';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Convert the messages to Anthropic's format
  const anthropicMessages = messages.map((message: Message) => ({
    role: message.role === 'user' ? 'user' : 'assistant',
    content: message.content,
  }));

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: anthropicMessages,
      stream: true,
    });
    
    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Anthropic API error:', error);
    return new Response(JSON.stringify({ error: 'Error processing your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
