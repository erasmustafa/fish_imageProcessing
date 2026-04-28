"use client";

import { useState } from "react";

export default function MessageInput() {
  const [value, setValue] = useState("");

  return (
    <form className="surface section" onSubmit={(event) => event.preventDefault()}>
      <label>
        <span className="muted">Yeni mesaj</span>
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={3}
          placeholder="Bölge bilgisini veya analiz sonucunu paylaş..."
          style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 8 }}
        />
      </label>
      <button className="button" type="submit" style={{ marginTop: 12 }}>
        Gönder
      </button>
    </form>
  );
}
