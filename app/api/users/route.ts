import { NextResponse } from "next/server";
import { demoUser } from "../../../lib/constants";

export async function GET() {
  return NextResponse.json({ users: [demoUser] });
}
