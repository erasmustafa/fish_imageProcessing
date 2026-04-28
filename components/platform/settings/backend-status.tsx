export default function BackendStatus() {
  return (
    <section className="surface section">
      <h2 style={{ marginTop: 0 }}>Backend durumu</h2>
      <p className="muted">
        Next.js API, varsayılan olarak FastAPI analiz servisine
        <code> http://127.0.0.1:8000/api/v1/analyze-fish</code> üzerinden bağlanır.
      </p>
      <span className="button button-secondary">FASTAPI_URL ile değiştirilebilir</span>
    </section>
  );
}
