"use client";

import { ChangeEvent, DragEvent, useMemo, useState } from "react";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";

type AnalyzeResponse = {
  species: string;
  confidence: number;
  edible: boolean;
  ideal_size: string;
  recommended_baits: string[];
  recommended_gear: string[];
  region_notes: string[];
};

export default function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const acceptedTypes = useMemo(
    () => ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    []
  );

  function resetState() {
    setResult(null);
    setError(null);
  }

  function setSelectedFile(selected: File | null) {
    resetState();

    if (!selected) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    if (!acceptedTypes.includes(selected.type)) {
      setError("Lütfen JPG, PNG veya WEBP formatında görsel yükleyin.");
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setSelectedFile(selected);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0] ?? null;
    setSelectedFile(dropped);
  }

  async function analyzeImage() {
    if (!file) {
      setError("Önce bir görsel seç.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze-fish", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.details?.detail ||
          data?.details?.error ||
          data?.error ||
          "Analiz sırasında hata oluştu.";
        throw new Error(message);
      }

      setResult(data as AnalyzeResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gap: 20,
        gridTemplateColumns: "1fr 1fr",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          borderRadius: 24,
          padding: 24,
          background: "white",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          style={{
            borderRadius: 24,
            border: dragActive
              ? "2px dashed #22d3ee"
              : "2px dashed rgba(34,211,238,0.4)",
            background: dragActive
              ? "rgba(34,211,238,0.08)"
              : "rgba(34,211,238,0.05)",
            padding: 32,
            textAlign: "center",
          }}
        >
          {!previewUrl ? (
            <>
              <ImagePlus
                size={40}
                style={{ margin: "0 auto", color: "#0891b2" }}
              />
              <p
                style={{
                  marginTop: 16,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                Balık fotoğrafını yükle
              </p>
              <p style={{ marginTop: 8, color: "#64748b" }}>
                Sürükle bırak veya dosya seç
              </p>
            </>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              <img
                src={previewUrl}
                alt="Yüklenen görsel"
                style={{
                  maxHeight: 320,
                  maxWidth: "100%",
                  objectFit: "cover",
                  margin: "0 auto",
                  borderRadius: 16,
                }}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  style={buttonOutlineStyle}
                >
                  <X size={16} style={{ marginRight: 8 }} />
                  Temizle
                </button>
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: 24,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                style={{ display: "none" }}
                onChange={onInputChange}
              />
              <span style={buttonPrimaryStyle}>
                <Upload size={16} style={{ marginRight: 8 }} />
                Dosya Seç
              </span>
            </label>

            <button
              type="button"
              onClick={analyzeImage}
              disabled={!file || loading}
              style={{
                ...buttonDarkStyle,
                opacity: !file || loading ? 0.6 : 1,
                cursor: !file || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    style={{ marginRight: 8, animation: "spin 1s linear infinite" }}
                  />
                  Analiz ediliyor
                </>
              ) : (
                "Analiz Et"
              )}
            </button>
          </div>

          {error && (
            <p style={{ marginTop: 16, color: "#dc2626", fontWeight: 500 }}>
              {error}
            </p>
          )}
        </div>
      </div>

      <div
        style={{
          borderRadius: 24,
          padding: 24,
          background: "white",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: 16,
          }}
        >
          Analiz Sonucu
        </h3>

        {!result ? (
          <div
            style={{
              borderRadius: 16,
              padding: 20,
              background: "#f8fafc",
              color: "#64748b",
            }}
          >
            Bir balık fotoğrafı yükleyip analiz başlattığında sonuçlar burada
            görünecek.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            <div
              style={{
                borderRadius: 16,
                padding: 20,
                background: "#f8fafc",
              }}
            >
              <p style={{ fontSize: 14, color: "#64748b" }}>Tahmin edilen tür</p>
              <h4
                style={{
                  marginTop: 4,
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {result.species}
              </h4>
              <p style={{ marginTop: 8, color: "#0891b2", fontWeight: 600 }}>
                Güven skoru: %{(result.confidence * 100).toFixed(1)}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <InfoCard label="Yenebilir">
                {result.edible ? "Evet" : "Hayır"}
              </InfoCard>
              <InfoCard label="İdeal Boy">{result.ideal_size}</InfoCard>
              <InfoCard label="Önerilen Yem">
                {result.recommended_baits.join(", ")}
              </InfoCard>
              <InfoCard label="Önerilen Takım">
                {result.recommended_gear.join(", ")}
              </InfoCard>
            </div>

            <InfoCard label="Bölge Notları">
              {result.region_notes.join(", ")}
            </InfoCard>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 960px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function InfoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        padding: 16,
        background: "#f8fafc",
      }}
    >
      <p style={{ fontSize: 14, color: "#64748b" }}>{label}</p>
      <div style={{ marginTop: 8, fontWeight: 600, color: "#0f172a" }}>
        {children}
      </div>
    </div>
  );
}

const buttonPrimaryStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  background: "#22d3ee",
  color: "#082f49",
  padding: "10px 18px",
  fontWeight: 700,
  cursor: "pointer",
};

const buttonDarkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  background: "#0f172a",
  color: "white",
  padding: "10px 18px",
  fontWeight: 700,
  border: "none",
};

const buttonOutlineStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  background: "white",
  color: "#0f172a",
  padding: "10px 18px",
  fontWeight: 700,
  border: "1px solid rgba(0,0,0,0.12)",
};