const steps = ["Yükle", "Ön işle", "Modelden geçir", "Sonucu zenginleştir"];

export default function AnalysisPipeline() {
  return (
    <section className="surface section">
      <h2 style={{ marginTop: 0 }}>Analiz akışı</h2>
      <div className="grid grid-4">
        {steps.map((step, index) => (
          <div key={step} className="metric">
            <span className="muted">0{index + 1}</span>
            <strong style={{ fontSize: 20 }}>{step}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
