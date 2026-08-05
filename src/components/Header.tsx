import React from "react";
import { ShieldCheck, Cpu, Database } from "lucide-react";
import { ModelProvider } from "../types";

interface HeaderProps {
  modelProvider: ModelProvider;
  selectedModel: string;
  chunkCount: number;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  modelProvider,
  selectedModel,
  chunkCount,
  activeTab
}) => {
  return (
    <header className="border-b border-white/10 bg-gradient-to-r from-[#05070a] via-[#0f172a] to-[#05070a] backdrop-blur-md sticky top-0 z-30 px-6 py-3.5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Active View Badge & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 font-bold text-lg shrink-0">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                CyberSecure AI
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase tracking-widest">
                SOC ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Multi-Agent RAG Engine • View: <span className="text-slate-200 font-semibold capitalize">{activeTab}</span>
            </p>
          </div>
        </div>

        {/* Right: SOC Status & Model Badge */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Active Model Indicator */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">AI Model</div>
              <div className="text-slate-200 font-medium flex items-center gap-1">
                {modelProvider === "groq" ? (
                  <span className="text-amber-400 font-semibold">Groq Llama 3.3 70B</span>
                ) : (
                  <span className="text-emerald-400 font-semibold">Gemini 3.6 Flash</span>
                )}
              </div>
            </div>
          </div>

          {/* ChromaDB Status */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs">
            <Database className="w-4 h-4 text-indigo-400" />
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Vector Store</div>
              <div className="text-slate-200 font-medium">{chunkCount} Chunks Indexed</div>
            </div>
          </div>

          {/* Defense Posture Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SOC OPS OPTIMAL</span>
          </div>
        </div>
      </div>
    </header>
  );
};

