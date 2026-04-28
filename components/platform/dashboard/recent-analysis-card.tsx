import { recentAnalyses } from "../../../lib/constants";
import { percent } from "../../../lib/utils";

export default function RecentAnalysisCard() {
  return (
    <section className="surface section">
      <h2 style={{ marginTop: 0 }}>Son analizler</h2>
      <div className="grid">
        {recentAnalyses.map((analysis) => (
          <article
            key={analysis.id}
            style={{
              display: "grid",
              gridTemplateColumns: "84px minmax(0, 1fr) auto",
              gap: 14,
              alignItems: "center",
            }}
          >
            <img
              src={analysis.imageUrl}
              alt={analysis.species}
              style={{ width: 84, height: 64, objectFit: "cover", borderRadius: 8 }}
            />
            <div>
              <strong>{analysis.species}</strong>
              <p className="muted" style={{ margin: "4px 0 0" }}>
                {analysis.location} · {analysis.date}
              </p>
            </div>
            <strong>{percent(analysis.confidence)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
