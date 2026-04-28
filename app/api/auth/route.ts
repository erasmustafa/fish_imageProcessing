import { NextRequest, NextResponse } from "next/server";
import { getDemoSession } from "../../../lib/auth";
import { validateEmail, validatePassword } from "../../../lib/validation/auth-schema";

export async function GET() {
  return NextResponse.json(getDemoSession());
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "");
  const password = String(body?.password ?? "");

  if (!validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json(
      { error: "Geçerli e-posta ve en az 8 karakterlik şifre girin." },
      { status: 400 }
    );
  }

  return NextResponse.json(getDemoSession());
}
