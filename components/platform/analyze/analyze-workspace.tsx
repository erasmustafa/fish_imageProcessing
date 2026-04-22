import type { ElementType, ReactNode } from "react";
import {
  Bell,
  Box,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Filter,
  Search,
  Shield,
  Target,
} from "lucide-react";

const metricCards = [
  { title: "Total Assets", value: "1,248", change: "12.5%", trend: "up", icon: Box },
  { title: "Risk Score", value: "28", label: "Medium Risk", change: "8.3%", trend: "down", icon: Shield },
  { title: "Threats Detected", value: "156", change: "23.1%", trend: "up", icon: Target },
  { title: "Compliance", value: "92%", change: "4.7%", trend: "up", icon: CheckCircle2 },
] as const;

const riskyAssets = [
  { asset: "api.aquascope.com", type: "API", score: 85, risk: "High", trend: "high" },
  { asset: "crm.aquascope.com", type: "Web Application", score: 72, risk: "High", trend: "high" },
  { asset: "mail.aquascope.com", type: "Mail Server", score: 58, risk: "Medium", trend: "medium" },
  { asset: "dev.aquascope.com", type: "Server", score: 46, risk: "Medium", trend: "medium" },
  { asset: "blog.aquascope.com", type: "Web Application", score: 28, risk: "Low", trend: "low" },
] as const;

const distribution = [
  { label: "Low Risk", value: "34% (424)", color: "low" },
  { label: "Medium Risk", value: "41% (512)", color: "medium" },
  { label: "High Risk", value: "18% (224)", color: "high" },
  { label: "Critical", value: "7% (88)", color: "critical" },
];

const threatStats = [
  { label: "Malware", value: "62", tone: "high" },
  { label: "Phishing", value: "45", tone: "medium" },
  { label: "Vulnerabilities", value: "31", tone: "warning" },
  { label: "Data Breach", value: "18", tone: "critical" },
];

export default function AnalyzeWorkspace() {
  return (
    <section className="analyze-dashboard-page">
      <div className="analyze-dashboard-topbar">
        <div className="analyze-dashboard-search">
          <Search size={18} />
          <span>Search anything...</span>
          <kbd>Ctrl K</kbd>
        </div>

        <button className="analyze-dashboard-alert" type="button" aria-label="Notifications">
          <Bell size={18} />
          <span>3</span>
        </button>
      </div>

      <div className="analyze-dashboard-shell">
        <header className="analyze-dashboard-header">
          <div>
            <h1>Analyse</h1>
            <p>Deep insights and intelligent analysis for your digital assets.</p>
          </div>

          <div className="analyze-dashboard-filters">
            <button className="analyze-dashboard-filter" type="button">
              <Calendar size={16} />
              <span>12 May 2024 - 18 May 2024</span>
              <ChevronDown size={16} />
            </button>

            <button className="analyze-dashboard-filter" type="button">
              <Filter size={16} />
              <span>Filters</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <div className="analyze-dashboard-metrics">
          {metricCards.map((card) => (
            <MetricCard key={card.title} {...card} />
          ))}
        </div>

        <div className="analyze-dashboard-grid analyze-dashboard-grid-top">
          <RiskTrend />
          <RiskDistribution />
        </div>

        <div className="analyze-dashboard-grid analyze-dashboard-grid-bottom">
          <RiskyAssets />
          <ThreatsOverview />
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  label,
  change,
  trend,
  icon: Icon,
}: {
  title: string;
  value: string;
  label?: string;
  change: string;
  trend: "up" | "down";
  icon: ElementType;
}) {
  return (
    <article className="analyze-metric-card">
      <div>
        <p className="analyze-metric-title">{title}</p>
        <div className="analyze-metric-value-row">
          <strong>{value}</strong>
          {label ? <span>{label}</span> : null}
        </div>
        <p className={`analyze-metric-change analyze-metric-change-${trend}`}>
          {trend === "up" ? "+" : "-"} {change} <small>vs last week</small>
        </p>
      </div>

      <div className="analyze-metric-icon">
        <Icon size={24} />
      </div>
    </article>
  );
}

