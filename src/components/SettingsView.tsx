import React, { useState } from "react";
import {
  Settings,
  Cpu,
  Sliders,
  Database,
  Key,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { ModelProvider } from "../types";

interface SettingsViewProps {
  modelProvider: ModelProvider;
  setModelProvider: (provider: ModelProvider) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  onResetDb: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  modelProvider,
  setModelProvider,
  selectedModel,
  setSelectedModel,
  onResetDb
}) => {
  const [temperature, setTemperature] = useState(0.2);
  const [topK, setTopK] = useState(5);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a Senior Cyber Security Consultant and Principal SOC Architect. Analyze security documents and formulate structured responses with Executive Summary, Threat Analysis, Risk Level, Mitigation, and OWASP/MITRE mappings."
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Title */}
      <div className="flex items-center justify-between bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">System & Model Settings</h2>
          </div>
          <p className="text-xs text-slate-400">
            Configure LLM inference providers, multi-agent validation strictness, ChromaDB vector parameters, and system prompts.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Model Provider Config */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm border-b border-white/10 pb-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>LLM Provider & Model Selection</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Inference Engine</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModelProvider("gemini");
                    setSelectedModel("gemini-3.6-flash");
                  }}
                  className={`p-3 rounded-2xl border font-semibold flex flex-col items-start gap-1 transition-all ${
                    modelProvider === "gemini"
                      ? "bg-white/10 border-white/20 text-emerald-300 shadow-lg shadow-black/40 backdrop-blur-md"
                      : "bg-black/30 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-100">Google Gemini</span>
                  <span className="text-[10px] text-slate-400 font-normal">Gemini 3.6 Flash / 3.1 Pro</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModelProvider("groq");
                    setSelectedModel("llama-3.3-70b");
                  }}
                  className={`p-3 rounded-2xl border font-semibold flex flex-col items-start gap-1 transition-all ${
                    modelProvider === "groq"
                      ? "bg-white/10 border-white/20 text-amber-300 shadow-lg shadow-black/40 backdrop-blur-md"
                      : "bg-black/30 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-100">Groq API</span>
                  <span className="text-[10px] text-slate-400 font-normal">Llama 3.3 70B Versatile</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Model Temperature ({temperature})</label>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.0 (Deterministic / Strict Security)</span>
                <span>1.0 (Creative)</span>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">RAG Top-K Chunk Count ({topK})</label>
              <input
                type="number"
                min="1"
                max="15"
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* System Prompt & Database Maintenance */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm border-b border-white/10 pb-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>System Prompt & Security Constraints</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Master System Prompt Instruction</label>
              <textarea
                rows={5}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl p-3 text-slate-200 focus:outline-none font-mono text-[11px] leading-relaxed"
              />
            </div>

            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  ChromaDB Maintenance
                </span>
                <button
                  type="button"
                  onClick={onResetDb}
                  className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg text-[11px] font-semibold transition-all"
                >
                  Clear Vector Collections
                </button>
              </div>
              <p className="text-slate-400 text-[11px]">
                Wipes all stored vector embeddings and document chunks from local persistence.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
