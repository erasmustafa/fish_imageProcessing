const features = [
  ["AI analiz", "Fotoğraftan tür, güven skoru ve av önerileri."],
  ["Bölge haritası", "Yoğunluk, trend ve su sıcaklığı sinyalleri."],
  ["Topluluk", "Yerel gözlemleri kayıtlarla birlikte takip et."],
];

export default function FeaturesSection() {
  return (
    <section className="landing-section">
      <div className="landing-inner grid grid-3">
        {features.map(([title, body]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p className="muted" style={{ lineHeight: 1.7 }}>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
