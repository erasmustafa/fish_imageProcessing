import { recentAnalyses } from "../../../lib/constants";

export default function CatchHistory() {
  return (
    <section className="surface section">
      <h2 style={{ marginTop: 0 }}>Geçmiş kayıtlar</h2>
      <div className="grid">
        {recentAnalyses.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <span>{item.species}</span>
            <span className="muted">{item.location} · {item.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
