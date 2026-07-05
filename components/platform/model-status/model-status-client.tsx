"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ElementType } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Database,
  Fish,
  Image as ImageIcon,
  Layers3,
  PlusCircle,
  Sparkles,
  Target,
} from "lucide-react";
import type { ModelTrainingStatus, SpeciesTrainingRow } from "../../../lib/server/model-training-status";

const percentFormatter = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 });
const numberFormatter = new Intl.NumberFormat("tr-TR");

type FilterMode = "all" | "ready" | "needs_more_sources" | "trained" | "pending";
type SortMode = "images" | "name" | "status";

export default function ModelStatusClient({ status }: { status: ModelTrainingStatus }) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [sortMode, setSortMode] = useState<SortMode>("images");
  const [compactRows, setCompactRows] = useState(false);
  const [selectedClass, setSelectedClass] = useState(status.speciesRows[0]?.className ?? "");
  const [animatedScore, setAnimatedScore] = useState(0);
  const accuracyPercent = toPercent(status.accuracy);
  const top5Percent = toPercent(status.top5Accuracy);
  const yoloTop1 = toPercent(status.yoloTop1);
  const yoloTop5 = toPercent(status.yoloTop5);
  const validationLoss = status.validationLoss === null ? "-" : status.validationLoss.toFixed(3);
  const readyCount = status.newSpeciesStatuses.find((item) => item.tone === "ready")?.count ?? 0;
  const warningCount = status.newSpeciesStatuses.find((item) => item.tone === "warning")?.count ?? 0;
  const scoreValue = status.accuracy === null ? 0 : Math.max(0, Math.min(100, status.accuracy * 100));
  const animatedAccuracyPercent = status.accuracy === null ? "-" : "%" + percentFormatter.format(animatedScore);

  useEffect(() => {
    if (status.accuracy === null) {
      setAnimatedScore(0);
      return;
    }

    let frameId = 0;
    const duration = 1100;
    const startedAt = performance.now();
    const target = Math.max(0, Math.min(100, status.accuracy * 100));

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(target * eased);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    setAnimatedScore(0);
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [status.accuracy]);

  const filteredRows = useMemo(() => {
    const rows = filter === "all" ? status.speciesRows : status.speciesRows.filter((row) => row.status === filter);
    return [...rows].sort((a, b) => {
      if (sortMode === "name") return a.displayName.localeCompare(b.displayName, "tr");
      if (sortMode === "status") return a.status.localeCompare(b.status) || b.totalImages - a.totalImages;
      return b.totalImages - a.totalImages || a.displayName.localeCompare(b.displayName, "tr");
    });
  }, [filter, sortMode, status.speciesRows]);

  const selectedRow = status.speciesRows.find((row) => row.className === selectedClass) ?? status.speciesRows[0] ?? null;

  return (
    <section className="model-status-page">
      <header className="model-status-hero">
        <div>
          <span className="model-status-kicker"><Sparkles size={16} /> Model Durumu</span>
          <h1>Balık türü analiz modeli</h1>
          <p>Aktif sınıflandırıcı, eğitim metrikleri, tür başına görsel dağılımı ve yeni tür ekleme durumunu tek panelden takip edin.</p>
        </div>
        <aside>
          <small>Aktif model</small>
          <strong>{status.activeModelVersion}</strong>
          <span>{status.activeModelPath}</span>
        </aside>
      </header>

      <section className="model-status-metrics" aria-label="Model eğitim özeti">
        <MetricCard icon={Fish} label="Eğitilen Tür" value={numberFormatter.format(status.trainedSpeciesCount)} detail="class_names.json" />
        <MetricCard icon={ImageIcon} label="Eğitim Görseli" value={numberFormatter.format(status.totalTrainingImages)} detail={numberFormatter.format(status.averageImagesPerSpecies) + " / tür ort."} />
        <MetricCard icon={Target} label="Val Accuracy" value={accuracyPercent} detail={"Top-5 " + top5Percent} />
        <MetricCard icon={BarChart3} label="Validation Loss" value={validationLoss} detail={status.trainingEpoch === null ? "Son epoch" : "Epoch " + status.trainingEpoch} />
      </section>

      <div className="model-status-grid">
        <main className="model-status-main">
          <section className="model-status-panel model-status-panel--performance">
            <PanelTitle icon={Activity} title="Eğitim Performansı" action={formatDate(status.lastTrainingDate)} />
            <div className="model-performance-layout">
              <div className="model-score-ring" style={{ "--score": animatedScore + "%", "--target-score": scoreValue + "%" } as CSSProperties}>
                <div className="model-score-content">
                  <strong>{animatedAccuracyPercent}</strong>
                  <span>Validation accuracy</span>
                </div>
              </div>
              <div className="model-performance-list">
                <PerformanceRow label="Top-5 Accuracy" value={top5Percent} ratio={status.top5Accuracy ?? 0} />
                <PerformanceRow label="Validation Loss" value={validationLoss} ratio={status.validationLoss === null ? 0 : Math.max(0, 1 - status.validationLoss)} />
                <PerformanceRow label="YOLO Top-1" value={yoloTop1} ratio={status.yoloTop1 ?? 0} />
                <PerformanceRow label="YOLO Top-5" value={yoloTop5} ratio={status.yoloTop5 ?? 0} />
              </div>
            </div>
          </section>

          <section className="model-status-panel">
            <PanelTitle icon={Layers3} title="Tür Başına Görsel Sayısı" action="Gerçek eğitim klasörleri" />
            <div className="model-control-bar" aria-label="Model listesi kontrolleri">
              <div className="model-filter-buttons" aria-label="Duruma göre filtrele">
                {filterOptions.map((option) => (
                  <button key={option.value} type="button" className={filter === option.value ? "is-active" : ""} onClick={() => setFilter(option.value)}>
                    {option.label}
                  </button>
                ))}
              </div>
              <label className="model-select-wrap">
                <span>Sırala</span>
                <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
                  <option value="images">Görsel sayısı</option>
                  <option value="name">Tür adı</option>
                  <option value="status">Durum</option>
                </select>
                <ChevronDown size={16} aria-hidden />
              </label>
              <button type="button" className={compactRows ? "model-toggle is-active" : "model-toggle"} onClick={() => setCompactRows((current) => !current)} aria-pressed={compactRows}>
                <span aria-hidden /> Kompakt
              </button>
            </div>
            <div className={compactRows ? "model-species-table model-species-table--compact" : "model-species-table"} role="table" aria-label="Tür başına eğitim görsel sayısı">
              <div className="model-species-row model-species-row--head" role="row">
                <span>Tür</span>
                <span>Train</span>
                <span>Val</span>
                <span>Toplam</span>
                <span>Durum</span>
              </div>
              {filteredRows.map((row) => (
                <button className={selectedRow?.className === row.className ? "model-species-row model-species-row--selected" : "model-species-row"} role="row" key={row.className} type="button" onClick={() => setSelectedClass(row.className)}>
                  <span>
                    <strong>{row.displayName}</strong>
                    <small>{row.className}</small>
                  </span>
                  <span>{numberFormatter.format(row.trainImages)}</span>
                  <span>{numberFormatter.format(row.valImages)}</span>
                  <span>{numberFormatter.format(row.totalImages)}</span>
                  <StatusPill status={row.status} />
                </button>
              ))}
            </div>
          </section>
        </main>

        <aside className="model-status-side">
          <section className="model-status-panel model-selected-species">
            <PanelTitle icon={CheckCircle2} title="Seçili Tür" action={selectedRow ? numberFormatter.format(selectedRow.totalImages) + " görsel" : "-"} />
            {selectedRow ? <SelectedSpecies row={selectedRow} /> : <p className="model-status-note">Filtreye uygun tür bulunamadı.</p>}
          </section>

          <section className="model-status-panel">
            <PanelTitle icon={PlusCircle} title="Yeni Tür Ekleme" action={readyCount + " hazır"} />
            <div className="model-status-stack">
              {status.newSpeciesStatuses.map((item) => (
                <button className={"model-new-species model-new-species--" + item.tone} type="button" key={item.label} onClick={() => setFilter(item.tone === "warning" ? "needs_more_sources" : item.tone)}>
                  <span>{item.label}</span>
                  <strong>{numberFormatter.format(item.count)}</strong>
                </button>
              ))}
            </div>
            <p className="model-status-note">{warningCount > 0 ? warningCount + " tür için ek lisanslı görsel kaynağı gerekli." : "Yeni tür adayları eğitim için yeterli görsel eşiğine yakın."}</p>
          </section>

          <section className="model-status-panel model-status-panel--sources">
            <PanelTitle icon={Database} title="Kaynak Dosyalar" action="Workspace" />
            {status.sourceFiles.map((file) => <button type="button" key={file} onClick={() => void navigator.clipboard?.writeText(file)}><code>{file}</code></button>)}
          </section>
        </aside>
      </div>
    </section>
  );
}

