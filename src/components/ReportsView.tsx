import React, { useState } from "react";
import {
  FileSearch,
  Download,
  FileCheck2,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles
} from "lucide-react";
import { jsPDF } from "jspdf";
import { RiskLevel } from "../types";

export const ReportsView: React.FC = () => {
  const [reportTitle, setReportTitle] = useState("Enterprise SOC Incident & Vulnerability Assessment");
  const [queryScope, setQueryScope] = useState("Log4j2 JNDI Remote Code Execution (CVE-2021-44228) Impact Analysis");
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("CRITICAL");
  const [confidenceScore, setConfidenceScore] = useState(94);
  const [owaspMapping, setOwaspMapping] = useState("A06:2021 - Vulnerable and Outdated Components");
  const [mitreMapping, setMitreMapping] = useState("T1190 - Exploit Public-Facing Application");

  const [execSummary, setExecSummary] = useState(
    "A critical remote code execution vulnerability was evaluated across internal Java application runtimes. Unauthenticated attackers can inject arbitrary JNDI lookup strings into log requests, leading to immediate system takeover."
  );
  const [threatMechanics, setThreatMechanics] = useState(
    "1. Ingestion of untrusted user input by Apache Log4j2 message formatter.\n2. Outbound LDAP request initiated by vulnerable JNDI component.\n3. Execution of remote malicious class payload on application server."
  );
  const [businessImpact, setBusinessImpact] = useState(
    "Critical exposure to complete server compromise, unauthorized access to customer databases, potential ransomware deployment, and severe PCI-DSS non-compliance fines."
  );
  const [mitigationSteps, setMitigationSteps] = useState(
    "1. Upgrade Log4j dependency to version 2.17.1 or higher.\n2. Configure JVM system property -Dlog4j2.formatMsgNoLookups=true.\n3. Restrict egress TCP connections on ports 389 (LDAP), 636 (LDAPS), and 1099 (RMI)."
  );
  const [recommendations, setRecommendations] = useState(
    "1. Deploy automated Software Bill of Materials (SBOM) dependency scanning.\n2. Enforce zero-trust egress firewall filtering for all pod deployments."
  );

  const handleExportPdf = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text("🛡️ CYBERSECURE AI - EXECUTIVE REPORT", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Title: ${reportTitle}`, 14, 28);
    doc.text(`Scope: ${queryScope}`, 14, 34);
    doc.text(`Assessed Risk Level: ${riskLevel} | AI Confidence: ${confidenceScore}%`, 14, 40);
    doc.text(`Frameworks: OWASP (${owaspMapping}) | MITRE (${mitreMapping})`, 14, 46);

    doc.setLineWidth(0.5);
    doc.setDrawColor(2, 132, 199);
    doc.line(14, 50, 196, 50);

    let y = 58;

    const addBlock = (heading: string, body: string) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(2, 132, 199);
      doc.text(heading, 14, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);

      const split = doc.splitTextToSize(body, 180);
      doc.text(split, 14, y);
      y += split.length * 5 + 8;
    };

    addBlock("1. EXECUTIVE SUMMARY", execSummary);
    addBlock("2. TECHNICAL THREAT MECHANICS", threatMechanics);
    addBlock("3. BUSINESS IMPACT ANALYSIS", businessImpact);
    addBlock("4. IMMEDIATE CONTAINMENT & MITIGATION", mitigationSteps);
    addBlock("5. PREVENTATIVE RECOMMENDATIONS", recommendations);

    doc.save(`CyberSecure_SOC_Report_${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Executive Security Report Generator</h2>
          </div>
          <p className="text-xs text-slate-400">
            Compile formal downloadable PDF security reports formatted with executive summaries, threat vectors, risk level ratings, and OWASP/MITRE mappings.
          </p>
        </div>

        <button
          onClick={handleExportPdf}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF Security Assessment</span>
        </button>
      </div>

      {/* Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 text-xs shadow-xl">
          <div className="font-bold text-slate-100 text-sm border-b border-white/10 pb-2">
            1. Report Meta & Target Scope
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Report Header Title</label>
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assessed Risk Rating</label>
                <select
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none"
                >
                  <option value="CRITICAL" className="bg-slate-900">CRITICAL</option>
                  <option value="HIGH" className="bg-slate-900">HIGH</option>
                  <option value="MEDIUM" className="bg-slate-900">MEDIUM</option>
                  <option value="LOW" className="bg-slate-900">LOW</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">AI Confidence Score (%)</label>
                <input
                  type="number"
                  value={confidenceScore}
                  onChange={(e) => setConfidenceScore(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Executive Summary</label>
              <textarea
                rows={3}
                value={execSummary}
                onChange={(e) => setExecSummary(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl p-3 text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Technical Threat Mechanics</label>
              <textarea
                rows={3}
                value={threatMechanics}
                onChange={(e) => setThreatMechanics(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl p-3 text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Containment & Immediate Mitigation</label>
              <textarea
                rows={3}
                value={mitigationSteps}
                onChange={(e) => setMitigationSteps(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl p-3 text-slate-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Report Document Preview */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-6 text-xs text-slate-300 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-slate-100 text-sm">Document Live Preview</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
              PDF Document
            </span>
          </div>

          <div className="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 leading-relaxed font-sans shadow-inner backdrop-blur-sm">
            <div className="space-y-1">
              <div className="text-lg font-bold text-slate-100">{reportTitle}</div>
              <div className="text-[11px] text-emerald-400 font-mono">Scope: {queryScope}</div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 pb-3 border-b border-white/10">
              <span className="px-2.5 py-1 rounded-md bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                RISK: {riskLevel}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 font-semibold">
                Confidence: {confidenceScore}%
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-emerald-300 border border-white/10 font-mono">
                {owaspMapping}
              </span>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider">1. Executive Summary</div>
              <p className="text-slate-300 text-[11px]">{execSummary}</p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">2. Threat Mechanics</div>
              <p className="text-slate-300 text-[11px] whitespace-pre-wrap">{threatMechanics}</p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-indigo-400 text-[11px] uppercase tracking-wider">3. Mitigation & Remediation</div>
              <p className="text-slate-300 text-[11px] whitespace-pre-wrap">{mitigationSteps}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
