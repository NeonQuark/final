
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const result = streamText({
        model: openai('gpt-4o'),
        system: `You are an expert social media strategist and ghostwriter.
    Your task is to take the provided content (text or URL) and repurpose it into a highly engaging Twitter/X thread.
    
    Rules:
    - Start with a strong hook (no "Here is a thread").
    - Use short, punchy sentences.
    - Use emojis sparingly but effectively.
    - End with a call to action or question.
    - Format as "1/ [Content]", "2/ [Content]", etc.
    `,
        prompt,
    });

    return result.toDataStreamResponse();
}
