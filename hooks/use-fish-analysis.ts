"use client";

import { useState } from "react";
import type { FishAnalysisResult } from "../types/fish";

export function useFishAnalysis() {
  const [result, setResult] = useState<FishAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  return {
    result,
    loading,
    start: () => setLoading(true),
    finish: (nextResult: FishAnalysisResult) => {
      setResult(nextResult);
      setLoading(false);
    },
    reset: () => {
      setResult(null);
      setLoading(false);
    },
  };
}
