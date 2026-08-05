import React from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  Activity,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Terminal,
  Clock,
  Lock,
  Cpu
} from "lucide-react";
import { MOCK_INCIDENT_ALERTS } from "../data/mockData";

interface DashboardViewProps {
  onQuickQuery: (prompt: string) => void;
  chunkCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onQuickQuery, chunkCount }) => {
  return (
    <div className="space-y-6 pb-8">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>SOC Agentic Intelligence Active</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Enterprise Multi-Agent Cyber Security Assistant
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real-time vulnerability investigation, PDF policy document RAG, automated OWASP/MITRE mapping, and executive security report compilation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuickQuery("Perform comprehensive Log4j RCE vulnerability assessment and mitigation strategy.")}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 shrink-0"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Run Log4j Investigation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>SOC Defense Level</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-emerald-400">OPTIMAL</div>
            <span className="text-[11px] text-emerald-400 font-medium">99.4% Uptime</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[94%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Indexed Knowledge Base</span>
            <FileCheck2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-slate-100">{chunkCount}</div>
            <span className="text-[11px] text-indigo-400 font-medium">ChromaDB Store</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-500 h-full w-[85%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Multi-Agent Confidence</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-slate-100">96.8%</div>
            <span className="text-[11px] text-cyan-400 font-medium">Fact-Validated</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-cyan-500 h-full w-[96%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Threat Intel Sync</span>
            <Lock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-amber-400">ACTIVE</div>
            <span className="text-[11px] text-amber-400 font-medium">NVD / MITRE</span>
          </div>
          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-full w-[88%]" />
          </div>
        </div>
      </div>

      {/* Main Grid: Quick Analysis Starters & Incident Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Investigations */}
        <div className="lg:col-span-2 space-y-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-slate-100 text-base">Quick SOC Security Scenarios</h3>
            </div>
            <span className="text-xs text-slate-400">Click to execute multi-agent analysis</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onQuickQuery("Analyze Ransomware Containment Playbook and outline immediate host isolation steps.")}
              className="p-4 bg-black/40 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-left transition-all group space-y-2 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">CRITICAL INCIDENT</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="font-semibold text-slate-200 text-sm">Ransomware Containment Protocol</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Host network isolation, Kerberos token revocation, memory dumps, and perimeter firewall blocks.
              </p>
            </button>

            <button
              onClick={() => onQuickQuery("Review OWASP Top 10 A01:2021 Broken Access Control requirements for REST APIs.")}
              className="p-4 bg-black/40 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-left transition-all group space-y-2 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">COMPLIANCE AUDIT</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="font-semibold text-slate-200 text-sm">OWASP Broken Access Control Audit</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Least privilege enforcement, object level authorization checks, and directory traversal defense.
              </p>
            </button>

            <button
              onClick={() => onQuickQuery("Assess Kubernetes Pod Security Standards (PSS) hardening for container workloads.")}
              className="p-4 bg-black/40 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-left transition-all group space-y-2 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">CLOUD SECURITY</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="font-semibold text-slate-200 text-sm">Kubernetes Hardening Checklist</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Restricted Pod Security Standards, readOnlyRootFilesystem, and service account token handling.
              </p>
            </button>

            <button
              onClick={() => onQuickQuery("Provide NIST SP 800-53 R5 Account Management AC-2 audit controls.")}
              className="p-4 bg-black/40 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-left transition-all group space-y-2 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">NIST GOVERNANCE</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="font-semibold text-slate-200 text-sm">NIST SP 800-53 AC-2 Controls</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated account management procedures, inactive account suspension, and privilege review.
              </p>
            </button>
          </div>
        </div>

        {/* Live Incident Alerts Sidebar */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-base">Recent Incident Telemetry</h3>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-3">
            {MOCK_INCIDENT_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="p-3.5 bg-black/40 border border-white/5 rounded-2xl space-y-1.5 hover:border-white/20 transition-all backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 font-mono">{alert.id}</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </span>
                </div>
                <div className="font-semibold text-slate-200 text-xs">{alert.title}</div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">{alert.source}</span>
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded-md ${
                      alert.level === "CRITICAL"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : alert.level === "HIGH"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                    }`}
                  >
                    {alert.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
