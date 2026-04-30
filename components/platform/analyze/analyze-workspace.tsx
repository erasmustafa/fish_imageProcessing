"use client";

import { ArrowRight, CheckCircle2, Clock3, MoreHorizontal, Upload } from "lucide-react";
import PlatformUtilityBar from "../shell/platform-utility-bar";

const recentAnalyses = [
  {
    name: "Striped Bass",
    weight: "4.1 lbs",
    when: "Yesterday",
    image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=420&q=80",
  },
  {
    name: "Yellow Perch",
    weight: "1.2 lbs",
    when: "3 days ago",
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=420&q=80",
  },
];

const characteristics = [
  "Notable Feature: Large mouth, dark green stripe",
  "Preferred Bait: Worms, minnows, crankbaits",
];

export default function AnalyzeWorkspace() {
  return (
    <section className="analysis-studio-page">
      <PlatformUtilityBar />

      <div className="analysis-studio-shell">
        <header className="analysis-studio-head">
          <h1>Analyse</h1>
          <p>Upload fish photo and get AI-powered analysis</p>
        </header>

        <div className="analysis-studio-grid">
          <div className="analysis-studio-left">
            <section className="analysis-upload-card">
              <div className="analysis-upload-inner">
                <div className="analysis-upload-icon">
                  <Upload size={36} />
                </div>
                <h2>Upload fish photo</h2>
                <p>Snap a clear photo of the fish and upload to analyse</p>
                <button type="button">
                  <Upload size={18} />
                  Upload Photo
                </button>
                <span>or drag and drop a file here</span>
              </div>
            </section>

            <section className="analysis-recent-card">
              <div className="analysis-card-title">
                <h2>Recent Analyses</h2>
                <button type="button" aria-label="More">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="analysis-recent-list">
                {recentAnalyses.map((item) => (
                  <article key={item.name}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.weight}</span>
                    </div>
                    <small>
                      <Clock3 size={15} />
                      {item.when}
                    </small>
                  </article>
                ))}
              </div>

              <button type="button" className="analysis-ghost-button">
                View History
              </button>
            </section>
          </div>

          <div className="analysis-studio-right">
            <section className="analysis-result-hero">
              <div className="analysis-result-copy">
                <div className="analysis-result-status">
                  <CheckCircle2 size={22} />
                  <span>Analysis complete!</span>
                  <small>We identified the fish</small>
                </div>

                <h2>Largemouth Bass</h2>

                <div className="analysis-result-tags">
                  <span>Freshwater</span>
                  <span>Common</span>
                </div>
              </div>

              <img
                src="https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=1200&q=80"
                alt="Largemouth Bass"
              />
            </section>

            <section className="analysis-detail-card">
              <div className="analysis-detail-main">
                <div className="analysis-card-section">
                  <h3>Species Overview</h3>
                  <dl className="analysis-overview-list">
                    <div>
                      <dt>Scientific Name:</dt>
                      <dd>Micropterus salmoides</dd>
                    </div>
                    <div>
                      <dt>Size:</dt>
                      <dd>12-30 in</dd>
                    </div>
                    <div>
                      <dt>Weight:</dt>
                      <dd>Up to 22 lb</dd>
                    </div>
                  </dl>
                </div>

                <div className="analysis-card-section analysis-card-section--traits">
                  <h3>Characteristics</h3>
                  <ul>
                    {characteristics.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="analysis-detail-map">
                <h3>Locations</h3>
                <div className="analysis-location-preview">
                  <span className="analysis-location-dot analysis-location-dot-a" />
                  <span className="analysis-location-dot analysis-location-dot-b" />
                  <span className="analysis-location-dot analysis-location-dot-c" />
                </div>
                <div className="analysis-location-actions">
                  <button type="button">Zoom Out</button>
                  <button type="button">View All</button>
                </div>
              </aside>
            </section>

            <section className="analysis-summary-card">
              <div className="analysis-summary-fish">
                <div>
                  <h3>Fishing Log Summary</h3>
                  <img
                    src="https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=320&q=80"
                    alt="Fish summary"
                  />
                </div>
                <button type="button" aria-label="Open details">
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="analysis-summary-stats">
                <strong>22</strong>
                <span>catches</span>
                <strong>64</strong>
                <span>lbs</span>
              </div>

              <div className="analysis-summary-side">
                <p>
                  Latest catch <strong>34 ago</strong>
                </p>
                <p>
                  Biggest catch <strong>8.2 lbs</strong>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
