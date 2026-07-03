"use client";

import { useMemo, useState, type CSSProperties, type ElementType } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Database,
  Fish,
  GitBranch,
  Image as ImageIcon,
  Layers3,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
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
  const accuracyPercent = toPercent(status.accuracy);
  const top5Percent = toPercent(status.top5Accuracy);
  const yoloTop1 = toPercent(status.yoloTop1);
  const yoloTop5 = toPercent(status.yoloTop5);
  const validationLoss = status.validationLoss === null ? "-" : status.validationLoss.toFixed(3);
  const readyCount = status.newSpeciesStatuses.find((item) => item.tone === "ready")?.count ?? 0;
  const warningCount = status.newSpeciesStatuses.find((item) => item.tone === "warning")?.count ?? 0;
  const scoreValue = status.accuracy === null ? 0 : Math.max(0, Math.min(100, status.accuracy * 100));

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
          <h1>Bal?k t?r? analiz modeli</h1>
          <p>Aktif s?n?fland?r?c?, e?itim metrikleri, t?r ba??na g?rsel da??l?m? ve yeni t?r ekleme durumunu tek panelden takip edin.</p>
        </div>
        <aside>
          <small>Aktif model</small>
          <strong>{status.activeModelVersion}</strong>
          <span>{status.activeModelPath}</span>
        </aside>
      </header>

      <section className="model-status-metrics" aria-label="Model e?itim ?zeti">
        <MetricCard icon={Fish} label="E?itilen T?r" value={numberFormatter.format(status.trainedSpeciesCount)} detail="class_names.json" />
        <MetricCard icon={ImageIcon} label="E?itim G?rseli" value={numberFormatter.format(status.totalTrainingImages)} detail={numberFormatter.format(status.averageImagesPerSpecies) + " / t?r ort."} />
        <MetricCard icon={Target} label="Val Accuracy" value={accuracyPercent} detail={"Top-5 " + top5Percent} />
        <MetricCard icon={BarChart3} label="Validation Loss" value={validationLoss} detail={status.trainingEpoch === null ? "Son epoch" : "Epoch " + status.trainingEpoch} />
      </section>

      <div className="model-status-grid">
        <main className="model-status-main">
          <section className="model-status-panel model-status-panel--performance">
            <PanelTitle icon={Activity} title="E?itim Performans?" action={formatDate(status.lastTrainingDate)} />
            <div className="model-performance-layout">
              <div className="model-score-ring" style={{ "--score": scoreValue + "%" } as CSSProperties}>
                <strong>{accuracyPercent}</strong>
                <span>Validation accuracy</span>
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
            <PanelTitle icon={Layers3} title="T?r Ba??na G?rsel Say?s?" action="Ger?ek e?itim klas?rleri" />
            <div className="model-control-bar" aria-label="Model listesi kontrolleri">
              <div className="model-filter-buttons" aria-label="Duruma g?re filtrele">
                {filterOptions.map((option) => (
                  <button key={option.value} type="button" className={filter === option.value ? "is-active" : ""} onClick={() => setFilter(option.value)}>
                    {option.label}
                  </button>
                ))}
              </div>
              <label className="model-select-wrap">
                <span>S?rala</span>
                <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
                  <option value="images">G?rsel say?s?</option>
                  <option value="name">T?r ad?</option>
                  <option value="status">Durum</option>
                </select>
                <ChevronDown size={16} aria-hidden />
              </label>
              <button type="button" className={compactRows ? "model-toggle is-active" : "model-toggle"} onClick={() => setCompactRows((current) => !current)} aria-pressed={compactRows}>
                <span aria-hidden /> Kompakt
              </button>
            </div>
            <div className={compactRows ? "model-species-table model-species-table--compact" : "model-species-table"} role="table" aria-label="T?r ba??na e?itim g?rsel say?s?">
              <div className="model-species-row model-species-row--head" role="row">
                <span>T?r</span>
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
            <PanelTitle icon={CheckCircle2} title="Se?ili T?r" action={selectedRow ? numberFormatter.format(selectedRow.totalImages) + " g?rsel" : "-"} />
            {selectedRow ? <SelectedSpecies row={selectedRow} /> : <p className="model-status-note">Filtreye uygun t?r bulunamad?.</p>}
          </section>

          <section className="model-status-panel">
            <PanelTitle icon={PlusCircle} title="Yeni T?r Ekleme" action={readyCount + " haz?r"} />
            <div className="model-status-stack">
              {status.newSpeciesStatuses.map((item) => (
                <button className={"model-new-species model-new-species--" + item.tone} type="button" key={item.label} onClick={() => setFilter(item.tone === "warning" ? "needs_more_sources" : item.tone)}>
                  <span>{item.label}</span>
                  <strong>{numberFormatter.format(item.count)}</strong>
                </button>
              ))}
            </div>
            <p className="model-status-note">{warningCount > 0 ? warningCount + " t?r i?in ek lisansl? g?rsel kayna?? gerekli." : "Yeni t?r adaylar? e?itim i?in yeterli g?rsel e?i?ine yak?n."}</p>
          </section>

          <section className="model-status-panel">
            <PanelTitle icon={ShieldCheck} title="S?rd?r?lebilirlik" action="Canl?" />
            <div className="model-timeline">
              <TimelineItem icon={Database} title="Veri seti" detail={numberFormatter.format(status.totalTrainingImages) + " g?rsel indekslendi"} />
              <TimelineItem icon={TrendingUp} title="Son e?itim" detail={formatDate(status.lastTrainingDate)} />
              <TimelineItem icon={GitBranch} title="Model versiyonu" detail={status.activeModelVersion} />
              <TimelineItem icon={Clock3} title="Sonraki ad?m" detail="Yeni haz?r t?rlerle yeniden e?itim planlanabilir" />
            </div>
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
  { label: "T?m?", value: "all" },
  { label: "Haz?r", value: "ready" },
  { label: "Eksik", value: "needs_more_sources" },
  { label: "E?itildi", value: "trained" },
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
    ready: "Haz?r",
    needs_more_sources: "Eksik G?rsel",
    trained: "E?itildi",
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
      <PerformanceRow label="Train oran?" value={toPercent(trainRatio)} ratio={trainRatio} />
      <PerformanceRow label="Validation oran?" value={toPercent(row.totalImages ? row.valImages / row.totalImages : 0)} ratio={row.totalImages ? row.valImages / row.totalImages : 0} />
      <StatusPill status={row.status} />
    </div>
  );
}

function TimelineItem({ icon: Icon, title, detail }: { icon: ElementType; title: string; detail: string }) {
  return (
    <article>
      <span><Icon size={16} /></span>
      <div><strong>{title}</strong><small>{detail}</small></div>
    </article>
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
