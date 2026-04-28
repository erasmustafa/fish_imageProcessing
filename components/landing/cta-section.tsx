import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="landing-section" style={{ textAlign: "center" }}>
      <div className="landing-inner">
        <h2 style={{ fontSize: 42 }}>İlk analizi başlat.</h2>
        <Link href="/platform/analyze" className="button">Analiz ekranına git</Link>
      </div>
    </section>
  );
}
