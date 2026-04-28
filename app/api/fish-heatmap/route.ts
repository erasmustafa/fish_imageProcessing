import { NextResponse } from "next/server";
import { fishHeatmapPoints } from "../../../lib/fish-heatmap-data";

const FASTAPI_HEATMAP_URL =
  process.env.FASTAPI_HEATMAP_URL ?? "http://127.0.0.1:8000/api/v1/fish-heatmap";

export async function GET() {
  try {
    const response = await fetch(FASTAPI_HEATMAP_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(1200),
    });

    if (response.ok) {
      const points = await response.json();
      return NextResponse.json({ points, source: "fastapi" });
    }
  } catch {
    // FastAPI is optional during UI development; fall back to mock data.
  }

  return NextResponse.json({ points: fishHeatmapPoints, source: "mock" });
}
