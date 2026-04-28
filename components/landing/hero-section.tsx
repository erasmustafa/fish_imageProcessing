import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="landing-copy">
        <p style={{ margin: 0, letterSpacing: "0.22em", fontWeight: 800 }}>AQUASCOPE</p>
        <h1>Balık türünü görselden tanı, bölgeni daha akıllı oku.</h1>
        <p className="muted" style={{ maxWidth: 560, lineHeight: 1.7, fontSize: 18 }}>
          Yapay zeka analizi, tür kütüphanesi, yoğunluk haritası ve topluluk bilgisi tek platformda.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/platform/analyze" className="button">Görsel analiz et</Link>
          <Link href="/platform/map" className="button button-secondary">Haritayı aç</Link>
        </div>
      </div>
    </section>
  );
}
