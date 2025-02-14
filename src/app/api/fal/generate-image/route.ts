import { NextResponse } from 'next/server';
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
      input: {
        prompt,
        num_images: 4,
        enable_safety_checker: true,
        safety_tolerance: "2",
        output_format: "jpeg",
        aspect_ratio: "1:1"
      },
      logs: true,
    });

    return NextResponse.json(result.data);
  } catch (error: any) {
    console.error('Error generating images:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    );
  }
} 