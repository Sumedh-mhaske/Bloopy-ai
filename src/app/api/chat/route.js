import { githubModels } from "@github/models";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  try {
    const body = await req.json();
    let messages = body?.messages || [];

    const cleanMessages = messages
      .map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: msg.parts?.[0]?.text || msg.content || "",
      }))
      .filter((msg) => msg.content.trim());

    const result = streamText({
      model: githubModels("openai/gpt-4o"),
      system: 'You are a helpful AI assistant named "Miss Bloopy".',
      messages: cleanMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
