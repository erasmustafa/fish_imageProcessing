import { marinePoints } from "../../../lib/constants";

export default function MapSidePanel() {
  return (
    <aside className="surface section">
      <h2 style={{ marginTop: 0 }}>Aktif noktalar</h2>
      <div className="grid">
        {marinePoints.map((point) => (
          <article key={point.id}>
            <strong>{point.name}</strong>
            <p className="muted" style={{ margin: "6px 0" }}>
              {point.dominantSpecies} · {point.density}% yoğunluk
            </p>
            <small className="muted">
              {point.coordinates[0]}, {point.coordinates[1]}
            </small>
          </article>
        ))}
      </div>
    </aside>
  );
}
