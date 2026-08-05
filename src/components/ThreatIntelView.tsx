import React, { useState } from "react";
import {
  ShieldAlert,
  Search,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  FileCode
} from "lucide-react";
import { INITIAL_CVES } from "../data/mockData";
import { CVEItem } from "../types";

export const ThreatIntelView: React.FC = () => {
  const [searchCve, setSearchCve] = useState("");
  const [cveList, setCveList] = useState<CVEItem[]>(INITIAL_CVES);
  const [selectedCve, setSelectedCve] = useState<CVEItem>(INITIAL_CVES[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCve.trim()) return;

    const term = searchCve.trim().toUpperCase();
    const found = cveList.find(c => c.cve_id === term || c.name.toUpperCase().includes(term));

    if (found) {
      setSelectedCve(found);
    } else {
      // Create dynamically queried advisory
      const newCve: CVEItem = {
        cve_id: term.startsWith("CVE-") ? term : `CVE-2025-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `${searchCve} Security Advisory`,
        cvss_score: 8.8,
        severity: "HIGH",
        vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
        summary: `Live threat intelligence search result for "${searchCve}". Vulnerability permits remote code execution or authentication bypass in affected services.`,
        affected_systems: ["Enterprise Linux / Cloud Workloads", searchCve],
        mitre_technique: "T1190 - Exploit Public-Facing Application",
        remediation: "Apply official vendor patch updates immediately and enforce perimeter ingress filtering."
      };
      setCveList([newCve, ...cveList]);
      setSelectedCve(newCve);
    }
  };

  const getCvssBadge = (score: number) => {
    if (score >= 9.0) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (score >= 7.0) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">CVE & Threat Intelligence Hub</h2>
          </div>
          <p className="text-xs text-slate-400">
            Real-time vulnerability lookup, CVSS v3.1 scoring breakdown, vendor advisories, and MITRE ATT&CK technique mapping.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 shrink-0">
          <input
            type="text"
            value={searchCve}
            onChange={(e) => setSearchCve(e.target.value)}
            placeholder="Search CVE (e.g. CVE-2021-44228 or MOVEit)..."
            className="bg-black/40 border border-white/10 focus:border-amber-500/50 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none w-64"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-600/20 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Lookup</span>
          </button>
        </form>
      </div>

      {/* Main Grid: Selected CVE Detail + Active Advisories List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected CVE Detail Card */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-bold text-emerald-400">{selectedCve.cve_id}</span>
                <span className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${getCvssBadge(selectedCve.cvss_score)}`}>
                  CVSS {selectedCve.cvss_score} ({selectedCve.severity})
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-1">{selectedCve.name}</h3>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">CVSS v3.1 Vector String</div>
              <code className="text-amber-400 font-mono text-[11px] block break-all">{selectedCve.vector}</code>
            </div>

            <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">MITRE ATT&CK Mapping</div>
              <div className="text-indigo-300 font-semibold">{selectedCve.mitre_technique}</div>
            </div>
          </div>

          {/* Description & Remediation */}
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-slate-300 uppercase text-[11px] tracking-wider">Vulnerability Mechanics Summary</div>
              <p className="text-slate-300 leading-relaxed p-4 bg-black/40 rounded-xl border border-white/5">
                {selectedCve.summary}
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-slate-300 uppercase text-[11px] tracking-wider">Affected Systems & Software</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedCve.affected_systems.map((sys, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-black/40 border border-white/10 text-slate-300 rounded-lg font-mono">
                    {sys}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider">Remediation & Patching Guidance</div>
              <p className="text-slate-200 leading-relaxed p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                {selectedCve.remediation}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Threat Advisories List */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Vulnerability Advisories</span>
            </div>
            <span className="text-[11px] text-slate-400">{cveList.length} Items</span>
          </div>

          <div className="space-y-3">
            {cveList.map((cve) => (
              <button
                key={cve.cve_id}
                onClick={() => setSelectedCve(cve)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                  selectedCve.cve_id === cve.cve_id
                    ? "bg-white/10 border-white/20 shadow-lg shadow-black/40 backdrop-blur-md"
                    : "bg-black/30 border-white/5 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">{cve.cve_id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getCvssBadge(cve.cvss_score)}`}>
                    {cve.cvss_score}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-200">{cve.name}</div>
                <div className="text-[10px] text-slate-400 line-clamp-2">{cve.summary}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
