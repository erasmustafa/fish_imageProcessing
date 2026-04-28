import { NextResponse } from "next/server";
import { conversations, messages } from "../../../lib/constants";

export async function GET() {
  return NextResponse.json({ conversations, messages });
}
