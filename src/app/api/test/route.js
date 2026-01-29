import { githubModels } from "@github/models";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const { text } = await generateText({
      model: githubModels("openai/gpt-4o"),
      system: 'You are a helpful AI assistant named "Miss Bloopy".',
      prompt: "Give a brief 2-sentence introduction of yourself",
    });

    return NextResponse.json({
      message: text,
    });
  } catch (error) {
    console.error("Error in test route : ", error);
    return NextResponse.json(
      {
        error: "An error occurred",
      },
      { status: 500 },
    );
  }
}
