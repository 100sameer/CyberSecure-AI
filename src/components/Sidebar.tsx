import React from "react";
import {
  LayoutDashboard,
  MessageSquareCode,
  FileText,
  ShieldAlert,
  FileSearch,
  Settings,
  Info,
  Upload,
  RefreshCw,
  Trash2,
  Cpu,
  Shield,
  Layers
} from "lucide-react";
import { ModelProvider } from "../types";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  modelProvider: ModelProvider;
  setModelProvider: (provider: ModelProvider) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  chunkCount: number;
  docCount: number;
  onResetDb: () => void;
  onResetChat: () => void;
  onUploadClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  modelProvider,
  setModelProvider,
  selectedModel,
  setSelectedModel,
  chunkCount,
  docCount,
  onResetDb,
  onResetChat,
  onUploadClick
}) => {
  const navItems = [
    { id: "dashboard", label: "SOC Dashboard", icon: LayoutDashboard },
    { id: "chat", label: "AI Chat Assistant", icon: MessageSquareCode },
    { id: "documents", label: "Knowledge Docs", icon: FileText },
    { id: "threat-intel", label: "Threat Intelligence", icon: ShieldAlert },
    { id: "reports", label: "Security Reports", icon: FileSearch },
    { id: "settings", label: "System Settings", icon: Settings },
    { id: "about", label: "Architecture & About", icon: Info }
  ];

  return (
    <aside className="w-64 bg-[#05070a] border-r border-white/5 flex flex-col h-screen sticky top-0 shrink-0 text-slate-300 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 font-bold text-lg">
          🛡️
        </div>
        <div>
          <div className="font-bold text-slate-100 tracking-wide text-sm">CyberSecure AI</div>
          <div className="text-[11px] text-emerald-400 font-medium">Enterprise Assistant</div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Main Console
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-white/10 text-white border border-white/10 shadow-lg shadow-black/40 backdrop-blur-md"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Divider */}
        <div className="pt-4 pb-2">
          <div className="h-px bg-white/5 my-2" />
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            AI Provider Control
          </div>
        </div>

        {/* Model Switcher Box */}
        <div className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Select LLM Provider</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5">
            <button
              onClick={() => {
                setModelProvider("gemini");
                setSelectedModel("gemini-3.6-flash");
              }}
              className={`py-1.5 px-2 text-[11px] font-medium rounded-lg transition-all ${
                modelProvider === "gemini"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Gemini
            </button>
            <button
              onClick={() => {
                setModelProvider("groq");
                setSelectedModel("llama-3.3-70b");
              }}
              className={`py-1.5 px-2 text-[11px] font-medium rounded-lg transition-all ${
                modelProvider === "groq"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Groq
            </button>
          </div>

          <div className="text-[10px] text-slate-400 leading-relaxed">
            {modelProvider === "gemini" ? (
              <span>⚡ Google Gemini 3.6 Flash / 3.1 Pro</span>
            ) : (
              <span>🔥 Groq Llama 3.3 70B High-Speed</span>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-3 space-y-1.5">
          <button
            onClick={() => {
              setActiveTab("documents");
              onUploadClick();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload PDF Security Doc</span>
          </button>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={onResetChat}
              title="Clear conversation history"
              className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] text-slate-300 transition-all"
            >
              <RefreshCw className="w-3 h-3 text-emerald-400" />
              <span>Reset Chat</span>
            </button>
            <button
              onClick={onResetDb}
              title="Reset vector database"
              className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 rounded-xl text-[11px] text-slate-300 hover:text-red-400 transition-all"
            >
              <Trash2 className="w-3 h-3 text-red-400" />
              <span>Reset DB</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-white/5 bg-[#05070a]/90 text-[11px] space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" /> Vector Chunks
          </span>
          <span className="font-semibold text-slate-200">{chunkCount}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> Security Policies
          </span>
          <span className="font-semibold text-slate-200">{docCount} Docs</span>
        </div>
      </div>
    </aside>
  );
};
