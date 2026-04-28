export default function AiSection() {
  return (
    <section className="landing-section" style={{ background: "#0b1828" }}>
      <div className="landing-inner grid grid-2" style={{ alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 42, marginTop: 0 }}>Model sonucunu anlaşılır bilgiye çevir.</h2>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            Analiz çıktısı yalnızca tür adıyla kalmaz; ideal boy, yem, takım ve bölge notlarıyla
            av kararına dönüşür.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&w=1000&q=80"
          alt="Denizde balık sürüsü"
          style={{ borderRadius: 8, minHeight: 320, objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
