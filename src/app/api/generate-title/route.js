import { githubModels } from "@github/models";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const { text } = await generateText({
      model: githubModels("openai/gpt-4o"),
      system:
        "You are a helpful assistant that generates concise title for conversations.",
      prompt: `use this first message form a conversation to generate concise title
      without any quotes (max 5 words): "${message}"`,
    });

    return NextResponse.json({ title: text });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate title" },
      { status: 500 },
    );
  }
}
