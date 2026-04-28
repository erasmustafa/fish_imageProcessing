export default function HeatmapLegend() {
  return (
    <div className="surface section">
      <h3 style={{ marginTop: 0 }}>Yoğunluk</h3>
      {[
        ["Yüksek", "#2fc6d6"],
        ["Orta", "#8bd3a8"],
        ["Düşük", "#f3c969"],
      ].map(([label, color]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: color }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
