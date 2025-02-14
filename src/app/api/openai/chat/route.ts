import OpenAI from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response('Missing OpenAI API key', { status: 400 });
  }

  try {
    const { messages } = await req.json();
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return new Response(JSON.stringify({ 
      text: response.choices[0].message.content,
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
