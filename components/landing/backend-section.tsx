export default function BackendSection() {
  return (
    <section className="landing-section">
      <div className="landing-inner grid grid-2">
        <div>
          <h2>Next.js ve FastAPI birlikte çalışır.</h2>
          <p className="muted" style={{ lineHeight: 1.7 }}>
            Frontend görseli Next.js API route’una gönderir; route, FastAPI analiz servisine güvenli bir köprü kurar.
          </p>
        </div>
        <div className="surface section">
          <code>POST /api/analyze-fish</code>
          <p className="muted">Proxy hedefi: FASTAPI_URL</p>
        </div>
      </div>
    </section>
  );
}
