import { NextRequest, NextResponse } from "next/server";
import { socialPosts } from "../../../lib/constants";
import { validatePostBody } from "../../../lib/validation/post-schema";

export async function GET() {
  return NextResponse.json({ posts: socialPosts });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const error = validatePostBody(String(body?.body ?? ""));

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({
    post: {
      id: `p_${Date.now()}`,
      author: "Deniz Arslan",
      region: String(body?.region ?? "İzmir"),
      species: String(body?.species ?? "Genel"),
      body: String(body.body),
      likes: 0,
      comments: 0,
      createdAt: "şimdi",
    },
  });
}
