"use client";

import type { ElementType, ReactNode } from "react";
import {
  BarChart3,
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

const riskyAssets = [
  { asset: "api.aquascope.com", type: "API", score: 85, risk: "High" },
  { asset: "crm.aquascope.com", type: "Web App", score: 72, risk: "High" },
  { asset: "mail.aquascope.com", type: "Mail Server", score: 58, risk: "Medium" },
  { asset: "dev.aquascope.com", type: "Server", score: 46, risk: "Medium" },
  { asset: "blog.aquascope.com", type: "Web App", score: 28, risk: "Low" },
];

export default function AnalyzeWorkspace() {
  return (
    <section className="min-h-full w-full overflow-auto bg-[#020817] p-5 text-white xl:p-6">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col">
        <Topbar />

        <div className="rounded-[24px] border border-sky-500/20 bg-[#06162b]/70 p-7 shadow-[0_0_40px_rgba(14,165,233,0.12)]">
          <Header />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total Assets" value="1,248" change="▲ 12.5%" icon={Box} />
            <MetricCard title="Risk Score" value="28" label="Medium Risk" change="▼ 8.3%" icon={Shield} />
            <MetricCard title="Threats Detected" value="156" change="▲ 23.1%" icon={Target} />
            <MetricCard title="Compliance" value="92%" change="▲ 4.7%" icon={CheckCircle2} />
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
            <RiskTrend />
            <RiskDistribution />
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
            <RiskyAssets />
            <ThreatMap />
          </div>
        </div>
      </div>
    </section>
  );
}

function Topbar() {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
      <div className="flex h-11 w-full max-w-[320px] items-center gap-3 rounded-xl border border-sky-500/20 bg-[#06162b] px-4">
        <Search size={18} className="text-slate-400" />
        <span className="text-sm text-slate-400">Search anything...</span>
        <kbd className="ml-auto rounded bg-white/5 px-2 py-1 text-xs text-slate-400">⌘ K</kbd>
      </div>

      <button
        type="button"
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/20 bg-[#06162b]"
      >
        <Bell size={19} className="text-sky-300" />
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-blue-500 text-xs">
          3
        </span>
      </button>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Analyse</h1>
        <p className="mt-2 text-sm text-slate-400">
          Deep insights and intelligent analysis for your marine data.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="flex h-11 items-center gap-3 rounded-xl border border-sky-500/25 bg-sky-500/5 px-4 text-sm text-slate-200"
        >
          <Calendar size={17} />
          12 May 2024 - 18 May 2024
          <ChevronDown size={16} />
        </button>

        <button
          type="button"
          className="flex h-11 items-center gap-3 rounded-xl border border-sky-500/25 bg-sky-500/5 px-4 text-sm text-slate-200"
        >
          <Filter size={17} />
          Filters
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  label,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  label?: string;
  icon: ElementType;
}) {
  return (
    <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-transparent p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-300">{title}</p>
          <div className="mt-4 flex items-end gap-3">
            <h2 className="text-3xl font-bold">{value}</h2>
            {label ? <span className="pb-1 text-sm font-medium text-yellow-400">{label}</span> : null}
          </div>
          <p className="mt-3 text-sm text-emerald-400">
            {change} <span className="text-slate-400">vs last week</span>
          </p>
        </div>

        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-300 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
}

function RiskTrend() {
  return (
    <Panel title="Risk Trend" action="Last 7 days">
      <div className="relative mt-6 h-[230px]">
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-500">
          {[100, 75, 50, 25, 0].map((v) => (
            <div key={v} className="flex items-center gap-4">
              <span className="w-8">{v}</span>
              <div className="h-px flex-1 border-t border-dashed border-white/10" />
            </div>
          ))}
        </div>

        <svg viewBox="0 0 720 220" className="absolute bottom-0 left-10 h-[200px] w-[calc(100%-40px)]">
          <defs>
            <linearGradient id="riskFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 130 C80 60 100 20 170 60 C230 100 230 120 310 120 C390 120 400 160 500 125 C590 90 590 170 720 150 L720 220 L0 220 Z"
            fill="url(#riskFill)"
          />
          <path
            d="M0 130 C80 60 100 20 170 60 C230 100 230 120 310 120 C390 120 400 160 500 125 C590 90 590 170 720 150"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="4"
          />
          <circle cx="420" cy="145" r="8" fill="#0ea5e9" />
        </svg>

        <div className="absolute bottom-0 left-14 right-0 flex justify-between text-xs text-slate-400">
          {["12 May", "13 May", "14 May", "15 May", "16 May", "17 May", "18 May"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function RiskDistribution() {
  return (
    <Panel title="Risk Distribution">
      <div className="flex h-[260px] flex-col items-center justify-center gap-10 lg:flex-row">
        <div className="relative h-48 w-48 rounded-full bg-[conic-gradient(#10b981_0_34%,#f59e0b_34%_75%,#ef4444_75%_93%,#8b5cf6_93%_100%)] p-5 shadow-[0_0_30px_rgba(14,165,233,0.18)]">
          <div className="grid h-full w-full place-items-center rounded-full bg-[#06162b]">
            <div className="text-center">
              <p className="text-3xl font-bold">1,248</p>
              <p className="text-sm text-slate-400">Total</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <Legend color="bg-emerald-400" label="Low Risk" value="34% (424)" />
          <Legend color="bg-yellow-400" label="Medium Risk" value="41% (512)" />
          <Legend color="bg-red-400" label="High Risk" value="18% (224)" />
          <Legend color="bg-violet-500" label="Critical" value="7% (88)" />
        </div>
      </div>
    </Panel>
  );
}

function RiskyAssets() {
  return (
    <Panel title="Top Risky Assets" action="View all">
      <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">Asset</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Risk Score</th>
              <th className="px-4 py-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            {riskyAssets.map((item) => (
              <tr key={item.asset} className="border-t border-white/10">
                <td className="px-4 py-4 font-medium">{item.asset}</td>
                <td className="px-4 py-4 text-slate-400">{item.type}</td>
                <td className="px-4 py-4">
                  <span className={item.risk === "Low" ? "text-emerald-400" : item.risk === "Medium" ? "text-yellow-400" : "text-red-400"}>
                    {item.score}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs">{item.risk}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function ThreatMap() {
  return (
    <Panel title="Threats Overview" action="All Regions">
      <div className="mt-5 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,#0ea5e933,transparent_55%)] p-5">
        <div className="grid h-[210px] place-items-center rounded-xl bg-[#031124] text-slate-500">
          World Map / Heatmap Area
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ThreatStat label="Malware" value="62" color="text-red-400" />
          <ThreatStat label="Phishing" value="45" color="text-yellow-400" />
          <ThreatStat label="Vulnerabilities" value="31" color="text-orange-400" />
          <ThreatStat label="Data Breach" value="18" color="text-violet-400" />
        </div>
      </div>
    </Panel>
  );
}

function Panel({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-sky-500/20 bg-[#06162b]/80 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">{title}</h2>
        {action ? (
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-sky-500/20 bg-white/5 px-3 py-2 text-xs text-slate-300"
          >
            {action}
            <ChevronDown size={14} />
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`mt-1 h-3 w-3 rounded-full ${color}`} />
      <div>
        <p>{label}</p>
        <p className="text-slate-400">{value}</p>
      </div>
    </div>
  );
}

function ThreatStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}
