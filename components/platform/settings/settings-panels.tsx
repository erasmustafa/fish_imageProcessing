export default function SettingsPanels() {
  return (
    <section className="surface section">
      <h2 style={{ marginTop: 0 }}>Tercihler</h2>
      <div className="grid grid-2">
        <label>
          <input type="checkbox" defaultChecked /> Analizden sonra sonucu kütüphaneye ekle
        </label>
        <label>
          <input type="checkbox" defaultChecked /> Bölge yoğunluğu uyarılarını göster
        </label>
      </div>
    </section>
  );
}
