import { githubModels } from "@github/models/dist";
import { smoothStream, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = req.json();

  const result = streamText({
    model: githubModels("openai/gpt-4o"),
    system: 'You are a helpful AI assistant named "Miss Bloopy".',
    messages,
    experimental_transform: smoothStream(),
  });

  return result.toDataStreamResponse();
}
