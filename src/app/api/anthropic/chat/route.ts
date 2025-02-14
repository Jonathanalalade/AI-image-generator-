import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'edge';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response('Missing Anthropic API key', { status: 400 });
  }

  try {
    const { messages } = await req.json();
    
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return new Response(JSON.stringify({ 
      text: response.content[0].text,
      id: response.id 
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error?.message || 'An error occurred',
        details: error?.toString() 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
