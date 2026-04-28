export default function AccountSettings() {
  return (
    <section className="surface section">
      <h2 style={{ marginTop: 0 }}>Hesap</h2>
      <div className="grid grid-2">
        <label>
          <span className="muted">Ad</span>
          <input defaultValue="Deniz Arslan" style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 8 }} />
        </label>
        <label>
          <span className="muted">Bölge</span>
          <input defaultValue="İzmir Körfezi" style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 8 }} />
        </label>
      </div>
    </section>
  );
}
