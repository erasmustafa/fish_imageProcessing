import { demoUser } from "../../../lib/constants";

export default function PlatformTopbar() {
  return (
    <header className="topbar">
      <div>
        <p className="muted" style={{ margin: 0 }}>
          Canlı demo alanı
        </p>
        <h1 className="page-title">Deniz verisi ve AI analiz merkezi</h1>
      </div>
      <div className="surface" style={{ padding: "10px 14px" }}>
        <strong>{demoUser.name}</strong>
        <span className="muted" style={{ display: "block", fontSize: 13 }}>
          {demoUser.region}
        </span>
      </div>
    </header>
  );
}
