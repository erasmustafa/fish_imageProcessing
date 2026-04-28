import { dashboardStats } from "../../../lib/constants";

export default function StatsCards() {
  return (
    <section className="grid grid-4">
      {dashboardStats.map((item) => (
        <div key={item.label} className="metric">
          <span className="muted">{item.label}</span>
          <strong>{item.value}</strong>
          <small className="muted">{item.note}</small>
        </div>
      ))}
    </section>
  );
}
