import { demoUser } from "../../../lib/constants";

export default function ProfileStats() {
  return (
    <section className="grid grid-3">
      <div className="metric">
        <span className="muted">Av kaydı</span>
        <strong>{demoUser.catches}</strong>
      </div>
      <div className="metric">
        <span className="muted">Analiz</span>
        <strong>{demoUser.analyses}</strong>
      </div>
      <div className="metric">
        <span className="muted">Bölge</span>
        <strong style={{ fontSize: 22 }}>{demoUser.region}</strong>
      </div>
    </section>
  );
}
