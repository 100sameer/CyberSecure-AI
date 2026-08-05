import React from "react";
import {
  Info,
  GitBranch,
  Layers,
  Shield,
  Cpu,
  Database,
  Terminal,
  CheckCircle2,
  Server,
  Code2,
  Container
} from "lucide-react";

export const AboutView: React.FC = () => {
  const agentSteps = [
    { title: "1. Planner Agent", role: "Query Decomposition", desc: "Decomposes complex SOC queries, incident logs, and vulnerability questions into targeted search vectors and identifies key compliance frameworks (OWASP, MITRE ATT&CK, NIST)." },
    { title: "2. Retriever Agent", role: "ChromaDB Vector Search", desc: "Executes similarity search over 384-dimensional sentence-transformer embeddings stored in persistent ChromaDB. Retrieves top 5 grounded policy chunks." },
    { title: "3. Threat Intel Agent", role: "CVE & NVD Enrichment", desc: "Queries CVE registries for CVSS v3.1 scores, vulnerability mechanics, and vendor patch advisories." },
    { title: "4. LLM Generation", role: "Grounded Synthesis", desc: "Generates structured SOC analysis using Google Gemini 3.6 Flash or Groq Llama 3.3 70B with strict system prompt boundaries." },
    { title: "5. Validator Agent", role: "Hallucination Audit", desc: "Audits response against retrieved context documents to guarantee factuality, adjust confidence scores, and verify OWASP/MITRE mappings." },
    { title: "6. Report Generator", role: "ReportLab PDF Compiler", desc: "Compiles validated findings into executive-ready downloadable PDF security reports." }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Title Header */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 space-y-2 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
          <Info className="w-5 h-5" />
          <span>System Architecture & Multi-Agent Flow</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          CyberSecure AI is built on a modular LangGraph multi-agent architecture. Autonomous agents cooperate sequentially to process security inquiries, query vector databases, cross-reference threat intelligence, audit findings, and generate PDF security assessments.
        </p>
      </div>

      {/* Visual LangGraph Workflow Diagram */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span>LangGraph Execution Graph Visualizer</span>
          </div>
          <span className="text-xs font-mono text-emerald-400">Sequential Execution Pipeline</span>
        </div>

        {/* Workflow Diagram Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {agentSteps.map((agent, index) => (
            <div
              key={index}
              className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-2 relative group hover:border-white/20 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-xs">{agent.title}</span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
                  {agent.role}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{agent.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Software Stack */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm border-b border-white/10 pb-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>Enterprise Technology Stack</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-slate-400 font-semibold">LLM Orchestration</span>
              <span className="text-slate-200 font-mono">LangChain & LangGraph</span>
            </div>
            <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-slate-400 font-semibold">Vector Database</span>
              <span className="text-slate-200 font-mono">ChromaDB Persistent Store</span>
            </div>
            <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-slate-400 font-semibold">Embedding Model</span>
              <span className="text-slate-200 font-mono">sentence-transformers/all-MiniLM-L6-v2</span>
            </div>
            <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-slate-400 font-semibold">AI Models</span>
              <span className="text-slate-200 font-mono">Gemini 3.6 Flash & Groq Llama 3.3 70B</span>
            </div>
            <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
              <span className="text-slate-400 font-semibold">PDF Processing</span>
              <span className="text-slate-200 font-mono">PyMuPDF, ReportLab & jsPDF</span>
            </div>
          </div>
        </div>

        {/* Deployment Targets */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm border-b border-white/10 pb-2">
            <Container className="w-4 h-4 text-emerald-400" />
            <span>Production Deployment Environments</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="font-bold text-emerald-400">Google Cloud Run & Cloud Containers</div>
              <p className="text-slate-400 text-[11px]">Deploy using root Dockerfile and docker-compose.yml configuration.</p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="font-bold text-indigo-400">Streamlit Community Cloud</div>
              <p className="text-slate-400 text-[11px]">Connect repository root directly with entrypoint file <code className="text-emerald-300">app.py</code>.</p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
              <div className="font-bold text-amber-400">Render / Railway FastAPI Stack</div>
              <p className="text-slate-400 text-[11px]">Launch backend REST API using <code className="text-emerald-300">uvicorn api.api:app</code>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
