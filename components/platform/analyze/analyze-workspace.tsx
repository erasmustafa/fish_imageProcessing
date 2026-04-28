"use client";

import { ChangeEvent, DragEvent, useMemo, useState } from "react";
import {
  Bell,
  Briefcase,
  CheckCircle2,
  Clock3,
  CloudUpload,
  Mail,
  RefreshCw,
  Search,
  Star,
} from "lucide-react";

type AnalyzeResponse = {
  species: string;
  confidence: number;
  edible: boolean;
  ideal_size: string;
  recommended_baits: string[];
  recommended_gear: string[];
  region_notes: string[];
};

const fallbackResult: AnalyzeResponse = {
  species: "Largemouth Bass",
  confidence: 0.98,
  edible: true,
  ideal_size: "12-30 in",
  recommended_baits: ["Worms", "minnows", "crankbaits"],
  recommended_gear: ["Freshwater"],
  region_notes: ["Large mouth", "dark green stripe"],
};

const recentAnalyses = [
  {
    name: "Striped Bass",
    weight: "4.1 lbs",
    time: "Yesterday",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Yellow Perch",
    weight: "1.2 lbs",
    time: "3 days ago",
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=320&q=80",
  },
];

export default function AnalyzeWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse>(fallbackResult);
  const [error, setError] = useState<string | null>(null);

  const acceptedTypes = useMemo(
    () => ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    []
  );

  function setSelectedFile(selected: File | null) {
    setError(null);

    if (!selected) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    if (!acceptedTypes.includes(selected.type)) {
      setError("Please upload a JPG, PNG or WEBP image.");
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event.target.files?.[0] ?? null);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    setSelectedFile(event.dataTransfer.files?.[0] ?? null);
  }

  async function analyzeImage() {
    if (!file) {
      setResult(fallbackResult);
      return;
    }

    try {
      setLoading(true);
      setError(null);

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
          "Analysis failed.";
        throw new Error(message);
      }

      setResult(data as AnalyzeResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="analyse-page">
      <header className="home-topbar analyse-topbar compact-topbar">
        <label className="home-search">
          <Search size={15} />
          <input placeholder="Search ..." aria-label="Search" />
        </label>
        <div className="home-top-actions">
          <Briefcase size={17} />
          <RefreshCw size={17} />
          <Mail size={17} />
          <Bell size={17} />
          <button type="button" aria-label="Notifications">
            <Bell size={17} />
            <span />
          </button>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=72&q=80"
            alt="Alicia"
          />
        </div>
      </header>

      <div className="analyse-content">
        <h1>Analyse</h1>

        <div className="analyse-grid-new">
          <div className="analyse-left-column">
            <section
              className={dragActive ? "analyse-upload-card analyse-upload-card-active" : "analyse-upload-card"}
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={onDrop}
            >
              <div className="analyse-cloud-icon">
                <CloudUpload size={48} />
              </div>
              <h2>Upload fish photo</h2>
              <p>Snap a clear photo of the fish and upload to analyse</p>
              <label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={onInputChange}
                />
                <CloudUpload size={16} />
                Upload Photo
              </label>
              <span>or drag and drop a file here</span>
              {error ? <strong className="analyse-error-text">{error}</strong> : null}
            </section>

            <section className="recent-analyses-card">
              <div className="analyse-panel-head">
                <h2>Recent Analyses</h2>
                <div className="panel-dots">
                  <span />
                  <span />
                </div>
              </div>
              {recentAnalyses.map((item) => (
                <article key={item.name}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.weight}</span>
                  </div>
                  <p>
                    <Clock3 size={13} />
                    {item.time}
                  </p>
                </article>
              ))}
              <a href="/platform/messages">View History</a>
            </section>
          </div>

          <section className="analysis-result-card-new">
            <div className="analysis-complete">
              <CheckCircle2 size={22} />
              <p>
                <strong>Analysis complete!</strong> We identified the fish
              </p>
            </div>
            <h2>{result.species}</h2>
            <div className="analysis-tags">
              <span>Freshwater</span>
              <span>Common</span>
            </div>
            <img
              className="analysis-main-fish"
              src={previewUrl ?? "/login-fish-scene.png"}
              alt={result.species}
            />

            <div className="analysis-info-grid">
              <section>
                <h3>Species Overview</h3>
                <p>Scientific Name: Micropterus salmoides</p>
                <p>Size: {result.ideal_size}</p>
                <p>Weight: Up to 22 lb</p>

                <div className="characteristics-block">
                  <h3>Characteristics</h3>
                  <p>• Notable Feature: {result.region_notes.join(", ")}</p>
                  <p>• Preferred Bait: {result.recommended_baits.join(", ")}</p>
                </div>
              </section>

              <section>
                <h3>Locations</h3>
                <img
                  className="map-preview"
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=420&q=80"
                  alt="Map preview"
                />
                <div className="map-actions">
                  <button type="button">Zoom Out</button>
                  <button type="button">View All</button>
                </div>
              </section>
            </div>

            <div className="analysis-summary-row">
              <div>
                <span>Fishing Log Summary</span>
                <img src="https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=160&q=80" alt="Fish" />
              </div>
              <strong>22 <small>catches</small></strong>
              <strong>64 <small>lbs</small></strong>
              <span>
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={13} fill="currentColor" />
                ))}
              </span>
              <p>Latest catch 34 ago</p>
              <p>Biggest cath 8.2 lbs</p>
            </div>

            <button className="analyse-submit-hidden" type="button" onClick={analyzeImage} disabled={loading}>
              {loading ? "Analysing..." : "Analyse selected photo"}
            </button>
          </section>
        </div>
      </div>
    </section>
  );
}
