import { NextRequest, NextResponse } from "next/server";

const FASTAPI_URL =
  process.env.FASTAPI_URL ?? "http://127.0.0.1:8000/api/v1/analyze-fish";

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.formData();
    const image = incoming.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "image alanı zorunlu" },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("image", image, image.name);

    const response = await fetch(FASTAPI_URL, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "FastAPI analyze endpoint hatası",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("analyze-fish route error:", error);
    return NextResponse.json(
      { error: "Sunucu tarafında beklenmeyen hata oluştu" },
      { status: 500 }
    );
  }
}