function RiskTrend() {
  return (
    <Panel title="Risk Trend" action="Last 7 days">
      <div className="analyze-risk-trend">
        <div className="analyze-risk-gridlines">
          {[100, 75, 50, 25, 0].map((value) => (
            <div key={value} className="analyze-risk-gridline">
              <span>{value}</span>
              <i />
            </div>
          ))}
        </div>

        <div className="analyze-risk-chart-wrap">
          <svg viewBox="0 0 720 230" className="analyze-risk-chart" aria-hidden="true">
            <defs>
              <linearGradient id="analyseRiskFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#18b6ff" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#18b6ff" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            <path
              d="M0 136 C70 74 110 38 170 72 C235 108 262 102 336 126 C408 149 455 148 521 118 C585 89 617 151 720 166 L720 230 L0 230 Z"
              fill="url(#analyseRiskFill)"
            />
            <path
              d="M0 136 C70 74 110 38 170 72 C235 108 262 102 336 126 C408 149 455 148 521 118 C585 89 617 151 720 166"
              fill="none"
              stroke="#1bb8ff"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="420" cy="146" r="10" fill="#12b8ff" />
            <circle cx="420" cy="146" r="20" fill="rgba(18,184,255,0.16)" />
            <circle cx="675" cy="165" r="8" fill="#12b8ff" />
            <circle cx="675" cy="165" r="18" fill="rgba(18,184,255,0.12)" />
          </svg>

          <div className="analyze-risk-tooltip">
            <span>15 May 2024</span>
            <strong>Risk Score: 38</strong>
          </div>
        </div>

        <div className="analyze-risk-labels">
          {["12 May", "13 May", "14 May", "15 May", "16 May", "17 May", "18 May"].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function RiskDistribution() {
  return (
    <Panel title="Risk Distribution">
      <div className="analyze-distribution">
        <div className="analyze-distribution-ring">
          <div className="analyze-distribution-ring-inner">
            <strong>1,248</strong>
            <span>Total</span>
          </div>
        </div>

        <div className="analyze-distribution-legend">
          {distribution.map((item) => (
            <div key={item.label} className="analyze-legend-row">
              <span className={`analyze-legend-dot analyze-legend-dot-${item.color}`} />
              <div>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function RiskyAssets() {
  return (
    <Panel title="Top Risky Assets" action="View all">
      <div className="analyze-assets-table-wrap">
        <table className="analyze-assets-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Risk Score</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {riskyAssets.map((item) => (
              <tr key={item.asset}>
                <td>{item.asset}</td>
                <td>{item.type}</td>
                <td>
                  <span className={`analyze-risk-score analyze-risk-score-${item.trend}`}>{item.score}</span>
                </td>
                <td>
                  <div className="analyze-trend-cell">
                    <span className={`analyze-risk-pill analyze-risk-pill-${item.trend}`}>{item.risk}</span>
                    <TrendSparkline tone={item.trend} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function ThreatsOverview() {
  return (
    <Panel title="Threats Overview" action="All Regions">
      <div className="analyze-threats-map">
        <svg className="analyze-threats-world" viewBox="0 0 640 270" aria-hidden="true">
          <path d="M79 92l51-22 55 8 16 25-13 22-52 8-35-7-27-18z" />
          <path d="M213 100l46-30 79-10 80 21 18 28-19 34-95 8-72-20-43-31z" />
          <path d="M484 89l44-14 62 12 22 25-22 24-63 4-28-16z" />
          <path d="M258 158l78-8 56 18 36 29-31 34-88 3-58-18-19-29z" />
          <path d="M462 162l56-9 67 13 19 29-19 32-75 6-48-18-18-22z" />
          <path d="M329 165l68-13 73 14 35 29-34 30-75 9-59-18-32-30z" />
        </svg>

        <span className="analyze-map-pin analyze-map-pin-west" />
        <span className="analyze-map-pin analyze-map-pin-east" />
        <span className="analyze-map-pin analyze-map-pin-middle" />
        <span className="analyze-map-pin analyze-map-pin-asia" />
      </div>

      <div className="analyze-threat-stats">
        {threatStats.map((item) => (
          <div key={item.label} className="analyze-threat-card">
            <strong className={`analyze-threat-value analyze-threat-value-${item.tone}`}>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Panel({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <section className="analyze-panel">
      <div className="analyze-panel-head">
        <h2>{title}</h2>
        {action ? (
          <button className="analyze-panel-action" type="button">
            <span>{action}</span>
            <ChevronDown size={14} />
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function TrendSparkline({ tone }: { tone: "high" | "medium" | "low" }) {
  return (
    <svg viewBox="0 0 80 28" className={`analyze-sparkline analyze-sparkline-${tone}`} aria-hidden="true">
      <path d="M2 19 C13 25 19 8 31 11 C42 14 43 26 56 16 C65 9 71 10 78 21" />
    </svg>
  );
}
