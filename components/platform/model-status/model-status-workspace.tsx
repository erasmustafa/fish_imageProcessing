import type { CSSProperties, ElementType } from "react";
import {
  Activity,
  BarChart3,
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
import { getModelTrainingStatus } from "../../../lib/server/model-training-status";

const percentFormatter = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 });
const numberFormatter = new Intl.NumberFormat("tr-TR");

export default function ModelStatusWorkspace() {
  const status = getModelTrainingStatus();
  const accuracyPercent = toPercent(status.accuracy);
  const top5Percent = toPercent(status.top5Accuracy);
  const yoloTop1 = toPercent(status.yoloTop1);
  const yoloTop5 = toPercent(status.yoloTop5);
  const validationLoss = status.validationLoss === null ? "-" : status.validationLoss.toFixed(3);
  const readyCount = status.newSpeciesStatuses.find((item) => item.tone === "ready")?.count ?? 0;
  const warningCount = status.newSpeciesStatuses.find((item) => item.tone === "warning")?.count ?? 0;
  const scoreValue = status.accuracy === null ? 0 : Math.max(0, Math.min(100, status.accuracy * 100));

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
        <MetricCard icon={ImageIcon} label="Eğitim Görseli" value={numberFormatter.format(status.totalTrainingImages)} detail={`${numberFormatter.format(status.averageImagesPerSpecies)} / tür ort.`} />
        <MetricCard icon={Target} label="Val Accuracy" value={accuracyPercent} detail={`Top-5 ${top5Percent}`} />
        <MetricCard icon={BarChart3} label="Validation Loss" value={validationLoss} detail={status.trainingEpoch === null ? "Son epoch" : `Epoch ${status.trainingEpoch}`} />
      </section>

      <div className="model-status-grid">
        <main className="model-status-main">
          <section className="model-status-panel model-status-panel--performance">
            <PanelTitle icon={Activity} title="Eğitim Performansı" action={formatDate(status.lastTrainingDate)} />
            <div className="model-performance-layout">
              <div className="model-score-ring" style={{ "--score": `${scoreValue}%` } as CSSProperties}>
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
            <PanelTitle icon={Layers3} title="Tür Başına Görsel Sayısı" action="Train + Val" />
            <div className="model-species-table" role="table" aria-label="Tür başına eğitim görsel sayısı">
              <div className="model-species-row model-species-row--head" role="row">
                <span>Tür</span>
                <span>Train</span>
                <span>Val</span>
                <span>Toplam</span>
                <span>Durum</span>
              </div>
              {status.speciesRows.map((row) => (
                <div className="model-species-row" role="row" key={row.className}>
                  <span>
                    <strong>{row.displayName}</strong>
                    <small>{row.className}</small>
                  </span>
                  <span>{numberFormatter.format(row.trainImages)}</span>
                  <span>{numberFormatter.format(row.valImages)}</span>
                  <span>{numberFormatter.format(row.totalImages)}</span>
                  <StatusPill status={row.status} />
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="model-status-side">
          <section className="model-status-panel">
            <PanelTitle icon={PlusCircle} title="Yeni Tür Ekleme" action={`${readyCount} hazır`} />
            <div className="model-status-stack">
              {status.newSpeciesStatuses.map((item) => (
                <article className={`model-new-species model-new-species--${item.tone}`} key={item.label}>
                  <span>{item.label}</span>
                  <strong>{numberFormatter.format(item.count)}</strong>
                </article>
              ))}
            </div>
            <p className="model-status-note">{warningCount > 0 ? `${warningCount} tür için ek lisanslı görsel kaynağı gerekli.` : "Yeni tür adayları eğitim için yeterli görsel eşiğine yakın."}</p>
          </section>

          <section className="model-status-panel">
            <PanelTitle icon={ShieldCheck} title="Sürdürülebilirlik" action="Canlı" />
            <div className="model-timeline">
              <TimelineItem icon={Database} title="Veri seti" detail={`${numberFormatter.format(status.totalTrainingImages)} görsel indekslendi`} />
              <TimelineItem icon={TrendingUp} title="Son eğitim" detail={formatDate(status.lastTrainingDate)} />
              <TimelineItem icon={GitBranch} title="Model versiyonu" detail={status.activeModelVersion} />
              <TimelineItem icon={Clock3} title="Sonraki adım" detail="Yeni hazır türlerle yeniden eğitim planlanabilir" />
            </div>
          </section>

          <section className="model-status-panel model-status-panel--sources">
            <PanelTitle icon={Database} title="Kaynak Dosyalar" action="Workspace" />
            {status.sourceFiles.map((file) => <code key={file}>{file}</code>)}
          </section>
        </aside>
      </div>
    </section>
  );
}

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
      <em><i style={{ width: `${Math.max(3, Math.min(100, ratio * 100))}%` }} /></em>
    </article>
  );
}

function StatusPill({ status }: { status: "ready" | "needs_more_sources" | "trained" | "pending" }) {
  const labels = {
    ready: "Hazır",
    needs_more_sources: "Eksik Görsel",
    trained: "Eğitildi",
    pending: "Beklemede",
  };
  return <b className={`model-status-pill model-status-pill--${status}`}>{labels[status]}</b>;
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
  return `%${percentFormatter.format(value * 100)}`;
}

function formatDate(value: string) {
  if (!value) return "Tarih yok";
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
