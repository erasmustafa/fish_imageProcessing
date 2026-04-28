import type { FishAnalysisResult } from "../../../types/fish";
import { percent } from "../../../lib/utils";

export default function AnalysisResultCard({ result }: { result: FishAnalysisResult }) {
  return (
    <article className="surface section">
      <img
        src={result.imageUrl}
        alt={result.species}
        style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8 }}
      />
      <h2>{result.species}</h2>
      <p className="muted">{result.location} · {result.date}</p>
      <strong>{percent(result.confidence)} güven</strong>
    </article>
  );
}