const filterOptions: Array<{ label: string; value: FilterMode }> = [
  { label: "Tümü", value: "all" },
  { label: "Hazır", value: "ready" },
  { label: "Eksik", value: "needs_more_sources" },
  { label: "Eğitildi", value: "trained" },
  { label: "Beklemede", value: "pending" },
];

function MetricCard({ icon: Icon, label, value, detail }: { icon: ElementType; label: string; value: string; detail: string }) {
  return (
    <article className="model-metric-card">
      <span><Icon size={22} /></span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <em>{detail}</em>
      </div>
    </article>
  );
}

function PanelTitle({ icon: Icon, title, action }: { icon: ElementType; title: string; action: string }) {
  return (
    <header className="model-panel-title">
      <h2><Icon size={18} /> {title}</h2>
      <span>{action}</span>
    </header>
  );
}

function PerformanceRow({ label, value, ratio }: { label: string; value: string; ratio: number }) {
  return (
    <article className="model-performance-row">
      <div><span>{label}</span><strong>{value}</strong></div>
      <em><i style={{ "--bar-width": Math.max(3, Math.min(100, ratio * 100)) + "%" } as CSSProperties} /></em>
    </article>
  );
}

function StatusPill({ status }: { status: SpeciesTrainingRow["status"] }) {
  const labels = {
    ready: "Hazır",
    needs_more_sources: "Eksik Görsel",
    trained: "Eğitildi",
    pending: "Beklemede",
  };
  return <b className={"model-status-pill model-status-pill--" + status}>{labels[status]}</b>;
}

function SelectedSpecies({ row }: { row: SpeciesTrainingRow }) {
  const trainRatio = row.totalImages ? row.trainImages / row.totalImages : 0;
  return (
    <div className="model-selected-card">
      <strong>{row.displayName}</strong>
      <span>{row.className}</span>
      <PerformanceRow label="Train oranı" value={toPercent(trainRatio)} ratio={trainRatio} />
      <PerformanceRow label="Validation oranı" value={toPercent(row.totalImages ? row.valImages / row.totalImages : 0)} ratio={row.totalImages ? row.valImages / row.totalImages : 0} />
      <StatusPill status={row.status} />
    </div>
  );
}

function toPercent(value: number | null) {
  if (value === null) return "-";
  return "%" + percentFormatter.format(value * 100);
}

function formatDate(value: string) {
  if (!value) return "Tarih yok";
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
