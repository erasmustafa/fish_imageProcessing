import { fishSpecies } from "../../../lib/constants";

export default function SocialSidebar() {
  return (
    <aside className="surface section">
      <h2 style={{ marginTop: 0 }}>Trend türler</h2>
      <div className="grid">
        {fishSpecies.map((fish) => (
          <div key={fish.id}>
            <strong>{fish.name}</strong>
            <p className="muted" style={{ margin: "4px 0 0" }}>{fish.season}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
