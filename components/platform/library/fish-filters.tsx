export default function FishFilters() {
  return (
    <section className="surface section" style={{ marginBottom: 16 }}>
      <div className="grid grid-3">
        <label>
          <span className="muted">Bölge</span>
          <select className="surface" style={{ width: "100%", marginTop: 8, padding: 12, color: "inherit" }}>
            <option>Ege</option>
            <option>Akdeniz</option>
            <option>Marmara</option>
          </select>
        </label>
        <label>
          <span className="muted">Av tipi</span>
          <select className="surface" style={{ width: "100%", marginTop: 8, padding: 12, color: "inherit" }}>
            <option>Kıyı</option>
            <option>Tekne</option>
            <option>Dip</option>
          </select>
        </label>
        <label>
          <span className="muted">Risk</span>
          <select className="surface" style={{ width: "100%", marginTop: 8, padding: 12, color: "inherit" }}>
            <option>Tümü</option>
            <option>Düşük</option>
            <option>Orta</option>
            <option>Yüksek</option>
          </select>
        </label>
      </div>
    </section>
  );
}
