import { createGroq } from "@ai-sdk/groq";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
