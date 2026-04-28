import { marinePoints } from "../../../lib/constants";

export default function DashboardOverview() {
  const strongest = marinePoints.reduce((best, point) =>
    point.density > best.density ? point : best
  );

  return (
    <section className="surface section">
      <h2 style={{ marginTop: 0 }}>Bölge özeti</h2>
      <p className="muted" style={{ lineHeight: 1.7 }}>
        En yoğun sinyal şu anda <strong style={{ color: "#e5eef8" }}>{strongest.name}</strong>{" "}
        hattında. Model sonuçları, topluluk bildirimleri ve su sıcaklığı birlikte
        değerlendirilerek gösterilir.
      </p>
      <div className="grid grid-3" style={{ marginTop: 18 }}>
        {marinePoints.map((point) => (
          <div key={point.id} className="metric">
            <span className="muted">{point.region}</span>
            <strong>{point.name}</strong>
            <small className="muted">
              {point.dominantSpecies} · {point.waterTemp}°C · {point.trend}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}
