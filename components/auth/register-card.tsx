export default function RegisterCard() {
  return (
    <form className="surface section">
      <h2 style={{ marginTop: 0 }}>Hesap oluştur</h2>
      <div className="grid">
        <input placeholder="Ad soyad" style={{ padding: 12, borderRadius: 8 }} />
        <input placeholder="E-posta" type="email" style={{ padding: 12, borderRadius: 8 }} />
        <input placeholder="Şifre" type="password" style={{ padding: 12, borderRadius: 8 }} />
        <button className="button" type="submit">Kaydol</button>
      </div>
    </form>
  );
}
